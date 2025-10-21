"use client";
import React from "react";
import PricingCard from "./PriceCard";
import FadeInSection from "./motion/FadeInSection";
import { useTranslation } from "@/lib/hooks/useTranslation";

function PricingSection() {
  const { t } = useTranslation();

  const pricingPlans = t<
    {
      id: number;
      title: string;
      price: number;
      period: string;
      description: string;
      features: { text: string; included: boolean }[];
      get_started: string;
    }[]
  >("pricing.plans");

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
