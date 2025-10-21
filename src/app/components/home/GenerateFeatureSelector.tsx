"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ImageIcon,
  Wand2,
  ChevronRight,
  Menu,
  X,
  Maximize2,
  Linkedin,
  Box,
} from "lucide-react";
import { useTranslation } from "@/lib/hooks/useTranslation";

// Icon mapping - bu değişmez
const iconMap = {
  resolution: Maximize2,
  "product-placement": ImageIcon,
  "linkedin-visual": Linkedin,
  "object-placement": Box,
  "background-remove": Wand2,
  "outfit-generation": Sparkles,
};

// Gradient mapping - bu da değişmez
const gradientMap = {
  resolution: "from-emerald-500 to-teal-600",
  "product-placement": "from-violet-500 to-purple-600",
  "linkedin-visual": "from-blue-600 to-indigo-600",
  "object-placement": "from-orange-500 to-red-600",
  "background-remove": "from-cyan-500 to-blue-600",
  "outfit-generation": "from-pink-500 to-rose-600",
};

// Preview images - bunlar da değişmez
const previewImages = {
  resolution: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  ],
  "product-placement": [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop",
  ],
  "linkedin-visual": [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop",
  ],
  "object-placement": [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop",
  ],
  "background-remove": [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop",
  ],
  "outfit-generation": [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop",
  ],
  
};

export default function ModernFeatureShowcase() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("resolution");
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dinamik feature (id) listesi oluştur
  const featureIds = Object.keys(iconMap);
  
  // Seçili feature'ın bilgilerini al
  const currentFeatureName = t(`features.${selected}.name`);
  const currentFeatureDesc = t(`features.${selected}.description`);
  
  // Steps sayısını bul (0, 1, 2 olduğunu varsayıyoruz)
  const stepsCount = 3;
  const steps = Array.from({ length: stepsCount }, (_, i) => ({
    label: t(`features.${selected}.steps.${i}.label`),
    desc: t(`features.${selected}.steps.${i}.desc`),
    preview: previewImages[selected as keyof typeof previewImages][i],
  }));

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const handleFeatureChange = (featureId: string) => {
    setSelected(featureId);
    setCurrentStep(0);
    setMobileMenuOpen(false);
  };

  return (
    <div className="h-[95vh] max-w-7xl mx-auto py-16 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border/40 bg-card/50 backdrop-blur-xl">
          <div>
            <h2 className="text-xl font-bold">{t("featuresSection.title")}</h2>
            <p className="text-xs text-muted-foreground">
              {currentFeatureName}
            </p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-muted/50 hover:bg-muted"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
            w-full lg:w-80 h-full
            border-r border-border/40 bg-card/95 lg:bg-card/50 backdrop-blur-xl
            p-4 sm:p-6 flex flex-col
            transition-transform duration-300 lg:transform-none
            ${
              mobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="mb-6 lg:mb-8 hidden lg:block">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {t("featuresSection.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("featuresSection.subtitle")}
            </p>
          </div>

          <div className="space-y-2 overflow-y-scroll scrollbar-hide sm:space-y-3 flex-1">
            {featureIds.map((featureId) => {
              const Icon = iconMap[featureId as keyof typeof iconMap];
              const gradient = gradientMap[featureId as keyof typeof gradientMap];
              const isSelected = selected === featureId;
              const name = t(`features.${featureId}.name`);
              const description = t(`features.${featureId}.description`);

              return (
                <button
                  key={featureId}
                  onClick={() => handleFeatureChange(featureId)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isSelected
                      ? "bg-primary/10 border-2 border-primary/50 shadow-lg shadow-primary/20"
                      : "bg-muted/30 border-2 border-transparent hover:border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-3 relative z-10">
                    <div
                      className={`p-2 sm:p-2.5 rounded-lg bg-gradient-to-br ${gradient} shadow-lg shrink-0`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 text-sm">{name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {description}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeFeature"
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/40">
            <div className="text-xs text-muted-foreground flex items-center justify-between">
              <span>{t("featuresSection.powered")}</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6 pb-3 sm:pb-4">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                {currentFeatureName}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl">
                {currentFeatureDesc}
              </p>
            </motion.div>
          </div>

          {/* Image Showcase */}
          <div className="flex-1 px-4 sm:px-6 pb-4 sm:pb-6 min-h-0">
            <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden border border-border/50 bg-muted/30 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selected}-${currentStep}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={steps[currentStep]?.preview}
                    alt={steps[currentStep]?.label}
                    className="w-full h-full object-cover"
                    fill
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 lg:p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="backdrop-blur-xl bg-black/40 rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/10"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-white/70 text-xs sm:text-sm mb-1">
                            {t("featuresSection.step")
                              .replace("{current}", String(currentStep + 1))
                              .replace("{total}", String(steps.length))}
                          </p>
                          <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                            {steps[currentStep]?.label}
                          </h3>
                          <p className="text-white/80 text-xs sm:text-sm">
                            {steps[currentStep]?.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="flex gap-1.5 sm:gap-2">
                            {steps.map((_, index) => (
                              <motion.div
                                key={index}
                                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                                  currentStep === index
                                    ? "w-6 sm:w-8 bg-white"
                                    : "w-1.5 sm:w-2 bg-white/30"
                                }`}
                                animate={{
                                  scale: currentStep === index ? 1.1 : 1,
                                }}
                              />
                            ))}
                          </div>

                          <button
                            onClick={handleNextStep}
                            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold bg-gradient-to-r ${
                              gradientMap[selected as keyof typeof gradientMap]
                            } text-white hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group`}
                          >
                            {t("featuresSection.next")}
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}