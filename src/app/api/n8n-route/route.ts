import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(request.body)
    const response = await fetch(
      `${process.env.N8N_PROD_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": process.env.N8N_KEY || "",
        },
        body: JSON.stringify(body),
      }
    );

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
