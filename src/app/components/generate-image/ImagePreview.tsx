"use client";

import { Download, Copy, Check, Loader2, Sparkles, Wand2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageData } from "@/lib/types/form";

interface ImagePreviewProps {
  images: ImageData | null;
  isLoading: boolean;
}

export default function ImagePreview({ images, isLoading }: ImagePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Initializing engine...",
    "Loading AI model...",
    "Processing input prompt...",
    "Generating image...",
    "Finalizing output...",
  ];

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setCurrentStep(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 20;
          clearInterval(interval);
          return 100;
        });
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }, 6000);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setCurrentStep(steps.length - 1);
    }
  }, [isLoading, steps.length]);

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `generated-image.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to download image:", err);
    }
  };

  console.log(images)

  return (
    <div className="flex flex-col items-center h-full  w-full bg-gradient-to-b from-muted/30 via-background to-muted overflow-auto">
      <div className="w-full max-w-lg">
        {isLoading ? (
          <div className="bg-card/70  border border-border rounded-2xl shadow-sm p-8 backdrop-blur-sm text-center">
            <div className="flex justify-center mb-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>

            <p className="text-foreground text-lg font-medium mb-6">
              Generating your image...
            </p>
            
            <div className="space-y-6 text-left">
              {steps.map((step, index) => {
                const isDone = index < currentStep;
                const isActive = index === currentStep;
                const progressValue = isActive
                  ? Math.min((progress / 20) % 100, 100)
                  : isDone
                  ? 100
                  : 0;

                return (
                  <div key={index}>
                    <div
                      className={`flex items-center gap-3 text-sm font-medium mb-1 ${
                        isDone
                          ? "text-green-600 dark:text-green-400"
                          : isActive
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {isDone ? (
                        <Check className="h-4 w-4" />
                      ) : isActive ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                      )}
                      <span>{step}</span>
                    </div>

                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isDone
                            ? "bg-green-500"
                            : isActive
                            ? "bg-primary"
                            : "bg-muted-foreground/20"
                        }`}
                        style={{
                          width: `${
                            isDone ? 100 : isActive ? progressValue : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : images ? (
          <div className="bg-card  rounded-2xl border border-border shadow-md overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-square bg-muted flex items-center justify-center">
              <Image
                src={images[0].image_url}
                alt="Generated"
                width={512}
                height={512}
                className="object-contain h-[450px] rounded-2xl transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            <div className="p-4 flex gap-3">
              <Button
                onClick={() => handleDownload(images[0].image_url)}
                variant="outline"
                size="sm"
                className="flex-1 rounded-lg border-border hover:bg-muted transition"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>

              <Button
                onClick={() => handleCopyUrl(images[0].image_url)}
                variant="outline"
                size="sm"
                className="flex-1 rounded-lg border-border hover:bg-muted transition"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy URL
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          //  Modern Empty State
          <div className=" h-full ">
            {/* Main Content */}
            <div className=" h-full bg-card/80 backdrop-blur-xl border-2 border-dashed border-border rounded-2xl sm:p-28 text-center">
              {/* Animated Icons */}
              <div className="flex justify-center w-full gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl blur-lg opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-violet-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="relative mt-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl blur-lg opacity-50 animate-pulse delay-150" />
                  <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-2xl shadow-lg">
                    <Wand2 className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl blur-lg opacity-50 animate-pulse delay-300" />
                  <div className="relative bg-gradient-to-br from-pink-500 to-rose-600 p-4 rounded-2xl shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text ">
                Your Canvas Awaits
              </h3>
              
              <p className="text-muted-foreground text-base mb-6 max-w-md mx-auto leading-relaxed">
                Fill out the form on the left to bring your creative vision to life. 
                <span className="block mt-2 text-sm">
                  ✨ AI-powered • 🎨 High quality • ⚡ Lightning fast
                </span>
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                  Multiple Formats
                </span>
                <span className="px-4 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
                  High Resolution
                </span>
                <span className="px-4 py-2 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium border border-pink-500/20">
                  Smart AI
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}