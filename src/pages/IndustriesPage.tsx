import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, Landmark, GraduationCap, ShoppingBag, 
  Plane, Home, Factory, Building2, Briefcase, Car,
  Utensils, Dumbbell, Film, Music, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition, staggerContainer, staggerItem } from '@/components/AnimatedComponents';

const industries = [
  { 
    icon: Stethoscope, 
    name: 'Healthcare', 
    description: 'Hospitals, telemedicine, health portals, patient management systems',
    color: 'from-red-500/20 to-pink-500/20'
  },
  { 
    icon: Landmark, 
    name: 'Finance & Banking', 
    description: 'Fintech, banking platforms, insurance, investment portals',
    color: 'from-green-500/20 to-emerald-500/20'
  },
  { 
    icon: GraduationCap, 
    name: 'Education', 
    description: 'Schools, universities, e-learning, LMS platforms',
    color: 'from-blue-500/20 to-indigo-500/20'
  },
  { 
    icon: ShoppingBag, 
    name: 'E-Commerce', 
    description: 'Retail, marketplaces, D2C brands, subscription platforms',
    color: 'from-orange-500/20 to-amber-500/20'
  },
  { 
    icon: Plane, 
    name: 'Travel & Tourism', 
    description: 'Booking systems, travel portals, hospitality management',
    color: 'from-sky-500/20 to-cyan-500/20'
  },
  { 
    icon: Home, 
    name: 'Real Estate', 
    description: 'Property portals, listings, CRM, virtual tours',
    color: 'from-violet-500/20 to-purple-500/20'
  },
  { 
    icon: Factory, 
    name: 'Manufacturing', 
    description: 'Industrial systems, supply chain, inventory management',
    color: 'from-slate-500/20 to-gray-500/20'
  },
  { 
    icon: Building2, 
    name: 'Government', 
    description: 'Public services, citizen portals, administrative systems',
    color: 'from-teal-500/20 to-cyan-500/20'
  },
  { 
    icon: Briefcase, 
    name: 'Professional Services', 
    description: 'Law firms, consulting, accounting, HR platforms',
    color: 'from-amber-500/20 to-yellow-500/20'
  },
  { 
    icon: Car, 
    name: 'Automotive', 
    description: 'Dealerships, rental services, auto parts, fleet management',
    color: 'from-red-500/20 to-orange-500/20'
  },
  { 
    icon: Utensils, 
    name: 'Food & Restaurant', 
    description: 'Ordering systems, reservations, delivery platforms',
    color: 'from-rose-500/20 to-pink-500/20'
  },
  { 
    icon: Dumbbell, 
    name: 'Fitness & Wellness', 
    description: 'Gyms, yoga studios, wellness apps, booking systems',
    color: 'from-lime-500/20 to-green-500/20'
  },
  { 
    icon: Film, 
    name: 'Entertainment', 
    description: 'Streaming, gaming, events, ticketing platforms',
    color: 'from-fuchsia-500/20 to-pink-500/20'
  },
  { 
    icon: Music, 
    name: 'Media & Publishing', 
    description: 'News portals, magazines, podcasts, content platforms',
    color: 'from-indigo-500/20 to-blue-500/20'
  },
];

const IndustriesPage = () => {
  return (
    <>
      <Helmet>
        <title>Industries We Serve | Syed Web Design & Developers</title>
        <meta name="description" content="We understand the unique challenges of different industries, delivering tailored digital solutions for healthcare, finance, education, e-commerce, and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <PageTransition>
          {/* Hero Section */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-40 left-20 w-72 h-72 bg-cyan/5 rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
              className="absolute bottom-20 right-20 w-96 h-96 bg-magenta/5 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 lg:px-8 relative">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-6"
                >
                  INDUSTRIES WE SERVE
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  Solutions for <span className="gradient-text">Every Industry</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-muted-foreground"
                >
                  We understand the unique challenges and requirements of different industries, delivering tailored solutions that drive results.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Industries Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {industries.map((industry, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.03, y: -8 }}
                    className="group p-6 rounded-2xl bg-card border border-border hover:border-cyan/50 transition-all duration-300 cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4`}
                    >
                      <industry.icon className="w-8 h-8 text-cyan" />
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">{industry.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Why Industry <span className="gradient-text">Expertise Matters</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Each industry has unique requirements, regulations, and user expectations. Our specialized teams understand these nuances.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Compliance Ready', description: 'Built-in compliance for industry regulations like HIPAA, PCI-DSS, GDPR' },
                  { title: 'Domain Expertise', description: 'Teams with deep understanding of industry workflows and best practices' },
                  { title: 'Proven Results', description: 'Track record of successful projects across all major industries' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-8 rounded-2xl bg-card border border-border text-center"
                  >
                    <motion.div 
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan/20 to-magenta/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <span className="text-2xl font-bold gradient-text">{index + 1}</span>
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
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
                  Don't See Your Industry?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  We work with businesses across all sectors. Let's discuss your specific requirements.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/contact">
                      Contact Us Today
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

export default IndustriesPage;
