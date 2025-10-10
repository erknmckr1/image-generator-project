"use client";
import Image from "next/image";
export default function ImageShowcase() {
  return (
    <div className="relative hidden   md:flex justify-center items-center">
      {/* Büyük görsel */}
      <div className="relative z-40 w-[380px] h-[300px] rounded-xl overflow-hidden shadow-xl">
        <img
          src="https://mylamp.com.tr/UserFiles/Fotograflar/org/34900-bingul-dogal-rattan-dekoratif-vazo-24x50-cm-img-3042.jpg"
          alt="Main"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="absolute right-[-100px] top-[-100px] w-[280px] h-[230px] rounded-xl overflow-hidden shadow-xl">
        <img
          src="https://mylamp.com.tr/UserFiles/Fotograflar/org/34900-bingul-dogal-rattan-dekoratif-vazo-24x50-cm-img-3042.jpg"
          alt="Main"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Küçük görsel */}
      <div className="absolute z-50 bottom-[-80px] right-[-80px] w-[220px] h-[180px] rounded-xl overflow-hidden shadow-lg bg-white">
        <img
          src="https://mylamp.com.tr/UserFiles/Fotograflar/org/34900-bingul-dogal-rattan-dekoratif-vazo-24x50-cm-img-3042.jpg"
          alt="Secondary"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
