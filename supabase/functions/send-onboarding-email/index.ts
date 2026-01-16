import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Input validation schema
const OnboardingEmailSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(30, "Phone must be less than 30 characters").optional().default(""),
  businessName: z.string().trim().max(200, "Business name must be less than 200 characters").optional().default(""),
  businessType: z.string().trim().max(100, "Business type must be less than 100 characters").optional().default(""),
  websitePurpose: z.string().trim().max(500, "Website purpose must be less than 500 characters").optional().default(""),
  targetAudience: z.string().trim().max(500, "Target audience must be less than 500 characters").optional().default(""),
  mainGoal: z.string().trim().max(500, "Main goal must be less than 500 characters").optional().default(""),
  designStyle: z.string().trim().max(100, "Design style must be less than 100 characters").optional().default(""),
  colorPreference: z.string().trim().max(200, "Color preference must be less than 200 characters").optional().default(""),
  referenceWebsites: z.string().trim().max(500, "Reference websites must be less than 500 characters").optional().default(""),
  requiredPages: z.array(z.string().max(50)).max(20, "Maximum 20 pages allowed").optional().default([]),
  hasContent: z.string().trim().max(50).optional().default(""),
  specialFeatures: z.string().trim().max(1000, "Special features must be less than 1000 characters").optional().default(""),
  domainPreference: z.string().trim().max(50).optional().default(""),
  existingDomain: z.string().trim().max(100, "Domain must be less than 100 characters").optional().default(""),
  timeline: z.string().trim().max(50).optional().default(""),
});

