import React from "react";
import AddImagesField from "./AddImagesField";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AdvancedSettings from "./AdvancedSettings";
import { Loader2 } from "lucide-react";
function EditorForm({
  formData,
  setGeneratedImages,
  setFormData,
  setIsLoading,
  isLoading,
}) {
  const [error, setError] = useState<string>("");
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
    <div className="w-full max-w-2xl">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-sm bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="space-y-6">
          {/* Prompt */}
          <div>
            <Label
              htmlFor="prompt"
              className="text-sm font-medium text-foreground"
            >
              Describe your change <span className="text-destructive">*</span>
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
  );
}

export default EditorForm;
