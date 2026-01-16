import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, ArrowRight, Check, Globe, Palette, FileText, Settings, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Form schema for all steps
const formSchema = z.object({
  // Step 1: Business & Contact
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  businessName: z.string().min(2, 'Please enter your business name'),
  businessType: z.string().min(1, 'Please select your business type'),
  
  // Step 2: Website Purpose
  websitePurpose: z.string().min(1, 'Please select a purpose'),
  targetAudience: z.string().min(10, 'Please describe your target audience'),
  mainGoal: z.string().min(10, 'Please describe your main goal'),
  
  // Step 3: Design Preferences
  designStyle: z.string().min(1, 'Please select a design style'),
  colorPreference: z.string().optional(),
  referenceWebsites: z.string().optional(),
  
  // Step 4: Content & Pages
  requiredPages: z.array(z.string()).min(1, 'Please select at least one page'),
  hasContent: z.string().min(1, 'Please select an option'),
  specialFeatures: z.string().optional(),
  
  // Step 5: Domain & Agreement
  domainPreference: z.string().min(1, 'Please select an option'),
  existingDomain: z.string().optional(),
  timeline: z.string().min(1, 'Please select a timeline'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to proceed'),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: 'Business & Contact', icon: Globe },
  { id: 2, title: 'Website Purpose', icon: Settings },
  { id: 3, title: 'Design Preferences', icon: Palette },
  { id: 4, title: 'Content & Pages', icon: FileText },
  { id: 5, title: 'Domain & Agreement', icon: CheckCircle2 },
];

const businessTypes = [
  'Small Business',
  'Startup',
  'E-commerce Store',
  'Restaurant / Cafe',
  'Healthcare / Medical',
  'Real Estate',
  'Professional Services',
  'Non-Profit Organization',
  'Personal Brand / Portfolio',
  'Educational Institution',
  'Other',
];

const websitePurposes = [
  'Showcase my products/services',
  'Generate leads and inquiries',
  'Sell products online (E-commerce)',
  'Build brand awareness',
  'Provide information to customers',
  'Portfolio / Personal branding',
  'Community / Membership platform',
];

const designStyles = [
  { value: 'modern-minimal', label: 'Modern & Minimal', desc: 'Clean lines, lots of white space' },
  { value: 'bold-creative', label: 'Bold & Creative', desc: 'Vibrant colors, unique layouts' },
  { value: 'professional-corporate', label: 'Professional & Corporate', desc: 'Trustworthy, established look' },
  { value: 'elegant-luxury', label: 'Elegant & Luxury', desc: 'Sophisticated, premium feel' },
  { value: 'friendly-approachable', label: 'Friendly & Approachable', desc: 'Warm colors, inviting design' },
];

const pageOptions = [
  'Home Page',
  'About Us',
  'Services',
  'Products / Shop',
  'Portfolio / Gallery',
  'Testimonials',
  'Blog',
  'Contact Us',
  'FAQ',
  'Pricing',
  'Team Members',
  'Booking / Appointments',
];

const StartYourWebsite = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requiredPages: ['Home Page', 'About Us', 'Contact Us'],
      agreeToTerms: false,
    },
  });

  const watchedValues = watch();

  const validateStep = async (step: number) => {
    const fieldsToValidate: (keyof FormData)[][] = [
      ['fullName', 'email', 'phone', 'businessName', 'businessType'],
      ['websitePurpose', 'targetAudience', 'mainGoal'],
      ['designStyle'],
      ['requiredPages', 'hasContent'],
      ['domainPreference', 'timeline', 'agreeToTerms'],
    ];
    
    const result = await trigger(fieldsToValidate[step - 1]);
    return result;
  };

  const handleContinue = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-onboarding-email', {
        body: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          businessName: data.businessName,
          businessType: data.businessType,
          websitePurpose: data.websitePurpose,
          targetAudience: data.targetAudience,
          mainGoal: data.mainGoal,
          designStyle: data.designStyle,
          colorPreference: data.colorPreference || 'Not specified',
          referenceWebsites: data.referenceWebsites || 'None provided',
          requiredPages: data.requiredPages,
          hasContent: data.hasContent,
          specialFeatures: data.specialFeatures || 'None specified',
          domainPreference: data.domainPreference,
          existingDomain: data.existingDomain || 'N/A',
          timeline: data.timeline,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an issue submitting your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePage = (page: string) => {
    const currentPages = watchedValues.requiredPages || [];
    if (currentPages.includes(page)) {
      setValue('requiredPages', currentPages.filter(p => p !== page));
    } else {
      setValue('requiredPages', [...currentPages, page]);
    }
  };

  // Success Screen
  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Thank You - Syed Web Design & Development</title>
        </Helmet>
        <Navbar />
        <main className="min-h-screen bg-background pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-cyan to-magenta rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Thank You!
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Your website request has been received.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our team has started working on your website.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                You will receive a website preview soon.
              </p>
              
              <div className="glass rounded-2xl p-6 mb-8">
                <p className="text-muted-foreground">
                  We've sent a confirmation email to <span className="text-foreground font-medium">{watchedValues.email}</span> with the details of your request.
                </p>
              </div>
              
              <Button variant="hero" size="lg" asChild>
                <Link to="/">
                  Return to Home
                </Link>
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Start Your Website - Syed Web Design & Development</title>
        <meta name="description" content="Start your website project with Syed Web Design & Development. Share your business details and our team will begin designing your website." />
      </Helmet>
      <Navbar />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Start Your <span className="gradient-text">Website Project</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Share your business details and our team will begin designing your website.
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                          backgroundColor: isCompleted || isCurrent ? 'hsl(var(--cyan))' : 'hsl(var(--muted))',
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          isCompleted || isCurrent ? 'text-white' : 'text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                      </motion.div>
                      <span className={`text-xs mt-2 text-center hidden md:block ${
                        isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 rounded ${
                        isCompleted ? 'bg-cyan' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-muted-foreground mt-4 md:hidden">
              Step {currentStep} of 5: {steps[currentStep - 1].title}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Business & Contact Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Business & Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="John Smith"
                          {...register('fullName')}
                          className="mt-1"
                        />
                        {errors.fullName && (
                          <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          {...register('email')}
                          className="mt-1"
                        />
                        {errors.email && (
                          <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          {...register('phone')}
                          className="mt-1"
                        />
                        {errors.phone && (
                          <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          placeholder="Your Company Name"
                          {...register('businessName')}
                          className="mt-1"
                        />
                        {errors.businessName && (
                          <p className="text-destructive text-sm mt-1">{errors.businessName.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Type of Business *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {businessTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setValue('businessType', type)}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                              watchedValues.businessType === type
                                ? 'bg-cyan text-white'
                                : 'bg-muted hover:bg-muted/80 text-foreground'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {errors.businessType && (
                        <p className="text-destructive text-sm mt-1">{errors.businessType.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Website Purpose & Goals */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Website Purpose & Goals</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label>What is the main purpose of your website? *</Label>
                      <div className="grid gap-2 mt-2">
                        {websitePurposes.map((purpose) => (
                          <button
                            key={purpose}
                            type="button"
                            onClick={() => setValue('websitePurpose', purpose)}
                            className={`px-4 py-3 rounded-lg text-left transition-all ${
                              watchedValues.websitePurpose === purpose
                                ? 'bg-cyan text-white'
                                : 'bg-muted hover:bg-muted/80 text-foreground'
                            }`}
                          >
                            {purpose}
                          </button>
                        ))}
                      </div>
                      {errors.websitePurpose && (
                        <p className="text-destructive text-sm mt-1">{errors.websitePurpose.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="targetAudience">Who is your target audience? *</Label>
                      <Textarea
                        id="targetAudience"
                        placeholder="Describe who you want to reach (e.g., young professionals aged 25-40 interested in fitness)"
                        {...register('targetAudience')}
                        className="mt-1 min-h-[100px]"
                      />
                      {errors.targetAudience && (
                        <p className="text-destructive text-sm mt-1">{errors.targetAudience.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="mainGoal">What would you like visitors to do on your website? *</Label>
                      <Textarea
                        id="mainGoal"
                        placeholder="e.g., Contact us for a quote, Purchase products, Book an appointment"
                        {...register('mainGoal')}
                        className="mt-1 min-h-[100px]"
                      />
                      {errors.mainGoal && (
                        <p className="text-destructive text-sm mt-1">{errors.mainGoal.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Design Preferences */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Design Preferences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label>What design style appeals to you? *</Label>
                      <div className="grid gap-3 mt-2">
                        {designStyles.map((style) => (
                          <button
                            key={style.value}
                            type="button"
                            onClick={() => setValue('designStyle', style.value)}
                            className={`px-4 py-4 rounded-lg text-left transition-all ${
                              watchedValues.designStyle === style.value
                                ? 'bg-cyan text-white'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            <span className="font-medium block">{style.label}</span>
                            <span className={`text-sm ${
                              watchedValues.designStyle === style.value ? 'text-white/80' : 'text-muted-foreground'
                            }`}>
                              {style.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                      {errors.designStyle && (
                        <p className="text-destructive text-sm mt-1">{errors.designStyle.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="colorPreference">Do you have any color preferences?</Label>
                      <Input
                        id="colorPreference"
                        placeholder="e.g., Blue and white, Earth tones, Our brand colors are #00d4ff"
                        {...register('colorPreference')}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="referenceWebsites">Any websites you admire? (Optional)</Label>
                      <Textarea
                        id="referenceWebsites"
                        placeholder="Share links to websites whose design or features you like"
                        {...register('referenceWebsites')}
                        className="mt-1 min-h-[80px]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Content & Pages */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Content & Pages Required</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label>Which pages do you need? (Select all that apply) *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {pageOptions.map((page) => {
                          const isSelected = watchedValues.requiredPages?.includes(page);
                          return (
                            <button
                              key={page}
                              type="button"
                              onClick={() => togglePage(page)}
                              className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                                isSelected
                                  ? 'bg-cyan text-white'
                                  : 'bg-muted hover:bg-muted/80 text-foreground'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isSelected ? 'bg-white border-white' : 'border-muted-foreground'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 text-cyan" />}
                              </div>
                              {page}
                            </button>
                          );
                        })}
                      </div>
                      {errors.requiredPages && (
                        <p className="text-destructive text-sm mt-1">{errors.requiredPages.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label>Do you have content ready (text, images, videos)? *</Label>
                      <RadioGroup
                        value={watchedValues.hasContent}
                        onValueChange={(value) => setValue('hasContent', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                          <RadioGroupItem value="yes" id="content-yes" />
                          <Label htmlFor="content-yes" className="cursor-pointer flex-1">Yes, I have all content ready</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                          <RadioGroupItem value="partial" id="content-partial" />
                          <Label htmlFor="content-partial" className="cursor-pointer flex-1">I have some content, need help with the rest</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                          <RadioGroupItem value="no" id="content-no" />
                          <Label htmlFor="content-no" className="cursor-pointer flex-1">No, I need content creation assistance</Label>
                        </div>
                      </RadioGroup>
                      {errors.hasContent && (
                        <p className="text-destructive text-sm mt-1">{errors.hasContent.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="specialFeatures">Any special features needed? (Optional)</Label>
                      <Textarea
                        id="specialFeatures"
                        placeholder="e.g., Online booking system, Payment integration, Live chat, Newsletter signup"
                        {...register('specialFeatures')}
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Domain & Agreement */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Domain Preferences & Agreement</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label>Domain Name Preference *</Label>
                      <RadioGroup
                        value={watchedValues.domainPreference}
                        onValueChange={(value) => setValue('domainPreference', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                          <RadioGroupItem value="have-domain" id="domain-have" />
                          <Label htmlFor="domain-have" className="cursor-pointer flex-1">I already have a domain name</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                          <RadioGroupItem value="need-domain" id="domain-need" />
                          <Label htmlFor="domain-need" className="cursor-pointer flex-1">I need help registering a domain</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                          <RadioGroupItem value="undecided" id="domain-undecided" />
                          <Label htmlFor="domain-undecided" className="cursor-pointer flex-1">I'm not sure yet, need guidance</Label>
                        </div>
                      </RadioGroup>
                      {errors.domainPreference && (
                        <p className="text-destructive text-sm mt-1">{errors.domainPreference.message}</p>
                      )}
                    </div>
                    
                    {watchedValues.domainPreference === 'have-domain' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <Label htmlFor="existingDomain">Your Domain Name</Label>
                        <Input
                          id="existingDomain"
                          placeholder="e.g., mycompany.com"
                          {...register('existingDomain')}
                          className="mt-1"
                        />
                      </motion.div>
                    )}
                    
                    <div>
                      <Label>What is your preferred timeline? *</Label>
                      <RadioGroup
                        value={watchedValues.timeline}
                        onValueChange={(value) => setValue('timeline', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                          <RadioGroupItem value="urgent" id="timeline-urgent" />
                          <Label htmlFor="timeline-urgent" className="cursor-pointer flex-1">Urgent (Within 1-2 weeks)</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                          <RadioGroupItem value="normal" id="timeline-normal" />
                          <Label htmlFor="timeline-normal" className="cursor-pointer flex-1">Standard (2-4 weeks)</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                          <RadioGroupItem value="flexible" id="timeline-flexible" />
                          <Label htmlFor="timeline-flexible" className="cursor-pointer flex-1">Flexible (No rush, take your time)</Label>
                        </div>
                      </RadioGroup>
                      {errors.timeline && (
                        <p className="text-destructive text-sm mt-1">{errors.timeline.message}</p>
                      )}
                    </div>
                    
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => setValue('agreeToTerms', !watchedValues.agreeToTerms)}
                          className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                            watchedValues.agreeToTerms 
                              ? 'bg-cyan border-cyan' 
                              : 'border-muted-foreground hover:border-foreground'
                          }`}
                        >
                          {watchedValues.agreeToTerms && <Check className="w-3 h-3 text-white" />}
                        </button>
                        <Label 
                          htmlFor="agreeToTerms" 
                          className="cursor-pointer text-sm leading-relaxed"
                          onClick={() => setValue('agreeToTerms', !watchedValues.agreeToTerms)}
                        >
                          I understand that by submitting this form, Syed Web Design & Development will contact me to discuss my project requirements. I agree to receive communications regarding my website project.
                        </Label>
                      </div>
                      {errors.agreeToTerms && (
                        <p className="text-destructive text-sm mt-2">{errors.agreeToTerms.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  asChild
                >
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                </Button>
              )}
              
              {currentStep < 5 ? (
                <Button
                  type="button"
                  variant="hero"
                  onClick={handleContinue}
                  className="gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="hero"
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit & Start My Website'}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default StartYourWebsite;
