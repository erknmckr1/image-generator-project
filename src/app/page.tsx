import Hero from "./components/home/Hero";
import PricingSection from "./components/home/PricingSection";
import ImageComparisonSection from "./components/home/ImageComparisonSection";
import Footer from "./components/home/footer/Footer";
import FAQSection from "./components/home/FAQSection";
import DemoImageGenerator from "./components/home/imageGenerationSection/GenerationProgress";
import GenerateFeatureSelector from "./components/home/GenerateFeatureSelector";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <ImageComparisonSection />
      <GenerateFeatureSelector/>
      <DemoImageGenerator/>
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
