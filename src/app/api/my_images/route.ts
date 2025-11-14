import { createRouteHandlerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await createRouteHandlerClient();

  // ---- Pagination params ----
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? 10);
  const offset = Number(searchParams.get("offset") ?? 0);

  // Auth
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

  // ---- Final steps (paged) ----
  const { data, error } = await supabase
    .from("generation_steps")
    .select(
      `
       id,
    model,
    output_image_url,
    created_at,
    params,
    generations!inner (
      id,
      user_id,
      params,
      feature
    )
    `
    )
    .in("generation_id", generationIds)
    .eq("is_final", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Supabase stepsError:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      items: data || [],
      offset,
      limit,
      hasMore: data && data.length === limit, // devam var mı kontrolü
    },
    { status: 200 }
  );
}
