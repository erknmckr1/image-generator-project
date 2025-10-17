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
import React from "react";
import FadeInSection from "../motion/FadeInSection";

export default function Footer() {
  return (
    <FadeInSection>
      <footer className="bg-[#0F0B27] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Üst Kısım */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-10 border-b border-white/10">
            {/* Logo ve açıklama col-span-2 2 grid yer kaplıyor  */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/image3.jpg"
                  alt="Tolkio Logo"
                  width={60}
                  height={60}
                  className="animate-float-smooth rounded-full"
                />
                <div className="flex  items-center space-x-2 animate-float-smooth">
                  <div className="bg-white text-black font-bold text-lg px-2 py-1 rounded-md">
                    V
                  </div>
                  <span className="font-semibold text-lg text-white">EGA</span>
                </div>
              </div>
              <p className="text-muted-foreground">
                Your Intelligent AI Virtual Assistant
              </p>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Explore</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                <li>About Us</li>
                <li>Features</li>
                <li>Pricing</li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Task Automation</li>
                <li>Intelligent Scheduling</li>
                <li>Communication Assistance</li>
                <li>Data Organization</li>
                <li>Personalized Support</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Blog</li>
                <li>Case Studies</li>
                <li>Integrations</li>
                <li>Developers</li>
                <li>Sitemap</li>
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
                <span>(+90) 505 005 0505</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail size={16} />
                <span>hi@vega.com</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 mt-6 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© 2025 Vega</span>
              <span>|</span>
              <span>Design by Vega</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Terms of Use</span>
              <span>|</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </FadeInSection>
  );
}
