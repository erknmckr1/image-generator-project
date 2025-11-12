// Tekil görsel parametre objesi (params[0].image)
export interface ImageMeta {
  content_type: string;
  file_name: string;
  file_size: number | null;
  height: number;
  width: number;
  url: string;
}

// params dizisindeki her bir eleman
export interface StepParams {
  seed: number;
  image: ImageMeta;
}

// generations tablosundaki params alanı
export interface GenerationParams {
  user_prompt?: string;
  refined_prompt?: string;
  input_image_url: string;
  output_format: string;
  target_resolution: string;
  aspect_ratio?: string;
  guidance_scale?: number;
  safety_tolerance?: string;
  image_category?: string;
}

// generations tablosu join edilmiş haliyle
export interface Generation {
  id: string;
  user_id: string;
  params: GenerationParams;
}

// Ana step objesi (Supabase’ten dönen)
export interface GenerationStep {
  id: string;
  model: string;
  output_image_url: string;
  created_at: string;
  params: StepParams[];
  generations: Generation;
}
