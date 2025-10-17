"use client";

import React, { useState, useRef } from "react";
import { Camera, Sparkles, RotateCcw } from "lucide-react";
import Image from "next/image";
export default function ImageComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // slider ın yüzdesek pozisyonunu tutacak state
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<null | string>(
    "Professional"
  );
  const containerRef = useRef<HTMLDivElement | null>(null); // useRef'i dom elemanına dogrudan erişmek için kullandık.
  const handleMove = (e) => {
    if (!isDragging && e.type !== "click") return; // Yanlızca tıklama ve sürükleme yapılınca çalışacak fonksiyon
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect(); // container ölçüzü alınır getBoundingClientRect() → top, left, width, height
    const x =
      (e.type.includes("mouse") ? e.clientX : e.touches[0].clientX) - rect.left; // Mouse'un container e göre olan konumunu alıyoruz. X eksenınde
    console.log(e.clientX, rect.left);
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // sürükleme sürecini baskatıp bitirecek fonksiyonlar...
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const images = [
    {
      id: 1,
      style: "Professional",
      before: "/image1.jpg",
      after: "/image2.jpg",
    },
    {
      id: 2,
      style: "Casual",
      before: "/image3.jpg",
      after: "/image4.jpg",
    },
    {
      id: 3,
      style: "Vintage",
      before: "/image1.jpg",
      after: "/image2.jpg",
    },
    {
      id: 4,
      style: "Modern",
      before: "/image1.jpg",
      after: "/image2.jpg",
    },
    {
      id: 5,
      style: "Creative",
      before: "/image1.jpg",
      after: "/image2.jpg",
    },
    {
      id: 6,
      style: "Artistic",
      before: "/image1.jpg",
      after: "/image2.jpg",
    },
  ];

  const avatars = [
    { id: 1, style: "Professional", gradient: "from-chart-1 to-chart-1/70" },
    { id: 2, style: "Casual", gradient: "from-chart-2 to-chart-2/70" },
    { id: 3, style: "Vintage", gradient: "from-chart-3 to-chart-3/70" },
    { id: 4, style: "Modern", gradient: "from-chart-4 to-chart-4/70" },
    { id: 5, style: "Creative", gradient: "from-chart-5 to-chart-5/70" },
    { id: 6, style: "Artistic", gradient: "from-primary to-accent" },
  ];

  const selectedImage = images.find((item) => item.style === selectedAvatar);

  return (
    <div className="  flex items-center justify-center sm:justify-end ">
      <div className="flex flex-col justify-center items-center ">
        {/* Main Comparison Container */}
        <div
          ref={containerRef}
          className=" h-[500px] sm:w-[400px] w-[380px]  relative bg-card rounded-xl shadow-2xl overflow-hidden cursor-col-resize select-none border border-border"
          onMouseMove={handleMove} // hareketi algıla
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleMove} // hareketi algıla
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onClick={handleMove}
        >
          {/* Before Image (Left) */}
          <div
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            className="absolute inset-0 bg-muted"
          >
            <div className="absolute inset-0">
              {selectedImage?.before ? (
                <Image
                  src={selectedImage.before}
                  alt="Before"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-accent/10 flex items-center justify-center">
                  <Camera className="w-32 h-32 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Before Badge */}
            <div className="absolute top-6 left-6 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-border">
              <Camera className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-card-foreground text-sm">
                Before
              </span>
            </div>
          </div>

          {/* AI Generated Image (Right) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-chart-5/10"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            <div className="absolute inset-0">
              {selectedImage?.after ? (
                <Image
                  src={selectedImage.after}
                  alt="After"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/5 to-chart-1/10 flex items-center justify-center">
                  <Sparkles className="w-32 h-32 text-primary/20" />
                </div>
              )}
            </div>

            {/* AI Generated Badge */}
            <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">AI Generated</span>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-border shadow-2xl"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-card rounded-full p-3 shadow-2xl ring-4 ring-primary/20 border border-border">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <div className="w-0.5 h-6 bg-border"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Style Options */}
        <div className="flex items-center justify-between  p-2">
          <div className="flex gap-1  scrollbar-hide">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.style)}
                className={`bg-gradient-to-br ${
                  avatar.gradient
                } w-8 h-8 rounded-full flex-shrink-0 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200 flex items-center justify-center relative ${
                  selectedAvatar === avatar.style
                    ? "ring-4 ring-primary"
                    : "ring-2 ring-border"
                }`}
              >
                <span className="text-xs font-bold text-white drop-shadow-lg">
                  {avatar.id}
                </span>
                {selectedAvatar === avatar.style && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSliderPosition(50);
              setSelectedAvatar("Professional");
            }}
            className="ml-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground p-3 rounded-full shadow-lg transition-colors flex-shrink-0 border border-border"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Info Text */}
        <div className="text-center space-y-2 px-4">
          <p className="text-foreground font-medium">
            Slide to compare the photos
          </p>
          <p className="text-muted-foreground text-sm">
            Select one of the avatars above to try different AI styles
          </p>
        </div>
      </div>
    </div>
  );
}
