import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition, staggerContainer, staggerItem } from '@/components/AnimatedComponents';

const projects = [
  {
    title: 'TechCorp Enterprise Platform',
    category: 'SaaS',
    description: 'Complete enterprise resource planning platform with real-time analytics',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'HealthFirst Medical Portal',
    category: 'Healthcare',
    description: 'HIPAA-compliant telemedicine platform serving 50,000+ patients',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop',
    tech: ['Next.js', 'Python', 'MongoDB', 'GCP'],
  },
  {
    title: 'EduLearn LMS Platform',
    category: 'Education',
    description: 'Learning management system with 300% increase in student engagement',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
    tech: ['Vue.js', 'Django', 'PostgreSQL', 'Vercel'],
  },
  {
    title: 'ShopMax E-Commerce',
    category: 'E-Commerce',
    description: 'Multi-vendor marketplace handling $10M+ monthly transactions',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    tech: ['React', 'Node.js', 'Redis', 'Stripe'],
  },
  {
    title: 'TravelHub Booking System',
    category: 'Travel',
    description: 'End-to-end travel booking platform with real-time availability',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop',
    tech: ['Next.js', 'Go', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'FinSecure Banking App',
    category: 'Fintech',
    description: 'PCI-DSS compliant digital banking solution with 500K+ users',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    tech: ['React Native', 'Java', 'Oracle', 'Azure'],
  },
];

const PortfolioPage = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio | Syed Web Design & Developers</title>
        <meta name="description" content="Explore our portfolio of successful projects across industries. From enterprise platforms to e-commerce giants, see how we deliver results." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <PageTransition>
          {/* Hero Section */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8 relative">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-6"
                >
                  PORTFOLIO
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  Our <span className="gradient-text">Latest Work</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-muted-foreground"
                >
                  Explore our recent projects showcasing innovation and excellence across industries.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ y: -10 }}
                    className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-cyan/50 transition-all duration-500"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end justify-center pb-6"
                      >
                        <Button variant="glass" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-xs text-cyan font-medium uppercase tracking-wider"
                      >
                        {project.category}
                      </motion.span>
                      <h3 className="font-display text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.05 }}
                            className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: '500+', label: 'Projects Completed' },
                  { value: '99%', label: 'Client Satisfaction' },
                  { value: '50+', label: 'Countries Served' },
                  { value: '15+', label: 'Years Experience' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-center"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Ready to Join Our Success Stories?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Let's create something amazing together. Start your project today.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/contact">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
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

export default PortfolioPage;
