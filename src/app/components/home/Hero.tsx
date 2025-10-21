"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FadeInSection from "./motion/FadeInSection";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <FadeInSection>
      <section
        id="hero"
        className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted"
      >
        {/* Arka plan */}
        <div className="absolute inset-0 bg-[url('/herobg.jpeg')] bg-cover bg-center" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Sol taraf */}
          <div className="flex-1 flex flex-col gap-6 px-4 sm:px-0 text-center md:text-left">
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1 rounded-full w-fit mx-auto md:mx-0">
              {t("hero.badge")}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              {t("hero.title_part1")}{" "}
              <span className="text-primary">{t("hero.title_highlight")}</span>{" "}
              {t("hero.title_part2")}
            </h1>

            <p className="text-muted-foreground max-w-lg mx-auto md:mx-0">
              {t("hero.description")}
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                <Link href="/login">{t("hero.cta_primary")}</Link>
              </Button>
              <Button size="lg" variant="outline">
                {t("hero.cta_secondary")}
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
                <strong>200+</strong>{" "}
                {t("hero.users").replace("{count}", "")}
              </p>
            </div>
          </div>

          {/* Sağ taraf */}
          <div className="flex-1 mt-16 sm:mt-0 relative flex justify-center items-center">
            <div className="relative w-[360px] h-[360px] md:w-[460px] md:h-[460px] animate-float-smooth z-30">
              <Image
                src="/image1.jpg"
                alt="AI Artwork"
                fill
                className="object-cover rounded-xl shadow-2xl"
                priority
              />

              <div className="absolute bottom-0 left-6 backdrop-blur-md shadow-lg rounded-xl p-4 w-[220px] z-40 animate-float-smooth">
                <h3 className="font-semibold text-sm mb-1">
                  {t("hero.info_box_title")}
                </h3>
                <p className="text-white/90 text-xs leading-relaxed">
                  {t("hero.info_box_text")}
                </p>
              </div>
            </div>

            {/* Arka plan renk efekti */}
            <div className="absolute -bottom-20 -right-10 w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 blur-3xl opacity-40 animate-pulse z-10" />
            {/* (Diğer küçük görseller aynı kalıyor) */}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
