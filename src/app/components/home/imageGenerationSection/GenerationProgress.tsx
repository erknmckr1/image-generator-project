"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
const steps = [
  "Initializing engine...",
  "Loading AI model...",
  "Processing input prompt...",
  "Generating image...",
  "Finalizing output...",
];

export default function DemoImageGenerator() {
  const [visibleImages, setVisibleImages] = useState(Array(7).fill(false));
  console.log(visibleImages);
  const floatImages = [
    {
      src: "/image1.jpg",
      style:
        "absolute md:top-40 top-10 md:left-50 flex flex-col gap-4 rotate-[-8deg]",
    },
    {
      src: "/image1.jpg",
      style:
        "absolute md:top-0 top-10 md:left-30 flex flex-col gap-4 rotate-[-8deg]",
    },
    {
      src: "/image1.jpg",
      style:
        "absolute top-20 right-30 md:w-[260px] md:h-[250px] rotate-[10deg]",
    },
    {
      src: "/image1.jpg",
      style: "absolute bottom-0 right-60 w-[130px] h-[150px] rotate-[6deg]",
    },
    {
      src: "/image1.jpg",
      style: "absolute bottom-30 right-20 w-[130px] h-[150px] rotate-[6deg]",
    },
    {
      src: "/image1.jpg",
      style: "absolute bottom-0 left-40 w-[260px] h-[160px] rotate-[-4deg]",
    },
    {
      src: "/image1.jpg",
      style: "absolute top-0 left-1/2 w-[220px] h-[150px] rotate-[3deg]",
    },
  ];

  const [phase, setPhase] = useState<"before" | "generating" | "after">(
    "before"
  );
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let loopTimeout: NodeJS.Timeout;

    if (phase === "before") {
      // 3 saniye sonra generate başlasın
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
          const nextIndex = prev.findIndex((v) => v === false); // sıradaki görünmeyen
          if (nextIndex !== -1) next[nextIndex] = true; // sıradakini göster
          if (nextIndex === -1) {
            return Array(7).fill(false); // tekrar başa dön
          }

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
  }, [phase, floatImages]);

  return (
    <div className="relative max-w-7xl mx-auto py-16 ">
      <div className="relative z-40 w-full flex flex-col items-center justify-center">
        <h2 className=" relative z-40 text-3xl font-bold mb-12 text-center">
          Watch AI Work Its Magic ✨
        </h2>
        <div className="relative z-40 w-[360px] h-[360px] md:w-[560px] md:h-[460px] rounded-xl overflow-hidden shadow-2xl border border-border bg-muted">
          {/* Fotoğraf alanı */}
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
              {/* Yüklenme başlığı */}
              <div className="flex justify-center mb-4">
                {currentStep < steps.length ? (
                  <Loader2 className="animate-spin text-primary w-6 h-6" />
                ) : (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                )}
              </div>

              <h2 className="text-base md:text-lg font-semibold mb-3 text-foreground">
                {currentStep < steps.length
                  ? "Generating your image..."
                  : "Done! Your AI image is ready"}
              </h2>

              {/* Adımlar listesi */}
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

              {/* Progress bar */}
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
        {/* Renkli parlayan blob */}
        <div className="absolute -bottom-20 -right-10 w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 blur-3xl opacity-40 animate-pulse z-10" />

        {floatImages.map((img, i) => (
          <div
            key={i}
            className={`${img.style} transition-opacity duration-700 ${
              visibleImages[i] ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative z-0 w-[140px] h-[100px] md:w-[160px] md:h-[120px]">
              <Image
                src={img.src}
                alt={`float-${i}`}
                fill
                className="object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
