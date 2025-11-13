"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ImageCard } from "@/app/components/my-images-pages/ImagesCard";
import { GenerationStep } from "@/lib/types/my.images.type";
import { LucideClockFading } from "lucide-react";

export default function ImagesInfinite() {
  const [items, setItems] = useState<GenerationStep[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Observer için ref
  const observerTarget = useRef<HTMLDivElement>(null);

  const LIMIT = 10;

  const fetchImages = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/my_images?limit=${LIMIT}&offset=${offset}`, {
        cache: "no-store",
      });

      const json = await res.json();

      if (json?.items?.length > 0) {
        setItems((prev) => [...prev, ...json.items]);
        setOffset((prev) => prev + LIMIT);
        setHasMore(json.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  }, [offset, isLoading, hasMore]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchImages();
        }
      },
      { threshold: 0.1 } // %10 görünür olduğunda tetikle
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchImages, hasMore, isLoading]);

  // İlk yükleme
  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      fetchImages();
    }
  }, []);

  const fixedData = items?.map((step) => ({
    ...step,
    generations: Array.isArray(step.generations)
      ? step.generations[0]
      : step.generations,
  }));

  return (
    <div className="w-full px-4 lg:px-0">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {fixedData.map((item, index) => (
          <div key={`${item.id}-${index}`}>
            <ImageCard title={String(index + 1)} item={item} />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <LucideClockFading size={40} className="animate-spin text-gray-400" />
        </div>
      )}

      {/* Observer target - Scroll sonuna yaklaşınca tetiklenir */}
      <div ref={observerTarget} className="h-20" />

      {/* Son mesaj */}
      {!hasMore && items.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          Tüm görseller yüklendi
        </div>
      )}

      {/* Boş durum */}
      {!isLoading && items.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Henüz görsel bulunmuyor
        </div>
      )}
    </div>
  );
}