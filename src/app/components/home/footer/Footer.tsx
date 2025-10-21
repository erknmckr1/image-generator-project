"use client";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeInSection from "../motion/FadeInSection";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <FadeInSection>
      <footer className="bg-[#0F0B27] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Üst Kısım */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-10 border-b border-white/10">
            {/* Logo ve açıklama */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/image3.jpg"
                  alt="Vega Logo"
                  width={60}
                  height={60}
                  className="animate-float-smooth rounded-full"
                />
                <div className="flex items-center space-x-2 animate-float-smooth">
                  <div className="bg-white text-black font-bold text-lg px-2 py-1 rounded-md">
                    V
                  </div>
                  <span className="font-semibold text-lg text-white">EGA</span>
                </div>
              </div>
              <p className="text-muted-foreground">
                {t("footer.description")}
              </p>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                {t("footer.explore.title")}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/">{t("footer.explore.links.home")}</Link>
                </li>
                <li>{t("footer.explore.links.about")}</li>
                <li>{t("footer.explore.links.features")}</li>
                <li>{t("footer.explore.links.pricing")}</li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                {t("footer.services.title")}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t("footer.services.items.automation")}</li>
                <li>{t("footer.services.items.scheduling")}</li>
                <li>{t("footer.services.items.communication")}</li>
                <li>{t("footer.services.items.data")}</li>
                <li>{t("footer.services.items.support")}</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                {t("footer.resources.title")}
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t("footer.resources.items.blog")}</li>
                <li>{t("footer.resources.items.cases")}</li>
                <li>{t("footer.resources.items.integrations")}</li>
                <li>{t("footer.resources.items.developers")}</li>
                <li>{t("footer.resources.items.sitemap")}</li>
              </ul>
            </div>
          </div>

          {/* Alt Kısım */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-muted-foreground gap-4">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Linkedin size={18} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram size={18} />
              </a>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-center md:text-right">
              <div className="flex items-center justify-center gap-2">
                <Phone size={16} />
                <span>{t("footer.contact.phone")}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail size={16} />
                <span>{t("footer.contact.email")}</span>
              </div>
            </div>
          </div>

          {/* En Alt Satır */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 mt-6 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>{t("footer.bottom.rights")}</span>
              <span>|</span>
              <span>{t("footer.bottom.design")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{t("footer.bottom.terms")}</span>
              <span>|</span>
              <span>{t("footer.bottom.privacy")}</span>
            </div>
          </div>
        </div>
      </footer>
    </FadeInSection>
  );
}
