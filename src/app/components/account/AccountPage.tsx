'use client'
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from '@/lib/hooks/useTranslation';
import {
  CreditCard,
  Calendar,
  Sparkles,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function AccountPage({ name, email, avatar, plan, credits }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-64px)] mt-14 bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8 py-10 space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
            {t("account_page.header.welcome")}, {name}
          </h1>
          <p className="text-sm  text-muted-foreground">
            {t("account_page.header.description")}
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] items-start gap-4">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* TOP CARD */}
            <Card className="border border-border/80 shadow-md space-y-3">
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className='space-y-1'>
                  <CardTitle className="flex gap-x-4 items-center">
                    {t("account_page.your_plan.title")}
                    <Badge variant="outline" className="text-xs font-medium">
                      {plan}
                    </Badge>
                  </CardTitle>

                  <CardDescription>
                    {t("account_page.your_plan.description")}
                  </CardDescription>
                </div>

                <div className="text-sm text-muted-foreground">
                  {t("account_page.your_plan.credits_remaining")}:{" "}
                  <span className="font-semibold text-foreground">
                    {credits?.credits_remaining ?? 0}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="grid gap-6 md:grid-cols-3">

                {/* Plan card */}
                <div className="md:col-span-1 space-y-3">
                  <div className="relative h-32 w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 flex items-center justify-center">
                    <div className="relative z-10 text-primary-foreground text-sm font-medium text-center px-4">
                      {t("account_page.your_plan.plan_card_label")}
                    </div>
                    <div className="pointer-events-none absolute inset-0 opacity-40">
                      <div className="absolute -top-10 -right-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
                      <div className="absolute -bottom-10 left-0 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      {t("account_page.your_plan.features.feature1")}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      {t("account_page.your_plan.features.feature2")}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      {t("account_page.your_plan.features.feature3")}
                    </li>
                  </ul>

                  <Button
                    className="w-full justify-between hover:bg-foreground hover:text-muted"
                    variant="outline"
                    size="sm"
                  >
                    <Link className="text-xs flex gap-x-2" href="/pricing">
                      {plan === "Pro"
                        ? t("account_page.your_plan.button_manage")
                        : t("account_page.your_plan.button_upgrade")}
                    </Link>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Included in plan */}
                <div className="md:col-span-1 space-y-3">
                  <h3 className="font-semibold text-foreground text-sm">
                    {t("account_page.your_plan.included_title")}
                  </h3>

                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2 ">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {t("account_page.your_plan.included_items.item1")}
                    </li>
                    <li className="flex items-center gap-2 ">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {t("account_page.your_plan.included_items.item2")}
                    </li>
                    <li className="flex items-center gap-2 ">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {t("account_page.your_plan.included_items.item3")}
                    </li>
                    <li className="flex items-center gap-2 ">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {t("account_page.your_plan.included_items.item4")}
                    </li>
                  </ul>

                  <div className="flex text-xs justify-between items-center">
                    <p className="font-semibold">
                      {t("account_page.your_plan.coming_soon")}
                    </p>
                    <span className="text-muted-foreground text-xs">
                      {t("account_page.your_plan.coming_soon_label")}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 hover:bg-foreground hover:text-muted"
                  >
                    <Link
                      className="text-xs flex gap-x-2"
                      href="/dashboard/generate-image"
                    >
                      {t("account_page.your_plan.access_tools")}
                    </Link>
                  </Button>
                </div>

                {/* Billing */}
                <div className="md:col-span-1 space-y-3">
                  <h3 className="text-sm font-semibold">
                    {t("account_page.billing.title")}
                  </h3>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>
                        {t("account_page.billing.card_details"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {t("account_page.billing.next_payment")}{" "}
                        <span className="font-medium text-foreground">
                          {t("account_page.billing.next_payment_date")}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <Button
                      className="hover:bg-foreground hover:text-muted text-xs"
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href="/account/billing">
                        {t("account_page.billing.edit_billing")}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs flex gap-x-2 "
                      asChild
                    >
                      <Link href="/account/billing">
                        {t("account_page.billing.billing_history")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECOND CARD */}
            <Card className="border border-border/80 shadow-md space-y-3">
              <CardHeader>
                <CardTitle className="text-sm">
                  {t("account_page.included_account.title")}
                </CardTitle>
                <CardDescription>
                  {t("account_page.included_account.description")}
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4 md:grid-cols-3">
                {/* My Images */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    {t("account_page.account_features.my_images_title")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("account_page.account_features.my_images_desc")}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full hover:bg-foreground hover:text-muted flex justify-between"
                  >
                    <Link
                      className="text-xs flex gap-x-2"
                      href="/dashboard/my-images"
                    >
                      {t("account_page.account_features.go_my_images")}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>

                {/* Credits */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    {t("account_page.account_features.credits_title")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("account_page.account_features.credits_desc")}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full hover:bg-foreground hover:text-muted flex justify-between"
                  >
                    <Link
                      className="text-xs flex gap-x-2"
                      href="/dashboard/my-images"
                    >
                      {t("account_page.account_features.buy_credits")}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <Card className="border border-border/80 shadow-md space-y-3">
            <CardHeader className="flex flex-col justify-between items-center">
              <div className="relative mb-3 h-20 w-20">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Avatar"
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold">
                    {name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>

              <CardTitle className="text-lg font-semibold">{name}</CardTitle>
              <CardDescription>{email}</CardDescription>

              <Badge variant="outline" className="mt-2 text-xs">
                {plan}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">

              {/* Profile */}
              <div className="space-y-1">
                <h3>{t("account_page.sidebar.profile_title")}</h3>
                <p className="text-xs text-muted-foreground">
                  {t("account_page.sidebar.profile_desc")}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 w-full justify-center hover:bg-foreground hover:text-muted"
                  asChild
                >
                  <Link href="/account/profile">
                    {t("account_page.sidebar.edit_profile")}
                  </Link>
                </Button>
              </div>

              <Separator />

              {/* Security */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {t("account_page.sidebar.security")}
                  </span>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start hover:bg-foreground hover:text-muted"
                  asChild
                >
                  <Link href="/account/security">
                    {t("account_page.sidebar.manage_security")}
                  </Link>
                </Button>
              </div>

              <Separator />

              {/* Danger Zone */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  {t("account_page.sidebar.danger_zone")}
                </p>
                <Button
                  size="sm"
                  variant="default"
                  className="w-full justify-center bg-red-600 hover:bg-red-500 cursor-pointer"
                >
                  {t("account_page.sidebar.delete_account")}
                </Button>
              </div>
            </CardContent>

            <CardFooter>
              <p className="text-[11px] text-muted-foreground text-center w-full">
                {t("account_page.footer.help_text")}{" "}
                <Link
                  href="/support"
                  className="underline underline-offset-2"
                >
                  {t("account_page.footer.contact_support")}
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
