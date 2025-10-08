export interface FormData {
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

export interface ImageData {
  image_url: string;
}
