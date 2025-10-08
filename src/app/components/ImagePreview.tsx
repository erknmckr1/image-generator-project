"use client";

import { Download, Copy, Check, Loader2, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageData } from "@/lib/types/form";
interface ImagePreviewProps {
  images: ImageData;
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

  // 🔹 Fake Progress Simülasyonu
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
      }, 6000); // her 1 saniyede ilerle
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

  return (
    <div className="flex flex-col items-center  w-full h-screen  bg-gradient-to-b from-muted/30 via-background to-muted overflow-auto">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-md">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h1 className="text-4xl font-semibold text-foreground tracking-tight">
            Image Editor
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Transform your images effortlessly with AI. Describe the change you
            want — we’ll handle the rest.
          </p>
        </div>

        {isLoading ? (
          // 🔹 Çok aşamalı vertical progress görünümü
          <div className="bg-card/70 border border-border rounded-2xl shadow-sm p-8 backdrop-blur-sm text-center">
            <div className="flex justify-center mb-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>

            <p className="text-foreground text-lg font-medium mb-6">
              Generating your image...
            </p>
            {/* multi step progress */}
            <div className="space-y-6 text-left">
              {steps.map((step, index) => {
                const isDone = index < currentStep;
                const isActive = index === currentStep;

                // 🔹 Aktif step’in progress yüzdesi
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

                    {/* 🔹 Step progress bar */}
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
          // 🔹 Görsel ekranı
          <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-square bg-muted flex items-center justify-center">
              <Image
                src={images.image_url}
                alt="Generated"
                width={512}
                height={512}
                className="object-contain h-[500px] rounded-2xl transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            <div className="p-4 flex gap-3">
              <Button
                onClick={() => handleDownload(images.image_url)}
                variant="outline"
                size="sm"
                className="flex-1 rounded-lg border-border hover:bg-muted transition"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>

              <Button
                onClick={() => handleCopyUrl(images.image_url)}
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
          // 🔹 Boş state
          <div className="text-center text-muted-foreground mt-8 text-sm">
            No image generated yet.
            <br />
            Start by entering a prompt on the left.
          </div>
        )}
      </div>
    </div>
  );
}
