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
const features = [
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
export default function GenerateImageWrapper() {
  const { selectedFeature } = useSelector(
    (state: RootState) => state.editorForm
  );
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    image_category: selectedFeature || "general",
    username: "",
    prompt: "",
    image_url: "",
    aspect_ratio: "",
    output_format: "jpg",
    target_resolution: "1080p",
    safety_tolerance: "",
    guidance_scale: null,
    product_image: "",
    scene: "",
    product_placement: "",
    person_image_url: "",
    clothing_image_url: "",
    preserve_pose: true,
  });

  const handleFeatureChange = (featureId: string) => {
    dispatch(setSelectedFeature(featureId));
    setFormData((prev) => ({ ...prev, image_category: featureId }));
    setIsDropdownOpen(false);
  };

  const currentFeature = features.find((f) => f.id === selectedFeature);
  const Icon = currentFeature?.icon;

  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<ImageData | null>(
    null
  );

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
                  className={`p-2.5 rounded-lg bg-gradient-to-br ${currentFeature?.gradient} shadow-lg`}
                >
                  {Icon && <Icon className="w-5 h-5 text-white" />}
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
                {features.map((feature) => {
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
            {features.map((feature) => {
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
          {features.map((feature) => {
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