// HTML escape function to prevent XSS/injection
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // Max requests per window (stricter for onboarding)
const RATE_WINDOW = 300000; // 5 minute window

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // Rate limiting
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(clientIp)) {
    console.warn("Rate limit exceeded for IP:", clientIp);
    return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
      status: 429,
      headers: { 
        "Content-Type": "application/json",
        "Retry-After": "300",
        ...corsHeaders 
      },
    });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const parseResult = OnboardingEmailSchema.safeParse(body);
    if (!parseResult.success) {
      console.warn("Validation failed:", parseResult.error.issues);
      return new Response(
        JSON.stringify({ 
          error: "Validation failed", 
          details: parseResult.error.issues.map(i => i.message) 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const data = parseResult.data;
    
    console.log("Processing onboarding form from:", escapeHtml(data.email));

    // Format the design style for display
    const designStyleMap: Record<string, string> = {
      'modern-minimal': 'Modern & Minimal',
      'bold-creative': 'Bold & Creative',
      'professional-corporate': 'Professional & Corporate',
      'elegant-luxury': 'Elegant & Luxury',
      'friendly-approachable': 'Friendly & Approachable',
    };

    const contentStatusMap: Record<string, string> = {
      'yes': 'Has all content ready',
      'partial': 'Has some content, needs help with the rest',
      'no': 'Needs content creation assistance',
    };

    const domainStatusMap: Record<string, string> = {
      'have-domain': 'Has existing domain',
      'need-domain': 'Needs domain registration',
      'undecided': 'Needs guidance on domain',
    };

    const timelineMap: Record<string, string> = {
      'urgent': 'Urgent (1-2 weeks)',
      'normal': 'Standard (2-4 weeks)',
      'flexible': 'Flexible timeline',
    };

    // Sanitize all user inputs for HTML
    const safeData = {
      fullName: escapeHtml(data.fullName),
      email: escapeHtml(data.email),
      phone: escapeHtml(data.phone),
      businessName: escapeHtml(data.businessName),
      businessType: escapeHtml(data.businessType),
      websitePurpose: escapeHtml(data.websitePurpose),
      targetAudience: escapeHtml(data.targetAudience),
      mainGoal: escapeHtml(data.mainGoal),
      designStyle: escapeHtml(data.designStyle),
      colorPreference: escapeHtml(data.colorPreference),
      referenceWebsites: escapeHtml(data.referenceWebsites),
      requiredPages: data.requiredPages.map(escapeHtml),
      hasContent: escapeHtml(data.hasContent),
      specialFeatures: escapeHtml(data.specialFeatures),
      domainPreference: escapeHtml(data.domainPreference),
      existingDomain: escapeHtml(data.existingDomain),
      timeline: escapeHtml(data.timeline),
    };

    // Send notification to admin
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Syed Web Design <onboarding@resend.dev>",
        to: ["syedwebdesigndevelopers@gmail.com"],
        subject: `🚀 New Website Project: ${safeData.businessName || 'New Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #00d4ff;">New Website Project Request</h1>
            
            <h2 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td>${safeData.fullName}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${safeData.email}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>${safeData.phone}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Business:</strong></td><td>${safeData.businessName}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Type:</strong></td><td>${safeData.businessType}</td></tr>
            </table>
            
            <h2 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">Website Goals</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0;"><strong>Purpose:</strong></td><td>${safeData.websitePurpose}</td></tr>
              <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Target Audience:</strong></td><td>${safeData.targetAudience}</td></tr>
              <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Main Goal:</strong></td><td>${safeData.mainGoal}</td></tr>
            </table>
            
            <h2 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">Design Preferences</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0;"><strong>Style:</strong></td><td>${designStyleMap[data.designStyle] || safeData.designStyle}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Colors:</strong></td><td>${safeData.colorPreference}</td></tr>
              <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Reference Sites:</strong></td><td>${safeData.referenceWebsites}</td></tr>
            </table>
            
            <h2 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">Pages &amp; Content</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Required Pages:</strong></td><td>${safeData.requiredPages.join(', ')}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Content Status:</strong></td><td>${contentStatusMap[data.hasContent] || safeData.hasContent}</td></tr>
              <tr><td style="padding: 8px 0; vertical-align: top;"><strong>Special Features:</strong></td><td>${safeData.specialFeatures}</td></tr>
            </table>
            
            <h2 style="color: #333; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">Domain &amp; Timeline</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0;"><strong>Domain:</strong></td><td>${domainStatusMap[data.domainPreference] || safeData.domainPreference}${safeData.existingDomain ? ` (${safeData.existingDomain})` : ''}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Timeline:</strong></td><td>${timelineMap[data.timeline] || safeData.timeline}</td></tr>
            </table>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">This project request was submitted from your website.</p>
          </div>
        `,
      }),
    });

    if (!adminEmailRes.ok) {
      const error = await adminEmailRes.text();
      console.error("Failed to send admin email:", error);
      throw new Error("Failed to send email. Please try again later.");
    }

    console.log("Admin email sent successfully");

    // Send confirmation to user
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Syed Web Design <onboarding@resend.dev>",
        to: [data.email],
        subject: "Welcome to Syed Web Design & Development - Your Project Has Started!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00d4ff; margin-bottom: 10px;">Welcome, ${safeData.fullName}!</h1>
              <p style="font-size: 18px; color: #333;">Your website project is officially underway</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #00d4ff15, #ff00ff15); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
              <h2 style="color: #333; margin-top: 0;">What Happens Next?</h2>
              <ol style="color: #555; line-height: 1.8;">
                <li><strong>Project Review</strong> - Our team is reviewing your requirements right now</li>
                <li><strong>Personal Consultation</strong> - We'll reach out within 24-48 hours to discuss your vision</li>
                <li><strong>Design Concepts</strong> - You'll receive initial design concepts for approval</li>
                <li><strong>Development</strong> - We'll build your website with regular progress updates</li>
                <li><strong>Launch</strong> - Your new website goes live!</li>
              </ol>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
              <h3 style="color: #333; margin-top: 0;">Your Project Summary</h3>
              <p><strong>Business:</strong> ${safeData.businessName}</p>
              <p><strong>Website Purpose:</strong> ${safeData.websitePurpose}</p>
              <p><strong>Design Style:</strong> ${designStyleMap[data.designStyle] || safeData.designStyle}</p>
              <p><strong>Pages Requested:</strong> ${safeData.requiredPages.join(', ')}</p>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              We're excited to bring your vision to life! If you have any questions or additional ideas, 
              feel free to reply to this email or give us a call.
            </p>
            
            <p style="color: #555; line-height: 1.6;">
              Thank you for choosing Syed Web Design &amp; Development. We look forward to creating 
              something amazing together!
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="margin-bottom: 5px;"><strong>Warm regards,</strong></p>
              <p style="color: #00d4ff; font-weight: bold; margin-top: 0;">The Syed Web Design &amp; Development Team</p>
            </div>
          </div>
        `,
      }),
    });

    if (!userEmailRes.ok) {
      console.warn("Failed to send user confirmation email");
    } else {
      console.log("User confirmation email sent successfully");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-onboarding-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
