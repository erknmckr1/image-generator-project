import React from "react";
import PricingCard from "./PriceCard";
import FadeInSection from "./motion/FadeInSection";

function PricingSection() {
  const pricingPlans = [
    {
      id: 1,
      title: "Basic Plan",
      price: 19,
      period: "Mo",
      description: "Perfect for individuals starting their creative journey.",
      features: [
        { text: "Access to all AI tools", included: true },
        { text: "500 monthly generations", included: true },
        { text: "Standard support", included: true },
        { text: "Community access", included: true },
        { text: "No commercial usage rights", included: false },
      ],
    },
    {
      id: 2,
      title: "Pro Plan",
      price: 39,
      period: "Mo",
      description: "For creators and professionals who need more power.",
      features: [
        { text: "Unlimited generations", included: true },
        { text: "Priority support", included: true },
        { text: "Custom AI style options", included: true },
        { text: "Team sharing tools", included: true },
        { text: "Commercial usage rights", included: true },
      ],
    },
    {
      id: 3,
      title: "Enterprise Plan",
      price: 79,
      period: "Mo",
      description: "Best for teams and companies needing scalability.",
      features: [
        { text: "Dedicated account manager", included: true },
        { text: "Unlimited AI renderings", included: true },
        { text: "Custom model training", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom API integrations", included: true },
      ],
    },
  ];

  return (
    <FadeInSection>
      <section id="pricing" className="bg-background relative">
        {/* Blob background */}
        <div className="absolute bottom-100 -left-30 w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 blur-3xl opacity-50 animate-pulse z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 py-16">
            {pricingPlans.map((item, index) => (
              <PricingCard props={item} key={index} />
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

export default PricingSection;
