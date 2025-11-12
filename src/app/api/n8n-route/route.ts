import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase/server";
export async function POST(request: Request) {
  try {
    const supabase = await createRouteHandlerClient();

    // user ı al
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    //  kullanıcının creditlerini çek
    const { data: credit } = await supabase
      .from("user_credits")
      .select("credits_remaining,credits_total_used")
      .eq("user_id", user.id)
      .single();

    if (credit?.credits_remaining < 1) {
      Response.json({ error: "Not enough credits" }, { status: 403 });
      return;
    }

    const body = await request.json();
    const newData = { ...body, user_id: user.id };
    console.log(newData)
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROD_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_PROD_URL || "",
      },
      body: JSON.stringify(newData),
    });

    //  Krediyi düş
    // await supabase
    //   .from("user_credits")
    //   .update({
    //     credits_remaining: credit?.credits_remaining - 1,
    //     credits_total_used: credit?.credits_total_used + 1,
    //     updated_at: new Date().toISOString(),
    //   })
    //   .eq("user_id", user.id);

    const data = await response.text(); // bazen n8n JSON yerine string döndürür
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
