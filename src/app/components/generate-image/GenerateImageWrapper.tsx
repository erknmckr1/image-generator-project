"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditorForm from "./EditorForm";
import { setSelectedFeature } from "@/lib/redux/slices/editorForm.slice";
import {
  Sparkles,
  ImageIcon,
  Wand2,
  Maximize2,
  Linkedin,
  Box,
} from "lucide-react";
import { motion } from "framer-motion";
import ImagePreview from "./ImagePreview";
import { FormData, ImageData } from "@/lib/types/form";
import { ChevronDown } from "lucide-react";
import { RootState } from "@/lib/redux/store";
import { useTranslation } from "@/lib/hooks/useTranslation";

const featureMeta = {
  resolution: { icon: Maximize2, gradient: "from-emerald-500 to-teal-600" },
  "product-placement": {
    icon: ImageIcon,
    gradient: "from-violet-500 to-purple-600",
  },
  "linkedin-visual": {
    icon: Linkedin,
    gradient: "from-blue-600 to-indigo-600",
  },
  "object-placement": { icon: Box, gradient: "from-orange-500 to-red-600" },
  "background-remove": { icon: Wand2, gradient: "from-cyan-500 to-blue-600" },
  "outfit-generation": {
    icon: Sparkles,
    gradient: "from-pink-500 to-rose-600",
  },
} as const;

export default function GenerateImageWrapper() {
  const { t } = useTranslation();
  const { selectedFeature } = useSelector(
    (state: RootState) => state.editorForm
  );
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<ImageData | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    image_category: selectedFeature || "general",
    username: "",
    prompt: "",
    image_url: "",
    aspect_ratio: "1:1",
    output_format: "jpg",
    target_resolution: "1080p",
    safety_tolerance: "2",
    guidance_scale: 3.5,
    product_image: "",
    scene: "",
    product_placement: "",
    person_image_url: "",
    clothing_image_url: "",
    preserve_pose: true,
  });
  const features = t("features") as Record<
    string,
    {
      name: string;
      description: string;
      steps: Record<string, object>;
    }
  >;

  const handleFeatureChange = (featureId: string) => {
    dispatch(setSelectedFeature(featureId));
    setFormData((prev) => ({ ...prev, image_category: featureId }));
    setIsDropdownOpen(false);
  };

  const currentFeature = features[selectedFeature];
  const currentMeta = featureMeta[selectedFeature as keyof typeof featureMeta];
  console.log(currentMeta);
  const featuresArray = Object.entries(features).map(([id, data]) => ({
    id,
    name: data.name,
    description: data.description,
    steps: data.steps,
    ...featureMeta[id as keyof typeof featureMeta],
  }));
  return (
    <div className="max-w-7xl mx-auto sm:flex w-full pt-16 min-h-screen bg-gradient-to-b from-muted/30 via-background to-muted">
      {/* Header - Category Selector */}
      <div className=" bg-gradient-to-b from-muted/30 via-background to-muted/10">
        {/* Mobile: Dropdown Selector */}
        <div className="block sm:hidden px-4 pt-4 pb-3">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-card border-2 border-border hover:border-primary/50 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-lg bg-gradient-to-br ${currentMeta?.gradient} shadow-lg`}
                >
                  {currentMeta?.icon && (
                    <currentMeta.icon className="w-5 h-5 text-white" />
                  )}
                </div>
                <span className="font-semibold text-sm">
                  {currentFeature?.name}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-border rounded-xl shadow-xl z-50 overflow-hidden"
              >
                {featuresArray.map((feature) => {
                  const FeatureIcon = feature.icon;
                  const isSelected = selectedFeature === feature.id;

                  return (
                    <button
                      key={feature.id}
                      onClick={() => handleFeatureChange(feature.id)}
                      className={`w-full flex items-center gap-3 p-4 transition-all ${
                        isSelected
                          ? "bg-primary/10 border-l-4 border-primary"
                          : "hover:bg-muted/50 border-l-4 border-transparent"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg`}
                      >
                        <FeatureIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">
                        {feature.name}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:flex fixed backdrop-blur-xl  left-0  z-50 ">
          <div className="flex flex-col gap-4 px-6 py-5">
            {featuresArray.map((feature) => {
              const FeatureIcon = feature.icon;
              const isSelected = selectedFeature === feature.id;

              return (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureChange(feature.id)}
                  className={`relative p-5 rounded-xl transition-all duration-300 ${
                    isSelected
                      ? "bg-primary/10 border-2 border-primary/50 shadow-lg shadow-primary/20 scale-105"
                      : "bg-card border-2 border-border hover:border-primary/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2.5">
                    <div
                      className={`p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                    >
                      <FeatureIcon className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-center leading-tight">
                      {feature.name}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeFeature"
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl -z-10"
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
        </div>

        {/* Tablet: Horizontal Scroll */}
        <div className="hidden sm:flex lg:hidden gap-3 px-4 py-4 overflow-x-auto scrollbar-hide">
          {featuresArray.map((feature) => {
            const FeatureIcon = feature.icon;
            const isSelected = selectedFeature === feature.id;

            return (
              <button
                key={feature.id}
                onClick={() => handleFeatureChange(feature.id)}
                className={`relative flex-shrink-0 p-4 rounded-xl transition-all duration-300 min-w-[140px] ${
                  isSelected
                    ? "bg-primary/10 border-2 border-primary/50 shadow-lg shadow-primary/20"
                    : "bg-card border-2 border-border hover:border-primary/30 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg`}
                  >
                    <FeatureIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-sm whitespace-nowrap">
                    {feature.name}
                  </span>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeFeatureTablet"
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full h-auto sm:flex  justify-between">
        {/* Left Section - Form */}
        <div className="w-full h-full overflow-auto sm:w-1/2 flex items-center justify-center px-4 sm:py-16">
          <EditorForm
            formData={formData}
            setGeneratedImages={setGeneratedImages}
            setFormData={setFormData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>

        {/* Right Section - Preview Area */}
        {
          <div className="sm:w-1/2 h-full px-4 py-16 relative">
            <ImagePreview images={generatedImages} isLoading={isLoading} />
          </div>
        }
      </div>
    </div>
  );
}
