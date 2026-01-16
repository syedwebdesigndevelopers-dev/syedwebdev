import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition, staggerContainer, staggerItem } from '@/components/AnimatedComponents';

const techStack = {
  frontend: [
    { name: 'React', icon: '⚛️', description: 'Component-based UI library' },
    { name: 'Next.js', icon: '▲', description: 'React framework for production' },
    { name: 'Vue.js', icon: '💚', description: 'Progressive JavaScript framework' },
    { name: 'TypeScript', icon: '🔷', description: 'Typed JavaScript at scale' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
    { name: 'Angular', icon: '🅰️', description: 'Platform for web applications' },
  ],
  backend: [
    { name: 'Node.js', icon: '💚', description: 'JavaScript runtime' },
    { name: 'Python', icon: '🐍', description: 'Versatile programming language' },
    { name: 'PHP', icon: '🐘', description: 'Server-side scripting' },
    { name: 'Java', icon: '☕', description: 'Enterprise applications' },
    { name: 'Go', icon: '🔵', description: 'Efficient compiled language' },
    { name: 'Ruby', icon: '💎', description: 'Elegant web development' },
  ],
  database: [
    { name: 'PostgreSQL', icon: '🐘', description: 'Advanced relational database' },
    { name: 'MongoDB', icon: '🍃', description: 'NoSQL document database' },
    { name: 'MySQL', icon: '🐬', description: 'Popular relational database' },
    { name: 'Redis', icon: '🔴', description: 'In-memory data store' },
    { name: 'Firebase', icon: '🔥', description: 'Real-time database' },
    { name: 'Supabase', icon: '⚡', description: 'Open source Firebase alternative' },
  ],
  cloud: [
    { name: 'AWS', icon: '☁️', description: 'Amazon cloud services' },
    { name: 'Google Cloud', icon: '🌐', description: 'Google cloud platform' },
    { name: 'Azure', icon: '📘', description: 'Microsoft cloud services' },
    { name: 'Vercel', icon: '▲', description: 'Frontend cloud platform' },
    { name: 'Docker', icon: '🐳', description: 'Container platform' },
    { name: 'Kubernetes', icon: '☸️', description: 'Container orchestration' },
  ],
};

const additionalTech = [
  'REST & GraphQL APIs',
  'CI/CD Pipelines',
  'WCAG Accessibility',
  'GDPR Compliance',
  'SSL & Security',
  'Performance Optimization',
  'Microservices',
  'Serverless',
  'WebSockets',
  'PWA Development',
  'OAuth & JWT',
  'Content Delivery Networks',
];

const TechnologiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Technologies | Syed Web Design & Developers</title>
        <meta name="description" content="Powered by modern tech stack. We leverage the latest technologies and industry best practices to build scalable, secure, and high-performance digital solutions." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <PageTransition>
          {/* Hero Section */}
          <section className="pt-32 pb-20 relative overflow-hidden">
            <div className="absolute inset-0">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan/10 rounded-full blur-3xl"
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, delay: 4 }}
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-magenta/10 rounded-full blur-3xl"
              />
            </div>

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
                  TECHNOLOGIES
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  Powered by <span className="gradient-text">Modern Tech Stack</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-muted-foreground"
                >
                  We leverage the latest technologies and industry best practices to build scalable, secure, and high-performance digital solutions.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Tech Stack Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(techStack).map(([category, techs], categoryIndex) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border"
                  >
                    <motion.h3 
                      className="text-sm font-semibold uppercase tracking-wider text-primary mb-6"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {category}
                    </motion.h3>
                    <motion.div 
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      {techs.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          variants={staggerItem}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
                        >
                          <motion.span 
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="text-xl"
                          >
                            {tech.icon}
                          </motion.span>
                          <div>
                            <span className="text-sm font-medium group-hover:text-primary transition-colors">{tech.name}</span>
                            <p className="text-xs text-muted-foreground">{tech.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Technologies */}
          <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Additional <span className="gradient-text">Capabilities</span>
                </h2>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
              >
                {additionalTech.map((tech, index) => (
                  <motion.span
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border text-sm hover:border-cyan/50 hover:text-primary transition-all cursor-default"
                  >
                    <CheckCircle className="w-4 h-4 text-cyan" />
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
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
                  Need a Specific Technology?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  We continuously expand our tech stack. Let's discuss your specific requirements.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/contact">
                      Discuss Your Project
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

export default TechnologiesPage;
