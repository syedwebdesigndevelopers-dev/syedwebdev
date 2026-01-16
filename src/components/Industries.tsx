import { 
  Stethoscope, Landmark, GraduationCap, ShoppingBag, 
  Plane, Home, Factory, Building2 
} from 'lucide-react';

const industries = [
  { icon: Stethoscope, name: 'Healthcare', description: 'Hospitals, telemedicine, health portals' },
  { icon: Landmark, name: 'Finance & Banking', description: 'Fintech, banking, insurance platforms' },
  { icon: GraduationCap, name: 'Education', description: 'Schools, universities, e-learning' },
  { icon: ShoppingBag, name: 'E-Commerce', description: 'Retail, marketplaces, D2C brands' },
  { icon: Plane, name: 'Travel & Tourism', description: 'Booking systems, travel portals' },
  { icon: Home, name: 'Real Estate', description: 'Property portals, listings, CRM' },
  { icon: Factory, name: 'Manufacturing', description: 'Industrial systems, supply chain' },
  { icon: Building2, name: 'Government', description: 'Public services, citizen portals' },
];

export const Industries = () => {
  return (
    <section id="industries" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            INDUSTRIES WE SERVE
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Solutions for <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We understand the unique challenges and requirements of different industries, delivering tailored solutions that drive results.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-cyan/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(var(--cyan)/0.15)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan/10 to-magenta/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <industry.icon className="w-7 h-7 text-cyan" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{industry.name}</h3>
              <p className="text-muted-foreground text-sm">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
