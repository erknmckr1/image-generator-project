"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader as Loader2, ImageIcon } from "lucide-react";
import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdvancedSettings from "./AdvancedSettings";
import ImagePreview from "./ImagePreview";
import AddImagesField from "./AddImagesField";
import { FormData, ImageData } from "@/lib/types/form";
export default function ImageEditorForm() {
  const [formData, setFormData] = useState<FormData>({
    prompt: "",
    image_category: "",
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

  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<ImageData | null>({
    image_url: "/file.svg",
  });
  const [error, setError] = useState<string>("");

  //! create ımage function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.prompt.trim()) {
      setError("Please describe the change you want to make");
      return;
    }

    if (!formData.image_url.trim()) {
      setError("Please provide an image URL");
      return;
    }

    setIsLoading(true);
    setGeneratedImages(null);

    try {
      const response = await fetch(
        `https://wouro4lw.rpcld.net/webhook/07f580c3-ece9-4015-bd65-ab257a26ffec`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "https://wouro4lw.rpcld.net/webhook/07f580c3-ece9-4015-bd65-ab257a26ffec",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }
      const data = await response.json();

      setGeneratedImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" max-w-7xl mx-auto pt-10 min-h-screen sm:flex justify-between bg-gradient-to-b from-muted/30 via-background to-muted">
      {/* Left Section - Form */}
      <div className="w-full h-full overflow-auto sm:w-1/2 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-md">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-semibold text-foreground tracking-tight">
              Image Editor
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Transform your images effortlessly with AI. Describe the change
              you want — we’ll handle the rest.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-sm bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="space-y-6">
              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="image_category"
                    className="text-sm font-medium text-slate-900"
                  >
                    Image Type
                  </Label>
                  <Select
                    value={formData.image_category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, image_category: value })
                    }
                  >
                    <SelectTrigger className="mt-2 rounded-lg border-slate-300">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resolution">Resolution</SelectItem>
                      <SelectItem value="product_placement">
                        Product Placement
                      </SelectItem>
                      <SelectItem value="linkedin_visual">
                        LinkedIn Visual
                      </SelectItem>
                      <SelectItem value="object_placement">
                        Object Placement
                      </SelectItem>
                      <SelectItem value="background">Background</SelectItem>
                      <SelectItem value="outfit_generation">
                        Outfit Generation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Prompt */}
              <div>
                <Label
                  htmlFor="prompt"
                  className="text-sm font-medium text-foreground"
                >
                  Describe your change{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g. Change bag to Apple MacBook"
                  value={formData.prompt}
                  onChange={(e) =>
                    setFormData({ ...formData, prompt: e.target.value })
                  }
                  className="mt-2 min-h-[100px] resize-none rounded-xl border-input focus-visible:ring-ring focus-visible:ring-2 transition-all"
                  required
                />
              </div>

              {/* Upload Area */}
              <AddImagesField formData={formData} setFormData={setFormData} />
            </div>

            {/* Advanced Settings */}
            <div className="mt-8">
              <AdvancedSettings formData={formData} setFormData={setFormData} />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 bg-destructive/10 border border-destructive/40 text-destructive px-5 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-8 w-full h-14 text-base font-medium rounded-xl shadow-sm hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Image"
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Section - Empty Preview Area (Future) */}
      <div className="sm:w-1/2  max-h-screen px-4 py-16 relative ">
        {/* Result */}

        <div className=" flex flex-col sm:fixed">
          <ImagePreview images={generatedImages} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
