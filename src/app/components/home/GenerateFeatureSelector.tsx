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

export const features = [
  {
    id: "resolution",
    name: "Resolution",
    icon: Maximize2,
    description:
      "Enhance and upscale your images to higher resolutions with AI-powered detail reconstruction.",
    gradient: "from-emerald-500 to-teal-600",
    steps: [
      {
        label: "Low Resolution",
        desc: "Original low-quality or small image",
        preview:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      },
      {
        label: "AI Enhancement",
        desc: "Neural network reconstructing details",
        preview:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop",
      },
      {
        label: "High Resolution",
        desc: "Crystal clear enhanced image",
        preview:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    id: "product-placement",
    name: "Product Placement",
    icon: ImageIcon,
    description:
      "Automatically place your product into real-world environments for stunning marketing visuals.",
    gradient: "from-violet-500 to-purple-600",
    steps: [
      {
        label: "Original Image",
        desc: "Upload your product and target environment",
        preview:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      },
      {
        label: "AI Analysis",
        desc: "Advanced lighting, shadow & perspective detection",
        preview:
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
      },
      {
        label: "Final Result",
        desc: "Seamlessly integrated product placement",
        preview:
          "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    id: "linkedin-visual",
    name: "Profile Visual",
    icon: Linkedin,
    description:
      "Create professional LinkedIn visuals optimized for engagement and personal branding.",
    gradient: "from-blue-600 to-indigo-600",
    steps: [
      {
        label: "Content Input",
        desc: "Add your professional photo and message",
        preview:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=600&fit=crop",
      },
      {
        label: "Layout Design",
        desc: "AI optimizes composition for LinkedIn",
        preview:
          "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&h=600&fit=crop",
      },
      {
        label: "Ready to Post",
        desc: "Professional visual ready for engagement",
        preview:
          "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    id: "object-placement",
    name: "Object Placement",
    icon: Box,
    description:
      "Intelligently place and integrate objects into scenes with realistic lighting and shadows.",
    gradient: "from-orange-500 to-red-600",
    steps: [
      {
        label: "Select Object",
        desc: "Choose object to place in scene",
        preview:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
      },
      {
        label: "Scene Analysis",
        desc: "AI analyzes depth and lighting conditions",
        preview:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=600&fit=crop",
      },
      {
        label: "Integrated",
        desc: "Object naturally placed with perfect shadows",
        preview:
          "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    id: "background-remove",
    name: "Background",
    icon: Wand2,
    description:
      "Remove and replace backgrounds with pixel-perfect precision using advanced AI.",
    gradient: "from-cyan-500 to-blue-600",
    steps: [
      {
        label: "Original",
        desc: "Your image with existing background",
        preview:
          "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=600&fit=crop",
      },
      {
        label: "Processing",
        desc: "AI segmentation and edge refinement",
        preview:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&fit=crop",
      },
      {
        label: "Complete",
        desc: "Clean removal or stunning new background",
        preview:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    id: "outfit-generation",
    name: "Outfit Generation",
    icon: Sparkles,
    description:
      "Transform your style with AI-powered virtual clothing and fashion generation.",
    gradient: "from-pink-500 to-rose-600",
    steps: [
      {
        label: "Upload Photo",
        desc: "Start with your original photo",
        preview:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=600&fit=crop",
      },
      {
        label: "Style Selection",
        desc: "AI detects body structure and clothing segments",
        preview:
          "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&h=600&fit=crop",
      },
      {
        label: "New Look",
        desc: "Your new AI-generated outfit applied perfectly",
        preview:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
      },
    ],
  },
];

export default function ModernFeatureShowcase() {
  const [selected, setSelected] = useState(features[0].id);
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentFeature = features.find((f) => f.id === selected);
  const steps = currentFeature?.steps || [];

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
            <h2 className="text-xl font-bold">AI Features</h2>
            <p className="text-xs text-muted-foreground">
              {currentFeature?.name}
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

        {/* Sidebar - Desktop always visible, Mobile overlay */}
        <aside
          className={`
            fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto
            w-full lg:w-80 h-full
            border-r border-border/40 bg-card/95  lg:bg-card/50 backdrop-blur-xl
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
              AI Features
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore our powerful generation tools
            </p>
          </div>

          <div className="space-y-2 overflow-y-scroll scrollbar-hide sm:space-y-3 flex-1 ">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isSelected = selected === feature.id;

              return (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureChange(feature.id)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isSelected
                      ? "bg-primary/10 border-2 border-primary/50 shadow-lg shadow-primary/20"
                      : "bg-muted/30 border-2 border-transparent hover:border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-3 relative z-10">
                    <div
                      className={`p-2 sm:p-2.5 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg shrink-0`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 text-sm">
                        {feature.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {feature.description}
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
              <span>Powered by AI Generator</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6  pb-3 sm:pb-4 ">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                {currentFeature?.name}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl">
                {currentFeature?.description}
              </p>
            </motion.div>
          </div>

          {/* Image Showcase */}
          <div className="flex-1 px-4 sm:px-6  pb-4 sm:pb-6  min-h-0">
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

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Step Info Overlay */}
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
                            Step {currentStep + 1} of {steps.length}
                          </p>
                          <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                            {steps[currentStep]?.label}
                          </h3>
                          <p className="text-white/80 text-xs sm:text-sm">
                            {steps[currentStep]?.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          {/* Step Indicators */}
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

                          {/* Next Button */}
                          <button
                            onClick={handleNextStep}
                            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold bg-gradient-to-r ${currentFeature?.gradient} text-white hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group`}
                          >
                            Next
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
