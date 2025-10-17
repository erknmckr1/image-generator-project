"use client";

import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PricingPlan = {
  id: number;
  title: string;
  price: number;
  period: string;
  description: string;
  features: {
    text: string;
    included: boolean;
  }[];
};

export default function PriceCard({ props }: { props: PricingPlan }) {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-accent/10 to-muted/20 border border-border rounded-2xl p-8 w-full max-w-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Fiyat */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-foreground mb-1">
          ${props.price}
          <span className="text-muted-foreground text-lg font-normal">
            {" "}
            /{props.period}
          </span>
        </h2>
      </div>

      {/* Plan Başlığı */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {props.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-6">{props.description}</p>

      {/* Buton */}
      <Button
        variant="outline"
        className="w-full justify-center rounded-full transition border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
      >
        Get Started <ArrowRight className="ml-2 w-4 h-4" />
      </Button>

      {/* Özellikler */}
      <ul className="mt-8 space-y-3 text-sm">
        {props.features.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-muted-foreground"
          >
            {item.included === true ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <X className="w-4 h-4 text-destructive" />
            )}{" "}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
