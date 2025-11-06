"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { FormData, CategoryFieldMap } from "@/lib/types/form";
import { Textarea } from "@/components/ui/textarea";
import FieldHeader from "./FieldHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import AddImagesField from "./AddImagesField";

export default function EditorForm({
  formData,
  setFormData,
  setGeneratedImages,
  setIsLoading,
  isLoading,
}) {
  const { selectedFeature } = useSelector(
    (state: RootState) => state.editorForm
  );
  const visibleFields = CategoryFieldMap[selectedFeature] || [];
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // if (!formData.prompt?.trim()) {
    //   setError("Please describe the change you want to make.");
    //   return;
    // }

    setIsLoading(true);
    setGeneratedImages(null);

    try {
      const response = await fetch(
        `https://wouro4lw.rpcld.net/webhook/07f580c3-ece9-4015-bd65-ab257a26ffec`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Helper for dynamic value binding
  const handleChange = (
    field: keyof FormData,
    value: string | boolean | number
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  // image field
  const imageField = [
    "image_url",
    "product_image",
    "person_image_url",
    "clothing_image_url",
  ].find((f) => visibleFields.includes(f as keyof FormData));

  return (
    <div className="w-full h-full max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-sm bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
      >
        {/*  Dynamic Common Fields */}
        <div className="space-y-6 mb-8">
          {visibleFields.includes("prompt") && (
            <div>
              <div className="flex items-center justify-between w-full">
                <FieldHeader field="prompt" label="Prompt" />
              </div>

              <Textarea
                placeholder="e.g. Change background to beach"
                value={formData.prompt || ""}
                onChange={(e) => handleChange("prompt", e.target.value)}
                className="mt-2 min-h-[100px] resize-none"
                required
              />
            </div>
          )}
        </div>
        {/* Dynamic image upload section */}
        {imageField && (
          <div className="">
            <AddImagesField formData={formData} setFormData={setFormData} />
          </div>
        )}

        {/* Advanced Parameters Section */}
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Advanced Parameters
          </h3>

          <p className="text-sm text-muted-foreground mb-4">
            Fine-tune your generation with these advanced settings.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Aspect Ratio */}
            {visibleFields.includes("aspect_ratio") && (
              <div className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <FieldHeader field="aspect_ratio" label="Aspect Ratio" />
                <Select
                  value={formData.aspect_ratio || "1:1"}
                  onValueChange={(v) => handleChange("aspect_ratio", v)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "21:9",
                      "16:9",
                      "4:3",
                      "3:2",
                      "1:1",
                      "2:3",
                      "3:4",
                      "9:16",
                    ].map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Output Format */}
            {visibleFields.includes("output_format") && (
              <div className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <FieldHeader field="output_format" label="Output Format" />
                <Select
                  value={formData.output_format || "jpg"}
                  onValueChange={(v) => handleChange("output_format", v)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {["png", "jpg", "webp"].map((fmt) => (
                      <SelectItem key={fmt} value={fmt}>
                        {fmt.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Safety Tolerance */}
            {visibleFields.includes("safety_tolerance") && (
              <div className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <FieldHeader
                  field="safety_tolerance"
                  label="Safety Tolerance"
                />
                <Select
                  value={formData.safety_tolerance || "2"}
                  onValueChange={(v) => handleChange("safety_tolerance", v)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((lvl) => (
                      <SelectItem key={lvl} value={String(lvl)}>
                        {lvl}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Target Resolution */}
            {visibleFields.includes("target_resolution") && (
              <div className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <FieldHeader
                  field="target_resolution"
                  label="Target Resolution"
                />
                <Select
                  value={formData.target_resolution || "1080p"}
                  onValueChange={(v) => handleChange("target_resolution", v)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    {["720p", "1080p", "1440p", "2160p"].map((res) => (
                      <SelectItem key={res} value={res}>
                        {res}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Guidance Scale */}
            {visibleFields.includes("guidance_scale") && (
              <div className="col-span-full p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <FieldHeader field="guidance_scale" label="Guidance Scale" />
                <Slider
                  value={[formData.guidance_scale || 3.5]}
                  onValueChange={(v) => handleChange("guidance_scale", v[0])}
                  min={1}
                  max={20}
                  step={0.5}
                  className="mt-3"
                />
              </div>
            )}
            {/* Outfit-specific: Preserve Pose */}
            {visibleFields.includes("preserve_pose") && (
              <div className="flex-col items-center justify-between p-5  rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <FieldHeader field="preserve_pose" label="Preserve Pose" />
                <Switch
                  className="mt-4"
                  checked={formData.preserve_pose}
                  onCheckedChange={(checked) =>
                    handleChange("preserve_pose", checked)
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
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
  );
}
