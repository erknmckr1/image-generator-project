"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeInSection from "./motion/FadeInSection";
import { useTranslation } from "@/lib/hooks/useTranslation";

// FAQ item için interface tanımla
interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const { t } = useTranslation();
  
  // Generic type ile array olarak çek
  const faqs = t<FAQItem[]>("faq.items");
  const title = t("faq.title");

  // Type guard - eğer array değilse boş array döndür
  const faqItems = Array.isArray(faqs) ? faqs : [];

  return (
    <FadeInSection>
      <section
        id="faq"
        className="relative bg-transparent text-foreground py-24"
      >
        {/* Arka plan efektleri */}
        <div className="absolute -top-20 -right-30 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 blur-3xl opacity-30 animate-float-smooth z-[-1]" />
        <div className="absolute -bottom-20 left-0 w-[280px] h-[280px] rounded-full bg-gradient-to-tl from-blue-500 via-purple-500 to-pink-400 blur-3xl opacity-30 animate-float-smooth-slow z-[-1]" />
        <div className="absolute inset-0 bg-[url('/herobg.jpeg')] opacity-90 pointer-events-none z-[-2]" />

        <div className="relative max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            {title}
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border-b bg-muted/30 px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-left text-lg font-medium text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </FadeInSection>
  );
}