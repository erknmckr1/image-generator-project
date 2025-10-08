"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddImagesFieldProps {
  formData: { image_url: string };
  setFormData: (value: any) => void;
}

export default function AddImagesField({ formData, setFormData }: AddImagesFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="image_url" className="text-sm font-medium text-foreground">
        Upload Image or Paste URL <span className="text-destructive">*</span>
      </Label>

      {/* Upload Area */}
      <div
        className={cn(
          "mt-2 rounded-xl border-2 border-dashed border-border bg-muted/40",
          "p-6 text-center transition-all duration-300 hover:border-ring hover:bg-muted/60"
        )}
      >
        {!formData.image_url ? (
          <>
            <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm text-foreground/90 font-medium mb-1">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              JPG, PNG, WEBP – max 5MB
            </p>

            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                const file = e.target.files[0];

                if (file.size > 5 * 1024 * 1024) {
                  alert("File too large (max 5MB)");
                  return;
                }

                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData({
                    ...formData,
                    image_url: reader.result as string,
                  });
                };
                reader.readAsDataURL(file);
              }}
            />

            <Label
              htmlFor="file-upload"
              className={cn(
                "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "cursor-pointer transition-colors"
              )}
            >
              Select File
            </Label>

            <div className="mt-4 text-xs text-muted-foreground">
              or paste image URL below
            </div>

            <Input
              type="text"
              placeholder="Paste image link here"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              className="mt-2 rounded-lg border-input focus-visible:ring-ring/30 transition-all"
            />
          </>
        ) : (
          <div className="relative group">
            <img
              src={formData.image_url}
              alt="preview"
              className="w-full max-h-64 object-contain rounded-lg border border-border bg-card"
            />
            <button
              type="button"
              onClick={() => setFormData({ ...formData, image_url: "" })}
              className={cn(
                "absolute top-2 right-2 rounded-full p-2 bg-background/80 text-muted-foreground",
                "shadow-sm hover:bg-background hover:text-destructive transition-all"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
