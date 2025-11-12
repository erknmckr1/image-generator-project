"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { FormData, CategoryFieldMap } from "@/lib/types/form";
import { Textarea } from "@/components/ui/textarea";
import { CategoryConfigMap } from "@/lib/types/form";
import FieldHeader from "./FieldHeader";
import { createClient } from "@/lib/supabase/client";
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
import { useTranslation } from "@/lib/hooks/useTranslation";

type ImageFieldKeys =
  | "image_url"
  | "product_image"
  | "person_image_url"
  | "clothing_image_url";

function EditorForm({ setGeneratedImages, setIsLoading, isLoading }) {
  const { selectedFeature } = useSelector(
    (state: RootState) => state.editorForm
  );
  const visibleFields = CategoryFieldMap[selectedFeature] || [];
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    image_category: selectedFeature || "general",
    prompt: "",
    image_url: "",
    aspect_ratio: "1:1",
    output_format: "jpg",
    target_resolution: "1080p",
    safety_tolerance: "2",
    guidance_scale: 3.5,
    product_image: "",
    scene: "",
    product_placement: "",
    person_image_url: "",
    clothing_image_url: "",
    preserve_pose: true,
  });

  function dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  }

  const isBase64Image = (val: unknown): val is string =>
    typeof val === "string" && val.startsWith("data:image");

  const uploadFields: ImageFieldKeys[] = [
    "image_url",
    "product_image",
    "person_image_url",
    "clothing_image_url",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setGeneratedImages(null);

    try {
      const supabase = createClient();
      const updatedFormData: typeof formData &
        Partial<Record<ImageFieldKeys, string>> = {
        ...formData,
      };

      //  Görsel alanlarını kontrol et ve gerekirse upload + signed URL oluştur
      for (const field of uploadFields) {
        const val = formData[field];
        if (isBase64Image(val)) {
          const file = dataURLtoFile(val, `${field}-${Date.now()}.png`);
          const filePath = `input_img/${Date.now()}-${field}.png`;


          // Supabase'e yükle
          const { data: uploadData, error: uploadError } =
            await supabase.storage.from("imageai").upload(filePath, file);

          if (uploadError) {
            console.error(`❌ Upload error for ${field}:`, uploadError.message);
            continue;
          }

          // Private bucket → Signed URL üret
          const { data: signedData, error: signedError } =
            await supabase.storage
              .from("imageai")
              .createSignedUrl(filePath, 60 * 60 * 24);

          if (signedError) {
            console.error(
              `Signed URL error for ${field}:`,
              signedError.message
            );
            continue;
          }
          updatedFormData[field] = signedData.signedUrl;
        }
      }

      //  n8n API'sine gönder
      const resp = await fetch(`${window.location.origin}/api/n8n-route`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate image");
      }

      //  n8n yanıtını işle
      const data = await resp.json();
      const parsed =
        typeof data.data === "string" ? JSON.parse(data.data) : data.data;

      setGeneratedImages(parsed.image_url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, image_category: selectedFeature }));
  }, [selectedFeature]);

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

  const config = CategoryConfigMap[selectedFeature];
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
                <FieldHeader field="prompt" />
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
            {t("editor_form_advanced_title.title")}
          </h3>

          <p className="text-sm text-muted-foreground mb-4">
            {t("editor_form_advanced_title.subtitle")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Aspect Ratio */}
            {visibleFields.includes("aspect_ratio") && (
              <div className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <FieldHeader field="aspect_ratio" />
                <Select
                  value={
                    formData.aspect_ratio ||
                    config.aspect_ratio?.default ||
                    "1:1"
                  }
                  onValueChange={(v) => handleChange("aspect_ratio", v)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {(config.aspect_ratio?.values || []).map((r: string) => (
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
                <FieldHeader field="output_format" />
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
                <FieldHeader field="safety_tolerance" />
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
                <FieldHeader field="target_resolution" />
                <Select
                  value={
                    formData.target_resolution ||
                    config.target_resolution?.default
                  }
                  onValueChange={(v) => handleChange("target_resolution", v)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    {(config.target_resolution?.values || []).map(
                      (res: string) => (
                        <SelectItem key={res} value={res}>
                          {res}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Guidance Scale */}
            {visibleFields.includes("guidance_scale") && (
              <div className="col-span-full p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <FieldHeader field="guidance_scale" />
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
                <FieldHeader field="preserve_pose" />
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

export default React.memo(EditorForm);
