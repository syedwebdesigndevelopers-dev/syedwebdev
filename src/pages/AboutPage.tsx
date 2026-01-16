import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Rocket, Users, Award, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/AnimatedComponents';

const values = [
  { icon: Target, title: 'Mission', description: 'Deliver exceptional digital solutions that transform businesses and empower growth.' },
  { icon: Eye, title: 'Vision', description: 'To be the global leader in web design and development, setting industry standards.' },
  { icon: Rocket, title: 'Innovation', description: 'Constantly pushing boundaries with cutting-edge technologies and creative solutions.' },
];

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Syed Web Design & Developers</title>
        <meta name="description" content="Building digital empires since 2009. Learn about our mission, vision, and the team behind Syed Web Design & Developers." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <PageTransition>
          <section className="pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-6">ABOUT US</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Building Digital <span className="gradient-text">Empires</span> Since 2009</h1>
                <p className="text-xl text-muted-foreground">We are a full-spectrum global digital solutions company. From Fortune 500 enterprises to ambitious startups, we design, develop, and scale digital platforms that define industries.</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 mb-20">
                {values.map((value, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }} className="p-8 rounded-2xl bg-card border border-border text-center">
                    <motion.div whileHover={{ rotate: 10 }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan/20 to-magenta/20 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-cyan" />
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                {[{ icon: Users, count: '150+', label: 'Team Members' }, { icon: Award, count: '50+', label: 'Awards Won' }, { icon: Globe, count: '50+', label: 'Countries' }, { icon: Rocket, count: '500+', label: 'Projects' }].map((stat, index) => (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} whileHover={{ scale: 1.1 }} className="text-center">
                    <stat.icon className="w-10 h-10 text-cyan mx-auto mb-3" />
                    <div className="font-display text-3xl font-bold gradient-text mb-1">{stat.count}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
                <h2 className="font-display text-3xl font-bold mb-4">Ready to Work With Us?</h2>
                <Button variant="hero" size="xl" asChild><Link to="/contact">Get In Touch <ArrowRight className="w-5 h-5 ml-2" /></Link></Button>
              </motion.div>
            </div>
          </section>
        </PageTransition>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
