// app/[locale]/account/credits/page.tsx

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CreditClientPage from "@/app/components/account/credits/CreditPageClient";

export default async function CreditsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: credits } = await supabase
    .from("user_credits")
    .select("credits_remaining, credits_total_used")
    .eq("user_id", user.id)
    .single();
 
  const { data: firstBatch } = await supabase
    .from("generations")
    .select("id, feature, credits_used, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <CreditClientPage
      initialData={firstBatch || []}
      summary={credits}
    />
  );
}
