'use client'
import React, { useEffect } from "react";
import { setCredit } from "../redux/slices/credit.slice";
import { User } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";
import { useDispatch } from "react-redux";
function CreditProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const supabase = createClient();
  useEffect(() => {
    if (!user) return;

    async function fetchCredit() {
      const { data, error } = await supabase
        .from("user_credits")
        .select("credits_remaining, credits_total_used")
        .eq("user_id", user?.id)
        .single();

      if (error) {
        console.error("Credit fetch error:", error.message);
        return;
      }

      if (data) {
        dispatch(
          setCredit({
            credits_remaining: data.credits_remaining,
            credit_total_used: data.credits_total_used,
          })
        );
      }
    }
    fetchCredit();
  }, [user, dispatch, supabase]);
  return <>{children}</>;
}

export default CreditProvider;
