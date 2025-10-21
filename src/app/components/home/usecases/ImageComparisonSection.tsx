"use client";
import React from "react";
import ImageComparisonSlider from "./ImageComparison";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FadeInSection from "../motion/FadeInSection";
import Link from "next/link";
import { useTranslation } from "@/lib/hooks/useTranslation";

function ImageComparisonSection() {
  const { t } = useTranslation();

  return (
    <FadeInSection>
      <section id="usecases" className="w-full h-full sm:py-16 pt-16">
        <div className="w-full max-w-7xl mx-auto h-full gap-6 space-y-10 flex flex-col md:flex-row items-center sm:justify-between">
          {/* Left side (text area) */}
          <div className="md:w-[55%] w-full flex items-center">
            <div className="flex-1 gap-y-10 flex flex-col px-4 text-center md:text-left">
              <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1 rounded-full w-fit mx-auto md:mx-0">
                {t("usecases.badge")}
              </span>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                {t("usecases.title_part1")}{" "}
                <span className="text-primary">
                  {t("usecases.title_highlight")}
                </span>{" "}
                {t("usecases.title_part2")}
              </h1>

              <p className="text-muted-foreground max-w-lg mx-auto md:mx-0">
                {t("usecases.description")}
              </p>

              <div className="flex gap-4 justify-center md:justify-start">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:opacity-90"
                >
                  <Link href="/login">{t("usecases.cta_primary")}</Link>
                </Button>
                <Button size="lg" variant="outline">
                  {t("usecases.cta_secondary")}
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
                  {t("usecases.users").replace("{count}", "")}
                </p>
              </div>
            </div>
          </div>

          {/* Right side (comparison slider) */}
          <div className="md:w-[45%] w-full">
            <ImageComparisonSlider />
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

export default ImageComparisonSection;
