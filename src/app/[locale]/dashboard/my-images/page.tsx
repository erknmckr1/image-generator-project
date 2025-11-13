import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ImagesInfinite from "@/app/components/my-images-pages/ImagesInfinite";
export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto pt-20">
      <ImagesInfinite />
    </div>
  );
}
