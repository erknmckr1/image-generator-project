"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeInSection from "./motion/FadeInSection";

export default function FAQSection() {
  const faqs = [
    {
      question: "Can I use my photos anywhere?",
      answer:
        "Yes! You have full rights to use the photos you generate for personal and commercial purposes, as long as they comply with our usage policy.",
    },
    {
      question: "What images should I upload for the best results?",
      answer:
        "We recommend uploading clear, well-lit images where your face is fully visible. Avoid heavy filters or dark lighting for optimal AI results.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. All uploads and generated images are stored securely and deleted automatically after processing unless you choose to save them.",
    },
    {
      question: "Can I request a refund for my purchase?",
      answer:
        "Refunds can be requested within 7 days if there is a technical issue preventing delivery of your AI images. Please contact our support team.",
    },
    {
      question: "Which image file types can I upload?",
      answer:
        "We currently support JPG, JPEG, and PNG formats up to 10MB per image.",
    },
    {
      question:
        "Is it possible to request manual edits for my headshot photos?",
      answer:
        "Yes, premium users can request one round of manual edits per order directly from their dashboard.",
    },
    {
      question: "Can I request a redo for my headshot order?",
      answer:
        "Yes. If you are unsatisfied, you can request a redo once within 48 hours of delivery.",
    },
  ];

  return (
    <FadeInSection>
      <section
        id="faq"
        className="relative bg-transparent text-foreground py-24"
      >
        {/* Blob Layers */}
        <div className="absolute -top-20 -right-30 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 blur-3xl opacity-30 animate-float-smooth z-[-1]" />
        <div className="absolute -bottom-20 left-0 w-[280px] h-[280px] rounded-full bg-gradient-to-tl from-blue-500 via-purple-500 to-pink-400 blur-3xl opacity-30 animate-float-smooth-slow z-[-1]" />
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 bg-[url('/herobg.jpeg')] opacity-90  pointer-events-none z-[-2]" />
        <div className=" relative max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg  border-b bg-muted/30 px-4"
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
