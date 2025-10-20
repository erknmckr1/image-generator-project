"use client";

import { useState } from "react";
import EditorForm from "./EditorForm";
import { features } from "../home/GenerateFeatureSelector";
import { motion } from "framer-motion";
import ImagePreview from "./ImagePreview";
import { FormData, ImageData } from "@/lib/types/form";
export default function GenerateImageWrapper() {
  const [selectedFeature, setSelectedFeature] = useState(features[0].id);
  const [formData, setFormData] = useState<FormData>({
    prompt: "",
    image_category: selectedFeature,
    image_url: "",
    image_size: "square_hd",
    num_inference_steps: 30,
    guidance_scale: 4,
    num_images: 1,
    enable_safety_checker: true,
    output_format: "png",
    acceleration: "none",
    strength: 0.94,
  });

  const handleFeatureChange = (featureId: string) => {
    setSelectedFeature(featureId);
    setFormData((prev) => ({ ...prev, image_category: featureId }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<ImageData | null>({
    image_url: "/file.svg",
  });

  return (
    <div className=" max-w-7xl mx-auto pt-20 min-h-screen  bg-gradient-to-b from-muted/30 via-background to-muted">
      {/* header */}
      <div className=" w-full justify-between items-center  flex  overflow-scroll scrollbar-hide   ">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isSelected = selectedFeature === feature.id;
          return (
            <button
              key={feature.id}
              onClick={() => handleFeatureChange(feature.id)}
              className={`w-full text-left p-3 sm:p-4 transition-all duration-300 group relative  ${
                isSelected
                  ? "bg-primary/10 border-2 border-primary/50 shadow-lg shadow-primary/20"
                  : "bg-muted/80 border-2 border-transparent hover:border-border hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center  gap-3 relative z-10">
                <div
                  className={`p-2 sm:p-2.5 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg shrink-0`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="font-semibold text-sm">{feature.name}</h3>
              </div>

              {isSelected && (
                <motion.div
                  className="absolute  bg-gradient-to-br from-primary/10 to-transparent"
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
      <div className="w-full sm:flex justify-between">
        {/* Left Section - Form */}
        <div className="w-full h-full overflow-auto sm:w-1/2 flex items-center justify-center px-4 py-16">
          <EditorForm
            formData={formData}
            setGeneratedImages={setGeneratedImages}
            setFormData={setFormData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        {/* Right Section - Empty Preview Area (Future) */}
        <div className="sm:w-1/2  px-4 py-16 relative ">
          <div className=" flex flex-col sm:fixed h-[65vh]">
            <ImagePreview images={generatedImages} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
