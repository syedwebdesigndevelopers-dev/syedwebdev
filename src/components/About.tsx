import { Target, Eye, Rocket, Users, Award, Globe } from 'lucide-react';

const values = [
  { icon: Target, title: 'Mission', description: 'Deliver exceptional digital solutions that transform businesses and empower growth.' },
  { icon: Eye, title: 'Vision', description: 'To be the global leader in web design and development, setting industry standards.' },
  { icon: Rocket, title: 'Innovation', description: 'Constantly pushing boundaries with cutting-edge technologies and creative solutions.' },
];

const team = [
  { icon: Users, count: '150+', label: 'Expert Team' },
  { icon: Award, count: '50+', label: 'Awards Won' },
  { icon: Globe, count: '50+', label: 'Countries' },
];

export const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan/5 to-magenta/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
              ABOUT US
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Building Digital <span className="gradient-text">Empires</span> Since 2009
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Syed Web Design & Developers is not just a web agency — we are a full-spectrum global digital solutions company. From Fortune 500 enterprises to ambitious startups, we design, develop, and scale digital platforms that define industries.
            </p>
            <p className="text-muted-foreground mb-8">
              Our team of 150+ experts across designers, developers, strategists, and project managers work together to deliver excellence. We specialize in everything from simple portfolios to complex enterprise systems, e-commerce platforms, SaaS applications, and government portals.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-cyan/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-magenta/20 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative">
            <div className="gradient-border p-8 rounded-2xl bg-card">
              <h3 className="font-display text-2xl font-bold mb-8 text-center">
                The <span className="gradient-text">Syed Web</span> Difference
              </h3>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                {team.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan/10 to-magenta/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-7 h-7 text-cyan" />
                    </div>
                    <div className="font-display text-2xl font-bold gradient-text">{item.count}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan" />
                  <span className="text-muted-foreground">Enterprise-grade security & compliance</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-magenta" />
                  <span className="text-muted-foreground">Agile development methodology</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan" />
                  <span className="text-muted-foreground">24/7 dedicated support team</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-magenta" />
                  <span className="text-muted-foreground">NDA & contract protection</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan" />
                  <span className="text-muted-foreground">Transparent, competitive pricing</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan to-magenta opacity-20 blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-magenta to-cyan opacity-10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
