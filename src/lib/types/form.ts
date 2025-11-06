export interface FormData {
  // Ortak alanlar
  username?: string;
  prompt?: string;
  image_url?: string;
  aspect_ratio?: string;
  output_format?: string;
  target_resolution?: string;
  safety_tolerance?: string;
  guidance_scale?: number | null;

  // Product placement özel alanlar
  product_image?: string;
  scene?: string;
  product_placement?: string;

  // Outfit özel alanlar
  person_image_url?: string;
  clothing_image_url?: string;
  preserve_pose?: boolean;

  // Ekstra kontrol alanı
  image_category: string;
}

export interface ImageData {
  image_url: string;
}

export const CategoryFieldMap: Record<string, (keyof FormData)[]> = {
  // Genel kategori (varsayılan)
  "object-placement": [
    "username",
    "prompt",
    "image_url",
    "aspect_ratio",
    "output_format",
    "target_resolution",
    "safety_tolerance",
    "guidance_scale",
  ],

  // Çözünürlük artırma
  resolution: ["username", "image_url", "output_format", "target_resolution"],

  // Ürün Yerleştirme
  "product-placement": [
    "username",
    "product_image",
    "prompt",
    "scene",
    "product_placement",
    "output_format",
    "target_resolution",
  ],

  // LinkedIn görseli
  "linkedin-visual": [
    "username",
    "prompt",
    "image_url",
    "aspect_ratio",
    "output_format",
    "target_resolution",
    "safety_tolerance",
    "guidance_scale",
  ],

  // Arka plan çıkarma / değiştirme
  "background-remove": [
    "username",
    "prompt",
    "image_url",
    "aspect_ratio",
    "output_format",
    "target_resolution",
    "guidance_scale",
  ],

  // Kıyafet denemesi (outfit)
  "outfit-generation": [
    "username",
    "person_image_url",
    "clothing_image_url",
    "aspect_ratio",
    "output_format",
    "target_resolution",
    "preserve_pose",
  ],
};

export const CategoryFieldInfoMap: Record<keyof FormData, string> = {
  username:
    "Kullanıcı adını belirtir. API çağrılarında kimlik tanımlaması için kullanılır.",
  prompt:
    "Oluşturulacak veya değiştirilecek görselin tanımını girin. Net ve kısa yazın.",
  image_url: "İşlenecek ana görselin bağlantısı veya yüklenen görsel.",
  aspect_ratio: "Çıktı görselinin oranını belirler (örneğin 1:1, 16:9).",
  output_format:
    "Oluşturulacak görselin dosya formatını seçin (PNG, JPG, WEBP).",
  target_resolution: "Görselin çözünürlüğünü belirler (1080p önerilir).",
  safety_tolerance:
    "Görsel güvenlik filtresinin hassasiyetini belirler (1 = en sıkı).",
  guidance_scale:
    "Modelin prompt’a ne kadar sadık kalacağını belirler (yüksek = daha tutarlı).",
  product_image: "Üzerine ürün yerleştirilecek sahne görselini yükleyin.",
  scene: "Ürünün yerleştirileceği sahnenin kısa tanımı.",
  product_placement: "Ürünün görselde nasıl konumlandırılacağını açıklayın.",
  person_image_url: "Üzerinde kıyafet denenecek kişinin fotoğrafı.",
  clothing_image_url: "Denenecek kıyafetin görseli.",
  preserve_pose: "Aktifse, orijinal pozu koruyarak kıyafet değişimi yapılır.",
  image_category:
    "Kategoriyi belirler (örneğin outfit-generation, background-remove, vb.)",
};

export const CategoryConfigMap = {
  "object-placement": {
    target_resolution: {
      values: ["720p", "1080p", "1440p", "2160p"],
      default: "1080p",
    },
    aspect_ratio: {
      values: ["21:9", "16:9", "4:3", "3:2", "1:1", "2:3", "3:4", "9:16"],
      default: "1:1",
    },
  },

  resolution: {
    target_resolution: {
      values: ["720p", "1080p", "1440p", "2160p"],
      default: "1080p",
    },
    output_format: {
      values: ["png", "jpg", "webp"],
      default: "jpg",
    },
  },

  "product-placement": {
    target_resolution: {
      values: ["720p", "1080p", "1440p", "2160p"],
      default: "1080p",
    },
    aspect_ratio: {
      values: ["16:9", "1:1", "3:2", "4:3", "9:16","16:9"],
      default: "1:1",
    },
  },

  "linkedin-visual": {
    aspect_ratio: {
      values: ["1:1", "4:3", "16:9", "9:16"],
      default: "4:3",
    },
    target_resolution: {
      values: ["720p", "1080p", "1440p"],
      default: "1080p",
    },
  },

  "background-remove": {
    aspect_ratio: {
      values: ["21:9", "16:9", "4:3", "3:2", "1:1", "2:3", "3:4", "9:16"],
      default: "16:9",
    },
    target_resolution: {
      values: ["720p", "1080p", "1440p", "2160p"],
      default: "1080p",
    },
  },

  "outfit-generation": {
    aspect_ratio: {
      values: ["1:1", "4:3", "16:9", "9:16","3:4",],
      default: "1:1",
    },
    target_resolution: {
      values: ["720p", "1080p", "1440p", "2160p"],
      default: "1080p",
    },
  },
};
