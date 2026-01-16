const steps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your vision, goals, and requirements to create a comprehensive project roadmap.',
  },
  {
    number: '02',
    title: 'Design & Development',
    description: 'Our experts craft stunning designs and build robust, scalable solutions using cutting-edge technologies.',
  },
  {
    number: '03',
    title: 'Testing & QA',
    description: 'Rigorous testing ensures your platform is secure, fast, and performs flawlessly across all devices.',
  },
  {
    number: '04',
    title: 'Launch & Deploy',
    description: 'We handle everything from hosting setup to deployment, ensuring a smooth and successful launch.',
  },
  {
    number: '05',
    title: 'Support & Growth',
    description: 'Ongoing maintenance, updates, and optimization to keep your digital presence ahead of the curve.',
  },
];

export const Process = () => {
  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            OUR PROCESS
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            From Vision to <span className="gradient-text">Reality</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our proven agile methodology ensures every project is delivered on time, on budget, and beyond expectations.
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-magenta to-cyan hidden md:block" />

            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number */}
                <div className="flex-shrink-0 md:w-1/2 flex md:justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-magenta flex items-center justify-center font-display text-2xl font-bold text-primary-foreground z-10">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
