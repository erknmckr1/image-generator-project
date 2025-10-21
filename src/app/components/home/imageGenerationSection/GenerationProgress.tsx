"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/lib/hooks/useTranslation"; // ✅ import

export default function DemoImageGenerator() {
  const { t } = useTranslation();

  // steps artık JSON’dan geliyor
  const steps = t<string[]>("demo_generator.steps");

  const [visibleImages, setVisibleImages] = useState(Array(7).fill(false));
  const [phase, setPhase] = useState<"before" | "generating" | "after">(
    "before"
  );
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let loopTimeout: NodeJS.Timeout;

    if (phase === "before") {
      const timer = setTimeout(() => setPhase("generating"), 1000);
      return () => clearTimeout(timer);
    }

    if (phase === "generating") {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setPhase("after"), 500);
          return prev;
        });
      }, 1000);
    }

    if (phase === "after") {
      loopTimeout = setTimeout(() => {
        setVisibleImages((prev) => {
          const next = [...prev];
          const nextIndex = prev.findIndex((v) => v === false);
          if (nextIndex !== -1) next[nextIndex] = true;
          if (nextIndex === -1) return Array(7).fill(false);
          return next;
        });
        setPhase("before");
        setCurrentStep(0);
      }, 2000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(loopTimeout);
    };
  }, [phase, steps]);

  return (
    <div className="relative max-w-7xl mx-auto py-16 ">
      <div className="relative z-40 w-full flex flex-col items-center justify-center">
        {/* ✅ Başlık */}
        <h2 className="relative z-40 text-3xl font-bold mb-12 text-center">
          {t("demo_generator.title")}
        </h2>

        <div className="relative z-40 w-[360px] h-[360px] md:w-[560px] md:h-[460px] rounded-xl overflow-hidden shadow-2xl border border-border bg-muted">
          {/* Görsel alanı */}
          <AnimatePresence mode="wait">
            {phase === "before" && (
              <motion.div
                key="before"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src="/image1.jpg"
                  alt="Before"
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}

            {phase === "after" && (
              <motion.div
                key="after"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src="/image2.jpg"
                  alt="After"
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay: sadece generating aşamasında */}
          {phase === "generating" && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col justify-center items-center text-center p-6"
            >
              <div className="flex justify-center mb-4">
                {currentStep < steps.length ? (
                  <Loader2 className="animate-spin text-primary w-6 h-6" />
                ) : (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                )}
              </div>

              {/*  Dinamik başlık */}
              <h2 className="text-base md:text-lg font-semibold mb-3 text-foreground">
                {currentStep < steps.length
                  ? t("demo_generator.loading")
                  : t("demo_generator.done")}
              </h2>

              {/*  Adımlar listesi */}
              <ul className="space-y-2 text-sm w-full max-w-xs text-left">
                {steps.map((step, index) => {
                  const isDone = index < currentStep;
                  const isActive = index === currentStep;
                  return (
                    <motion.li
                      key={index}
                      className={`flex items-center gap-2 ${
                        isDone
                          ? "text-green-600"
                          : isActive
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {isDone ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : isActive ? (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      ) : (
                        <div className="w-3.5 h-3.5 border border-muted rounded-full" />
                      )}
                      {step}
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-5 w-full max-w-xs bg-muted h-1 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  animate={{
                    width: `${(currentStep / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
