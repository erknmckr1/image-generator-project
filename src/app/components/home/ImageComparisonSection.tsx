import React from "react";
import ImageComparisonSlider from "./ImageComparison";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FadeInSection from "./motion/FadeInSection";
import Link from "next/link";
function ImageComparisonSection() {
  return (
    <FadeInSection>
      <section id="usecases" className="w-full  h-full sm:py-16 pt-16">
        <div className="w-full max-w-7xl mx-auto h-full  gap-6 space-y-10 flex flex-col md:flex-row items-center sm:justify-between">
          {/* right area */}
          <div className="md:w-[55%] w-full flex items-center">
            <div className="flex-1 gap-y-10 flex flex-col px-4 text-center md:text-left">
              <span className="text-sm font-medium text-primary bg-primary/10 px-4  py-1 rounded-full w-fit mx-auto md:mx-0">
                One Platform. Endless AI Image Possibilities.
              </span>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                Create <span className="text-primary">Any Visual</span> —
                Powered by AI
              </h1>

              <p className="text-muted-foreground max-w-lg mx-auto md:mx-0">
                Enhance resolution, redesign backgrounds, place products, or
                create professional visuals for LinkedIn — all in one
                intelligent workspace. Explore the full potential of AI-powered
                image creation.
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
          </div>
          <div className="md:w-[45%] w-full">
            <ImageComparisonSlider />
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

export default ImageComparisonSection;
