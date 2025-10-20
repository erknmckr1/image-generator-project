const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucgenyayincilik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "v3.fal.media",
      },
      {
        protocol: "https",
        hostname: "v3b.fal.media",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "mylamp.com.tr",
      },
      {
        protocol: "https",
        hostname: "rptmfkedvzdlmsctnijq.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
