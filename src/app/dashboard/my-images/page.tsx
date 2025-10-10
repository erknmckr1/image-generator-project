import React from "react";
import { ImageCard } from "@/app/components/my-images-pages/ImagesCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("generated_images")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto pt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-3">
        {data.map((item, index) => (
          <div key={index}>
            <ImageCard title={String(index + 1)} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
