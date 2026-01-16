import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Shield, BadgeCheck } from 'lucide-react';

export const CTA = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-magenta/10" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build Your <span className="gradient-text">Digital Empire?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss your vision and create a website or platform that sets you apart. From concept to launch, we're your complete digital partner.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <Calendar className="w-5 h-5" />
              Schedule Consultation
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-cyan" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan" />
              <span>NDA Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-cyan" />
              <span>Transparent Pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
