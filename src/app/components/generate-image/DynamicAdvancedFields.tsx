"use client";
import { useState } from "react";
import { FormData, CategoryFieldMap } from "@/lib/types/form";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown } from "lucide-react";

interface Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function DynamicAdvancedFields({ formData, setFormData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedFeature } = useSelector((state: RootState) => state.editorForm);
  const visibleFields = CategoryFieldMap[selectedFeature] || [];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-foreground">Advanced Parameters</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Adjust parameters based on your selected category.
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="bg-card border border-border rounded-2xl shadow-sm p-8 mt-4 space-y-6">

          {/* Aspect Ratio */}
          {visibleFields.includes("aspect_ratio") && (
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Aspect Ratio</Label>
              <Select
                value={formData.aspect_ratio || "1:1"}
                onValueChange={(value) => setFormData({ ...formData, aspect_ratio: value })}
              >
                <SelectTrigger className="rounded-lg border border-input focus:ring-ring focus:ring-2">
                  <SelectValue placeholder="Select ratio" />
                </SelectTrigger>
                <SelectContent>
                  {["21:9","16:9","4:3","3:2","1:1","2:3","3:4","9:16","9:21"].map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Output Format */}
          {visibleFields.includes("output_format") && (
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Output Format</Label>
              <Select
                value={formData.output_format || "jpg"}
                onValueChange={(v) => setFormData({ ...formData, output_format: v })}
              >
                <SelectTrigger className="rounded-lg border border-input focus:ring-ring focus:ring-2">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {["png","jpg","webp"].map((fmt) => (
                    <SelectItem key={fmt} value={fmt}>{fmt.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Target Resolution */}
          {visibleFields.includes("target_resolution") && (
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Target Resolution</Label>
              <Select
                value={formData.target_resolution || "1080p"}
                onValueChange={(v) => setFormData({ ...formData, target_resolution: v })}
              >
                <SelectTrigger className="rounded-lg border border-input focus:ring-ring focus:ring-2">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  {["720p","1080p","1440p","2160p"].map((res) => (
                    <SelectItem key={res} value={res}>{res}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Guidance Scale */}
          {visibleFields.includes("guidance_scale") && (
            <div>
              <Label className="text-sm font-medium text-foreground">Guidance Scale: {formData.guidance_scale}</Label>
              <Slider
                value={[formData.guidance_scale || 3.5]}
                onValueChange={(v) => setFormData({ ...formData, guidance_scale: v[0] })}
                min={1}
                max={20}
                step={0.5}
                className="mt-3"
              />
            </div>
          )}

          {/* Safety Tolerance */}
          {visibleFields.includes("safety_tolerance") && (
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Safety Tolerance</Label>
              <Select
                value={formData.safety_tolerance || "2"}
                onValueChange={(v) => setFormData({ ...formData, safety_tolerance: v })}
              >
                <SelectTrigger className="rounded-lg border border-input focus:ring-ring focus:ring-2">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6].map((lvl) => (
                    <SelectItem key={lvl} value={String(lvl)}>{lvl}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Outfit only fields */}
          {selectedFeature === "outfit-generation" && (
            <>
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Preserve Pose</Label>
                <Switch
                  checked={formData.preserve_pose}
                  onCheckedChange={(checked) => setFormData({ ...formData, preserve_pose: checked })}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Pose Type</Label>
                <Select
                  value={formData.pose_type || "standing"}
                  onValueChange={(v) => setFormData({ ...formData, pose_type: v })}
                >
                  <SelectTrigger className="rounded-lg border border-input focus:ring-ring focus:ring-2">
                    <SelectValue placeholder="Select pose type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["standing","sitting","walking","profile"].map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Negative Prompt (optional for all) */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Negative Prompt</Label>
            <Textarea
              placeholder="Describe what to avoid..."
              value={formData.negative_prompt || ""}
              onChange={(e) => setFormData({ ...formData, negative_prompt: e.target.value })}
              className="rounded-lg border border-input focus:ring-ring focus:ring-2"
            />
          </div>

        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
