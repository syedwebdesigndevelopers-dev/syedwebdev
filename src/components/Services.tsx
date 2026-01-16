import { 
  User, Building2, ShoppingCart, Newspaper, GraduationCap, 
  Users, Layers, Building, ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: User,
    title: 'Personal & Identity',
    description: 'Portfolios, resumes, blogs, personal brands, artist showcases, and influencer sites.',
    tags: ['Personal Websites', 'Portfolios', 'Blogs'],
  },
  {
    icon: Building2,
    title: 'Business & Corporate',
    description: 'Corporate sites, startups, agencies, B2B/B2C platforms, and enterprise intranets.',
    tags: ['Corporate Sites', 'Startups', 'Agencies'],
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & Retail',
    description: 'Online stores, marketplaces, multi-vendor platforms, and subscription systems.',
    tags: ['Online Stores', 'Marketplaces', 'Dropshipping'],
  },
  {
    icon: Newspaper,
    title: 'Content & Media',
    description: 'News portals, magazines, video streaming, podcasts, and publishing platforms.',
    tags: ['News Portals', 'Magazines', 'Streaming'],
  },
  {
    icon: GraduationCap,
    title: 'Education & Learning',
    description: 'Schools, universities, LMS platforms, online courses, and certification portals.',
    tags: ['LMS Platforms', 'Online Courses', 'Schools'],
  },
  {
    icon: Users,
    title: 'Community & Social',
    description: 'Social networks, forums, membership sites, and community platforms.',
    tags: ['Social Networks', 'Forums', 'Memberships'],
  },
  {
    icon: Layers,
    title: 'SaaS & Platforms',
    description: 'Web apps, dashboards, analytics tools, AI systems, and developer platforms.',
    tags: ['SaaS Apps', 'Dashboards', 'Analytics'],
  },
  {
    icon: Building,
    title: 'Industry-Specific',
    description: 'Healthcare, fintech, real estate, travel, and government systems.',
    tags: ['Healthcare', 'Fintech', 'Real Estate'],
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            OUR SERVICES
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            100+ Website Categories, <span className="gradient-text">One Partner</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From personal blogs to enterprise platforms, we design and develop every type of website imaginable with cutting-edge technology and stunning design.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative gradient-border p-6 rounded-2xl bg-card hover:bg-secondary/20 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/20 to-magenta/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-6 h-6 text-cyan" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="gradient" size="lg" className="group">
            Explore All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
