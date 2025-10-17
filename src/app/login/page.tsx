"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageShowcase from "../components/login/ImageShowcase";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient(); // Client component içinde oluştur

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        },
      });

      if (error) {
        console.error("Login error:", error.message);
        alert("Giriş hatası: " + error.message);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:scale-110 md:flex-row bg-transparent items-center justify-center gap-8 p-6">
      <Card className="md:w-[400px] shadow-2xl border border-border/40 bg-card/90 backdrop-blur-xl rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-foreground">
            <Link href={"/"}>Log in / Sign up</Link>
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Please sign in to continue.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-red-500 hover:bg-red-400"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? "Yükleniyor..." : "Continue with Google"}
          </Button>

          <div className="relative py-2 text-center text-muted-foreground">
            <span className="bg-card px-2 text-sm">or</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border"></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="example@mybiz.com" />
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
            Send code to email
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By signing up, you accept our{" "}
            <a href="#" className="underline underline-offset-2">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>

      <ImageShowcase />
    </div>
  );
}