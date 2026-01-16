import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, Building2, ShoppingCart, Newspaper, GraduationCap, 
  Users, Layers, Building, ArrowRight, Code, Palette, 
  Smartphone, Database, Cloud, Shield, Search, Wrench,
  Globe, Zap, LineChart, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition, staggerContainer, staggerItem } from '@/components/AnimatedComponents';

const websiteCategories = [
  {
    icon: User,
    title: 'Personal & Identity',
    description: 'Portfolios, resumes, blogs, personal brands, artist showcases, influencer sites, author websites, student profiles.',
    tags: ['Personal Websites', 'Portfolios', 'Blogs', 'Resumes', 'Influencer Sites'],
  },
  {
    icon: Building2,
    title: 'Business & Corporate',
    description: 'Corporate sites, startups, agencies, B2B/B2C platforms, enterprise intranets, company profiles, franchises.',
    tags: ['Corporate Sites', 'Startups', 'Agencies', 'B2B', 'B2C', 'Intranets'],
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & Retail',
    description: 'Online stores, marketplaces, multi-vendor platforms, subscription systems, dropshipping, D2C brands.',
    tags: ['Online Stores', 'Marketplaces', 'Dropshipping', 'Subscriptions', 'D2C'],
  },
  {
    icon: Newspaper,
    title: 'Content & Media',
    description: 'News portals, magazines, video streaming, podcasts, publishing platforms, entertainment sites.',
    tags: ['News Portals', 'Magazines', 'Streaming', 'Podcasts', 'Entertainment'],
  },
  {
    icon: GraduationCap,
    title: 'Education & Learning',
    description: 'Schools, universities, LMS platforms, online courses, certification portals, tutoring websites.',
    tags: ['LMS Platforms', 'Online Courses', 'Schools', 'Universities', 'Certifications'],
  },
  {
    icon: Users,
    title: 'Community & Social',
    description: 'Social networks, forums, membership sites, community platforms, Q&A sites, fan communities.',
    tags: ['Social Networks', 'Forums', 'Memberships', 'Communities', 'Q&A'],
  },
  {
    icon: Layers,
    title: 'SaaS & Platforms',
    description: 'Web apps, dashboards, analytics tools, AI systems, developer platforms, productivity tools.',
    tags: ['SaaS Apps', 'Dashboards', 'Analytics', 'AI Tools', 'APIs'],
  },
  {
    icon: Building,
    title: 'Industry-Specific',
    description: 'Healthcare, fintech, real estate, travel, government systems, manufacturing, insurance.',
    tags: ['Healthcare', 'Fintech', 'Real Estate', 'Travel', 'Government'],
  },
];

const additionalServices = [
  { icon: Code, title: 'Custom Development', description: 'Bespoke solutions tailored to your unique business needs' },
  { icon: Palette, title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces that users love' },
  { icon: Smartphone, title: 'Mobile-First', description: 'Responsive designs optimized for all devices' },
  { icon: Database, title: 'Database Design', description: 'Scalable data architecture for growth' },
  { icon: Cloud, title: 'Cloud Deployment', description: 'AWS, GCP, Azure hosting and scaling' },
  { icon: Shield, title: 'Security', description: 'Enterprise-grade protection and compliance' },
  { icon: Search, title: 'SEO Optimization', description: 'Search engine visibility and rankings' },
  { icon: Wrench, title: 'Maintenance', description: '24/7 support and ongoing updates' },
  { icon: Globe, title: 'Internationalization', description: 'Multi-language and global reach' },
  { icon: Zap, title: 'Performance', description: 'Lightning-fast load times' },
  { icon: LineChart, title: 'Analytics', description: 'Data-driven insights and tracking' },
  { icon: Settings, title: 'API Integration', description: 'Connect with any third-party service' },
];

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Syed Web Design & Developers</title>
        <meta name="description" content="100+ website categories, one partner. From personal blogs to enterprise platforms, we design and develop every type of website imaginable." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <PageTransition>
          {/* Hero Section */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="absolute inset-0">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 right-20 w-96 h-96 border border-cyan/10 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                className="absolute top-40 right-40 w-64 h-64 border border-magenta/10 rounded-full"
              />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
              >
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-6"
                >
                  OUR SERVICES
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  100+ Website Categories, <span className="gradient-text">One Partner</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-muted-foreground mb-8"
                >
                  From personal blogs to enterprise platforms, we design and develop every type of website imaginable with cutting-edge technology and stunning design.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Website Categories */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {websiteCategories.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative gradient-border p-6 rounded-2xl bg-card transition-all duration-300"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan/20 to-magenta/20 flex items-center justify-center mb-4"
                    >
                      <service.icon className="w-7 h-7 text-cyan" />
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: tagIndex * 0.05 }}
                          className="px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Additional Services */}
          <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Additional <span className="gradient-text">Services</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Beyond website development, we offer comprehensive digital solutions to power your business.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {additionalServices.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05 }}
                    className="p-5 rounded-xl bg-card border border-border hover:border-cyan/30 transition-all duration-300"
                  >
                    <motion.div whileHover={{ rotate: 10 }}>
                      <service.icon className="w-8 h-8 text-cyan mb-3" />
                    </motion.div>
                    <h3 className="font-semibold mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden p-12 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 via-transparent to-magenta/20" />
                <div className="relative">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Ready to Start Your Project?
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Let's discuss your requirements and create something amazing together.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="hero" size="xl" asChild>
                      <Link to="/contact">
                        Get Free Consultation
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </PageTransition>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
