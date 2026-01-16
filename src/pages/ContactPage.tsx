import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Calendar, Shield, BadgeCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/AnimatedComponents';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Syed Web Design & Developers</title>
        <meta name="description" content="Get in touch with our team. Free consultation, NDA protected, transparent pricing. Start your project today." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <PageTransition>
          <section className="pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-6">CONTACT US</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Let's Build Something <span className="gradient-text">Amazing</span></h1>
                <p className="text-xl text-muted-foreground">Ready to start your project? Get in touch and let's discuss your vision.</p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="font-display text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.input 
                        whileFocus={{ scale: 1.02 }} 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name" 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-all" 
                      />
                      <motion.input 
                        whileFocus={{ scale: 1.02 }} 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email" 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-all" 
                      />
                    </div>
                    <motion.input 
                      whileFocus={{ scale: 1.02 }} 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject" 
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-all" 
                    />
                    <motion.textarea 
                      whileFocus={{ scale: 1.02 }} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..." 
                      rows={5} 
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-all resize-none" 
                    />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
                  <div className="p-8 rounded-2xl bg-card border border-border">
                    <h3 className="font-display text-xl font-semibold mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      {[{ icon: Mail, text: 'syedwebdesigndevelopers@gmail.com' }, { icon: Phone, text: '+91 6302263011' }, { icon: MapPin, text: 'India' }].map((item, i) => (
                        <motion.div key={i} whileHover={{ x: 5 }} className="flex items-center gap-3 text-muted-foreground">
                          <item.icon className="w-5 h-5 text-cyan" /><span>{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan/10 to-magenta/10 border border-border">
                    <h3 className="font-display text-xl font-semibold mb-4">Why Choose Us?</h3>
                    <div className="space-y-3">
                      {[{ icon: BadgeCheck, text: 'Free Consultation' }, { icon: Shield, text: 'NDA Protected' }, { icon: Calendar, text: 'Transparent Pricing' }].map((item, i) => (
                        <div key={i} className="flex items-center gap-3"><item.icon className="w-5 h-5 text-cyan" /><span>{item.text}</span></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </PageTransition>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
