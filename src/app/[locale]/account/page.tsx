import { createClient } from "@/lib/supabase/server";
import AccountPage from "@/app/components/account/AccountPage";

type UserCredits = {
  credits_remaining: number;
  credits_total_used: number;
  last_refill_at: string | null;
};

export default async function page() {
  const supabase = await createClient();

  // 1 - Aktif session bilgisi
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // User yoksa redirect
  if (!user) {
    return <div>Not authenticated</div>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      `
    id,
    full_name,
    email,
    avatar_url,
    user_credits (
      credits_remaining,
      credits_total_used,
      last_refill_at
    ),
    user_subscriptions (
      subscription_plan,
      subscription_status,
      credits_refill_date
    )
  `
    )
    .eq("id", user.id)
    .single();

  const name = profile?.full_name || "User";
  const email = profile?.email || "example@mail.com";
  const avatar = profile?.avatar_url || null;

  // ❗ Supabase join type'ı array olarak geldiği için önce unknown'a cast etmeliyiz
  const credits = profile?.user_credits as unknown as UserCredits;

  // Çok kaba bir plan göstergesi (şimdilik placeholder)
  const plan =
    credits.credits_remaining && credits.credits_remaining > 0 ? "Pro" : "Free";
  return (
    <>
      <AccountPage name={name} email={email} avatar={avatar} plan={plan} credits={credits} />
    </>
  );
}
