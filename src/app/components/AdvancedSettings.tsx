"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FormData {
  prompt: string;
  image_url: string;
  image_size: string;
  num_inference_steps: number;
  seed?: number;
  guidance_scale: number;
  num_images: number;
  enable_safety_checker: boolean;
  output_format: string;
  negative_prompt?: string;
  acceleration: string;
  strength: number;
}

interface AdvancedSettingsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function AdvancedSettings({
  formData,
  setFormData,
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-lg font-medium text-slate-900">
                Advanced Settings
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Fine-tune generation parameters
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-slate-500 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="image_size" className="text-sm font-medium text-slate-900">
                Image Size
              </Label>
              <Select
                value={formData.image_size}
                onValueChange={(value) =>
                  setFormData({ ...formData, image_size: value })
                }
              >
                <SelectTrigger className="mt-2 rounded-lg border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square_hd">Square HD</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="portrait_4_3">Portrait 4:3</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="num_inference_steps" className="text-sm font-medium text-slate-900">
                Inference Steps
              </Label>
              <Input
                id="num_inference_steps"
                type="number"
                value={formData.num_inference_steps}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    num_inference_steps: parseInt(e.target.value) || 30,
                  })
                }
                className="mt-2 rounded-lg border-slate-300"
                min="1"
                max="100"
              />
            </div>

            <div>
              <Label htmlFor="seed" className="text-sm font-medium text-slate-900">
                Seed
              </Label>
              <Input
                id="seed"
                type="number"
                placeholder="Optional"
                value={formData.seed || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seed: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="mt-2 rounded-lg border-slate-300"
              />
            </div>

            <div>
              <Label htmlFor="num_images" className="text-sm font-medium text-slate-900">
                Number of Images
              </Label>
              <Input
                id="num_images"
                type="number"
                value={formData.num_images}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    num_images: parseInt(e.target.value) || 1,
                  })
                }
                className="mt-2 rounded-lg border-slate-300"
                min="1"
                max="4"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-900">
              Guidance Scale: {formData.guidance_scale.toFixed(1)}
            </Label>
            <Slider
              value={[formData.guidance_scale]}
              onValueChange={(value) =>
                setFormData({ ...formData, guidance_scale: value[0] })
              }
              min={0}
              max={10}
              step={0.1}
              className="mt-3"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-900">
              Strength: {formData.strength.toFixed(2)}
            </Label>
            <Slider
              value={[formData.strength]}
              onValueChange={(value) =>
                setFormData({ ...formData, strength: value[0] })
              }
              min={0}
              max={1}
              step={0.01}
              className="mt-3"
            />
          </div>

          <div>
            <Label htmlFor="acceleration" className="text-sm font-medium text-slate-900">
              Acceleration
            </Label>
            <Select
              value={formData.acceleration}
              onValueChange={(value) =>
                setFormData({ ...formData, acceleration: value })
              }
            >
              <SelectTrigger className="mt-2 rounded-lg border-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-900 mb-3 block">
              Output Format
            </Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="output_format"
                  value="png"
                  checked={formData.output_format === "png"}
                  onChange={(e) =>
                    setFormData({ ...formData, output_format: e.target.value })
                  }
                  className="w-4 h-4 text-slate-900 focus:ring-slate-400"
                />
                <span className="text-sm text-slate-700">PNG</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="output_format"
                  value="jpeg"
                  checked={formData.output_format === "jpeg"}
                  onChange={(e) =>
                    setFormData({ ...formData, output_format: e.target.value })
                  }
                  className="w-4 h-4 text-slate-900 focus:ring-slate-400"
                />
                <span className="text-sm text-slate-700">JPEG</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="safety_checker" className="text-sm font-medium text-slate-900">
                Enable Safety Checker
              </Label>
              <p className="text-xs text-slate-500 mt-1">
                Filters inappropriate content
              </p>
            </div>
            <Switch
              id="safety_checker"
              checked={formData.enable_safety_checker}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, enable_safety_checker: checked })
              }
            />
          </div>

          <div>
            <Label htmlFor="negative_prompt" className="text-sm font-medium text-slate-900">
              Negative Prompt
            </Label>
            <Textarea
              id="negative_prompt"
              placeholder="Describe what to avoid (optional)"
              value={formData.negative_prompt || ""}
              onChange={(e) =>
                setFormData({ ...formData, negative_prompt: e.target.value })
              }
              className="mt-2 min-h-[80px] resize-none rounded-lg border-slate-300"
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
