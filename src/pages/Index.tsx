import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/AnimatedComponents';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, User, Building2, ShoppingCart, Newspaper, GraduationCap, Users, Layers, Building, Stethoscope, Landmark, ShoppingBag, Plane, Home, Factory } from 'lucide-react';

const services = [
  { icon: User, title: 'Personal & Identity', description: 'Portfolios, resumes, blogs, personal brands.' },
  { icon: Building2, title: 'Business & Corporate', description: 'Corporate sites, startups, agencies, B2B/B2C.' },
  { icon: ShoppingCart, title: 'E-Commerce & Retail', description: 'Online stores, marketplaces, subscriptions.' },
  { icon: Newspaper, title: 'Content & Media', description: 'News portals, magazines, streaming.' },
  { icon: GraduationCap, title: 'Education & Learning', description: 'LMS platforms, online courses, schools.' },
  { icon: Users, title: 'Community & Social', description: 'Social networks, forums, memberships.' },
  { icon: Layers, title: 'SaaS & Platforms', description: 'Web apps, dashboards, analytics.' },
  { icon: Building, title: 'Industry-Specific', description: 'Healthcare, fintech, government.' },
];

const industries = [
  { icon: Stethoscope, name: 'Healthcare' }, { icon: Landmark, name: 'Finance' },
  { icon: GraduationCap, name: 'Education' }, { icon: ShoppingBag, name: 'E-Commerce' },
  { icon: Plane, name: 'Travel' }, { icon: Home, name: 'Real Estate' },
  { icon: Factory, name: 'Manufacturing' }, { icon: Building2, name: 'Government' },
];

const testimonials = [
  { quote: "Syed Web delivered an enterprise platform that exceeded all our expectations.", author: 'Sarah Johnson', role: 'CEO, TechVentures' },
  { quote: 'The LMS they built transformed our educational offerings. Student engagement increased by 300%.', author: 'Michael Chen', role: 'Founder, EduLearn' },
  { quote: 'Our healthcare portal is now the industry standard. Exceptional work.', author: 'Emma Williams', role: 'Director, HealthFirst' },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Syed Web Design & Developers | Enterprise Web Development Company</title>
        <meta name="description" content="Full-spectrum global digital solutions company. We design, develop, manage, scale, and innovate websites, web apps, platforms, and software systems." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <PageTransition>
          <Hero />
          <StatsBar />

          {/* Services Preview */}
          <section className="py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">OUR SERVICES</span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">100+ Website Categories, <span className="gradient-text">One Partner</span></h2>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {services.map((service, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.03, y: -5 }} className="gradient-border p-6 rounded-2xl bg-card">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-magenta/20 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-cyan" />
                    </motion.div>
                    <h3 className="font-display text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="gradient" size="lg" asChild><Link to="/services">Explore All Services <ArrowRight className="w-5 h-5 ml-2" /></Link></Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Industries Preview */}
          <section className="py-24 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">INDUSTRIES</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold">Solutions for <span className="gradient-text">Every Industry</span></h2>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {industries.map((industry, index) => (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.05 }} className="p-6 rounded-2xl bg-card border border-border hover:border-cyan/50 text-center transition-all">
                    <industry.icon className="w-10 h-10 text-cyan mx-auto mb-3" />
                    <h3 className="font-semibold">{industry.name}</h3>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline" size="lg" asChild><Link to="/industries">View All Industries</Link></Button>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">TESTIMONIALS</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold">Trusted by <span className="gradient-text">Industry Leaders</span></h2>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02 }} className="p-8 rounded-2xl bg-card border border-border">
                    <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-cyan text-cyan" />)}</div>
                    <blockquote className="text-foreground mb-6">"{t.quote}"</blockquote>
                    <div className="font-semibold">{t.author}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-magenta/10" />
            <div className="container mx-auto px-4 lg:px-8 relative text-center">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Build Your <span className="gradient-text">Digital Empire?</span></h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">Let's discuss your vision and create something amazing together.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="xl" asChild><Link to="/contact">Start Your Project <ArrowRight className="w-5 h-5 ml-2" /></Link></Button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </PageTransition>
        <Footer />
      </div>
    </>
  );
};

export default Index;
