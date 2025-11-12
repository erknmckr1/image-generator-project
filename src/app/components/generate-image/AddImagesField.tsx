"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormData, CategoryFieldMap } from "@/lib/types/form";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import FieldHeader from "./FieldHeader";
import { useTranslation } from "@/lib/hooks/useTranslation";
interface AddImagesFieldProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function AddImagesField({
  formData,
  setFormData,
}: AddImagesFieldProps) {
  const { selectedFeature } = useSelector(
    (state: RootState) => state.editorForm
  );
  const visibleFields = CategoryFieldMap[selectedFeature] || [];
  const { t } = useTranslation();
  //  Helper to update dynamic image field
  const handleImageChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  // Helper to render upload area
  const renderUploadField = (field: keyof FormData) => {
    const value = formData[field] as string;

    return (
      <div className="space-y-2">
        <FieldHeader field={field} />

        <div
          className={cn(
            "mt-2 rounded-xl border-2 border-dashed border-border bg-muted/40",
            "p-6 text-center transition-all duration-300 hover:border-ring hover:bg-muted/60"
          )}
        >
          {!value ? (
            <>
              <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm text-foreground/90 font-medium mb-1">
                {t("form_editor_add_image.upload_title")}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                {t("form_editor_add_image.upload_subtitle")}
              </p>

              <Input
                id={`file-upload-${field}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  if (!e.target.files?.[0]) return;
                  const file = e.target.files[0];
                  if (file.size > 5 * 1024 * 1024) {
                    alert(t("form_editor_add_image.file_too_large"));
                    return;
                  }

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleImageChange(field, reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
              />

              <Label
                htmlFor={`file-upload-${field}`}
                className={cn(
                  "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium",
                  "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer transition-colors"
                )}
              >
                {t("form_editor_add_image.select_file")}
              </Label>

              <div className="mt-4 text-xs text-muted-foreground">
                {t("form_editor_add_image.or_paste")}
              </div>

              <Input
                type="text"
                placeholder={t("form_editor_add_image.url_placeholder")}
                value={value || ""}
                onChange={(e) => handleImageChange(field, e.target.value)}
                className="mt-2 rounded-lg border-input focus-visible:ring-ring/30 transition-all"
              />
            </>
          ) : (
            <div className="relative group">
              <img
                src={value}
                alt="preview"
                className="w-full max-h-64 object-contain rounded-lg border border-border bg-card"
              />
              <button
                type="button"
                onClick={() => handleImageChange(field, "")}
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
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Dinamik olarak hangi image alanları varsa onları render eder */}
      {visibleFields.includes("image_url") && renderUploadField("image_url")}
      {visibleFields.includes("product_image") &&
        renderUploadField("product_image")}
      {visibleFields.includes("person_image_url") &&
        renderUploadField("person_image_url")}
      {visibleFields.includes("clothing_image_url") &&
        renderUploadField("clothing_image_url")}
    </div>
  );
}
