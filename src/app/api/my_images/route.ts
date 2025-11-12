import { createRouteHandlerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createRouteHandlerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Kullanıcının generation id'lerini al
  const { data: generations, error: genError } = await supabase
    .from("generations")
    .select("id")
    .eq("user_id", user.id);

  if (genError) {
    console.error("Supabase genError:", genError.message);
    return NextResponse.json({ error: genError.message }, { status: 500 });
  }

  if (!generations?.length) {
    return NextResponse.json([], { status: 200 });
  }

  const generationIds = generations.map((g) => g.id);

  // id'lere ait final step'leri çek
  const { data, error } = await supabase
    .from("generation_steps")
    .select(`
      output_image_url,
      input_image_url,
      params,
      status,
      model,
      created_at,
      generation_id
    `)
    .in("generation_id", generationIds)
    .eq("is_final", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase stepsError:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(" My Images fetched:", data?.length || 0);
  return NextResponse.json(data || [], { status: 200 });
}
