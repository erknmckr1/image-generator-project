"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FadeInSection from "./motion/FadeInSection";

export default function Hero() {
  return (
    <FadeInSection>
      <section
        id="hero"
        className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted"
      >
        {/* Arka plan deseni (isteğe bağlı) */}
        <div className="absolute inset-0  bg-[url('/herobg.jpeg')] bg-cover bg-center" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Sol taraf */}
          <div className="flex-1 flex flex-col gap-6 px-4 sm:px-0 text-center md:text-left">
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1 rounded-full w-fit mx-auto md:mx-0">
              Boost Your Creativity with ImageAI
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              The Most <span className="text-primary">Photorealistic</span> AI
              Image Generator
            </h1>

            <p className="text-muted-foreground max-w-lg mx-auto md:mx-0">
              Create studio-quality visuals without a photoshoot. Upload your
              photo and let our AI generate professional, customizable images
              within seconds.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                <Link href={"/login"}>Try For Free</Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-3 mt-8 justify-center md:justify-start">
              <Image
                src="/user.webp"
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
              <Image
                src="/user.webp"
                alt="user"
                width={40}
                height={40}
                className="rounded-full -ml-3"
              />
              <p className="text-sm text-muted-foreground">
                <strong>200+</strong> happy creators
              </p>
            </div>
          </div>

          {/* Sağ taraf */}
          <div className="flex-1 mt-16 sm:mt-0 relative flex justify-center items-center">
            {/* Ana görsel */}
            <div className="relative w-[360px] h-[360px] md:w-[460px] md:h-[460px] animate-float-smooth z-30">
              <Image
                src="/image1.jpg"
                alt="AI Artwork"
                fill
                className="object-cover rounded-xl shadow-2xl"
                priority
              />

              {/* Küçük bilgi kutusu */}
              <div className="absolute animate-float-smooth   bottom-0 left-6  backdrop-blur-md shadow-lg rounded-xl p-4  w-[220px] z-40">
                <h3 className="font-semibold  text-sm mb-1">How It Works</h3>
                <p className="text-white/90 text-xs leading-relaxed">
                  Upload your image → Let AI work its magic → Download your
                  studio-quality visuals.
                </p>
              </div>
            </div>

            {/* Renkli parlayan blob */}
            <div className="absolute -bottom-20 -right-10 w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 blur-3xl opacity-40 animate-pulse z-10" />

            {/* Ekstra mini görseller dizisi */}
            <div className=" inset-0 pointer-events-none">
              {/* Üst solda küçük görseller */}
              <div className="absolute -top-30 left-0 sm:-left-20 flex flex-col gap-4 rotate-[-8deg]">
                <div className="relative w-[110px] h-[80px] md:w-[140px] md:h-[100px] rotate-3 animate-float-smooth-slow">
                  <Image
                    src="/image4.jpg"
                    alt="float1"
                    fill
                    className="object-cover rounded-md shadow-xl"
                  />
                </div>
                <div className="relative z-40 w-[110px] h-[80px] md:w-[140px] md:h-[100px] -rotate-6 animate-float-smooth">
                  <Image
                    src="/image3.jpg"
                    alt="float2"
                    fill
                    className="object-cover rounded-md shadow-lg opacity-95"
                  />
                </div>
              </div>

              {/* Sağ üstte hafif büyük görsel */}
              <div className="absolute -top-24 right-0 w-[160px] h-[100px] md:w-[200px] md:h-[130px] rotate-[10deg] animate-float-smooth-slow">
                <Image
                  src="/image2.jpg"
                  alt="float3"
                  fill
                  className="object-cover rounded-lg shadow-2xl opacity-85"
                />
              </div>

              {/* Sağ altta dikey pozisyonlu görseller */}
              <div className="absolute z-50  -bottom-10 -right-5 flex flex-col gap-5 rotate-[6deg]">
                <div className="relative w-[100px] h-[120px] md:w-[130px] md:h-[150px] animate-float-smooth">
                  <Image
                    src="/image2.jpg"
                    alt="float4"
                    fill
                    className="object-cover rounded-xl shadow-lg "
                  />
                </div>
                <div className="relative w-[100px] h-[120px] md:w-[130px] md:h-[150px] animate-float-smooth-slow">
                  <Image
                    src="/image3.jpg"
                    alt="float5"
                    fill
                    className="object-cover rounded-xl shadow-lg "
                  />
                </div>
              </div>

              {/* Alt sol - geniş görsel */}
              <div className="absolute -bottom-20 sm:bottom-0 -left-24 w-[200px] h-[120px] md:w-[260px] md:h-[160px] rotate-[-4deg] animate-float-smooth-slow">
                <Image
                  src="/image4.jpg"
                  alt="float6"
                  fill
                  className="object-cover rounded-xl shadow-2xl opacity-85"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
