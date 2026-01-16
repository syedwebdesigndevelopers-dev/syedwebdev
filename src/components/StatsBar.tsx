const stats = [
  { value: '500+', label: 'Projects Delivered', subtext: 'Successful launches worldwide' },
  { value: '50+', label: 'Countries Served', subtext: 'Global reach & impact' },
  { value: '15+', label: 'Years Experience', subtext: 'Industry expertise' },
  { value: '24/7', label: 'Support Available', subtext: 'Always here for you' },
];

export const StatsBar = () => {
  return (
    <section className="py-16 border-y border-border bg-card/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
