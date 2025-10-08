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
    ],
  },
};

export default nextConfig;
