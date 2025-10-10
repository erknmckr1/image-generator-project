"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ItemType {
  id: string;
  user_id: string;
  user_prompt: string;
  refined_prompt: string;
  original_image_url: string;
  processed_image_url: string;
  resolution: string;
  file_size_kb: number;
  format: string;
  status: string;
  credits_used: number;
  is_favorite: boolean;
  user_note: null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

interface ImageCardProps {
  title: string;
  item: ItemType;
}

// Zoom özellikli görsel komponenti
function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 }); // büyütülmiş resmin x,y kayması
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // zoom penceresinin ekrandaki konumu
  const imageRef = useRef<HTMLDivElement>(null); // Asıl resmin bulunduğu dive referans. Genişlik, yükseklik gibi değerleri buradan alıyoruz.
  const containerRef = useRef<HTMLDivElement>(null); // Dış sarmalayıcı div. Zoom penceresinin sınırlarını bu konteyner belirliyor.
  const zoomLevel = 2.5;
  const imageWidth = imageRef.current?.offsetWidth ?? 0;
const imageHeight = imageRef.current?.offsetHeight ?? 0;

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;

    const rect = imageRef.current.getBoundingClientRect(); // resmin ekrandaki boyutu ve konumu
    const containerRect = containerRef.current.getBoundingClientRect(); // dış kapsayıcı div’in boyutu

    // Mouse'un görsel üzerindeki pozisyonu
    const mouseX = e.clientX - rect.left; 
    const mouseY = e.clientY - rect.top; 

    // Zoom penceresinin boyutları
    const zoomWindowWidth = 200;
    const zoomWindowHeight = 200;

    // Farenin kapsayıcıya göre konumu
    const relativeMouseX = e.clientX - containerRect.left;
    const relativeMouseY = e.clientY - containerRect.top;

    // Zoom penceresini mouse'un yanına yerleştir (küçük offset)
    let zoomWindowX = relativeMouseX + 15;
    let zoomWindowY = relativeMouseY + 15;

    // Container sınırlarını kontrol et
    if (zoomWindowX + zoomWindowWidth > containerRect.width) {
      zoomWindowX = relativeMouseX - zoomWindowWidth - 15;
    }
    if (zoomWindowY + zoomWindowHeight > containerRect.height) {
      zoomWindowY = relativeMouseY - zoomWindowHeight - 15;
    }

    // Negatif değerleri kontrol et
    if (zoomWindowX < 0) {
      zoomWindowX = relativeMouseX + 15;
    }
    if (zoomWindowY < 0) {
      zoomWindowY = relativeMouseY + 15;
    }

    setMousePosition({ x: zoomWindowX, y: zoomWindowY });

    // Zoom görselinin kaydırma pozisyonunu hesapla
    const offsetX = -(mouseX * zoomLevel) + zoomWindowWidth / 2;
    const offsetY = -(mouseY * zoomLevel) + zoomWindowHeight / 2;

    setZoomPosition({ x: offsetX, y: offsetY });
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={imageRef}
        className="relative w-full h-64 rounded-lg overflow-hidden border cursor-crosshair"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>

      {/* Zoom Penceresi */}
      {isZooming && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: "200px",
            height: "200px",
            border: "3px solid #3b82f6",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            background: "white",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `${zoomPosition.x}px`,
              top: `${zoomPosition.y}px`,
              width: `${imageWidth * zoomLevel}px`,
              height: `${imageHeight * zoomLevel}px`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              style={{ position: "absolute" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function ImageCard({ title, item }: ImageCardProps) {
  const [copied, setCopied] = useState(false);
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
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={cn(
            "group relative overflow-hidden cursor-pointer border-border transition-all hover:shadow-lg hover:scale-[1.02]",
            "bg-card text-card-foreground"
          )}
        >
          {/* Status Badge */}

          <Badge
            className="absolute top-2 left-2 z-10 bg-lime-400 text-black font-medium"
            variant="secondary"
          >
            {item.status}
          </Badge>

          {/* Favorite icon */}
          <button className="absolute top-2 right-2 z-10 rounded-full p-1 hover:bg-background/30 transition">
            <Heart
              size={18}
              className={cn("transition   text-muted-foreground")}
            />
          </button>

          {/* Image */}

          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={item.processed_image_url}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <CardContent className="">
            <h3 className="font-medium text-sm truncate">{title}</h3>
          </CardContent>
          <CardFooter>
            <p className="text-xs">{item.user_prompt.slice(0, 30)}...</p>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] h-[90vh] overflow-y-auto">
        {item ? (
          <>
            {/* Header */}
            <DialogHeader className="pb-4">
              <DialogTitle className="text-lg font-semibold">
                Image Details
              </DialogTitle>
            </DialogHeader>

            {/* 1️ Images (Before / After) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground text-center">
                  Original Image
                </p>
                <ZoomableImage
                  src={item.original_image_url}
                  alt="Original Image"
                />
              </div>

              {/* Processed */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground text-center">
                  Processed Image
                </p>
                <ZoomableImage
                  src={item.processed_image_url}
                  alt="Processed Image"
                />
                <div className="p-4 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg border-border hover:bg-muted transition"
                    onClick={() => handleDownload(item.processed_image_url)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>

                  <Button
                    onClick={() => handleCopyUrl(item.processed_image_url)}
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
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border my-6" />

            {/* 2️ Prompt Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  User Prompt
                </h4>
                <div className="p-3 rounded-md bg-muted text-sm leading-relaxed border">
                  {item.user_prompt}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  Refined Prompt
                </h4>
                <div className="p-3 rounded-md bg-muted text-sm leading-relaxed border">
                  {item.refined_prompt}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border my-6" />

            {/* 3️ Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="font-medium capitalize">{item.status}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Credits Used:</span>
                <p className="font-medium">{item.credits_used}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Resolution:</span>
                <p className="font-medium">{item.resolution}</p>
              </div>

              <div>
                <span className="text-muted-foreground">Format:</span>
                <p className="font-medium uppercase">{item.format}</p>
              </div>

              <div>
                <span className="text-muted-foreground">File Size:</span>
                <p className="font-medium">
                  {(item.file_size_kb / 1024).toFixed(2)} MB
                </p>
              </div>

              <div>
                <span className="text-muted-foreground">User Note:</span>
                <p className="font-medium">{item.user_note || "—"}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border my-6" />

            {/* 4️ Date Information */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Created: {new Date(item.created_at).toLocaleString()}</p>
              <p>Updated: {new Date(item.updated_at).toLocaleString()}</p>
              {item.deleted_at && (
                <p className="text-red-400">
                  Deleted: {new Date(item.deleted_at).toLocaleString()}
                </p>
              )}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">Loading...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
