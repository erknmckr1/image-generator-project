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
    .select("id, feature, credits_used, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (genError) {
    console.error("Supabase genError:", genError.message);
    return NextResponse.json({ error: genError.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      items: generations || [],
      offset,
      limit,
      hasMore: generations && generations.length === limit, // devam var mı kontrolü
    },
    { status: 200 }
  );
}
