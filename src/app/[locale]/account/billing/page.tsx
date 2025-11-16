"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Calendar,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/hooks/useTranslation";

const MOCK_INVOICES = [
  {
    id: "inv_001",
    date: "2025-06-28",
    amount: 39,
    currency: "USD",
    status: "paid",
  },
  {
    id: "inv_002",
    date: "2025-05-28",
    amount: 39,
    currency: "USD",
    status: "paid",
  },
  {
    id: "inv_003",
    date: "2025-04-28",
    amount: 39,
    currency: "USD",
    status: "paid",
  },
  {
    id: "inv_004",
    date: "2025-04-28",
    amount: 39,
    currency: "USD",
    status: "paid",
  },
  {
    id: "inv_005",
    date: "2025-04-28",
    amount: 39,
    currency: "USD",
    status: "paid",
  },
  {
    id: "inv_006",
    date: "2025-04-28",
    amount: 39,
    currency: "USD",
    status: "paid",
  },
  {
    id: "inv_007",
    date: "2025-04-28",
    amount: 39,
    currency: "USD",
    status: "paid",
  },
  {
    id: "inv_008",
    date: "2025-04-28",
    amount: 39,
    currency: "USD",
    status: "paid",
  },
  {
    id: "inv_009",
    date: "2025-04-28",
    amount: 39,
    currency: "USD",
    status: "paid",
  },
];

function BillingPage() {
  const { t } = useTranslation();

  const plan = "Pro";
  const nextPaymentDate = "Jun 28, 2025";
  const last4 = "6731";

  return (
    <div className="min-h-[calc(100vh-64px)] mt-14 bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8 py-10 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
            {t("billing_page.header.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("billing_page.header.description")}
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] gap-4 items-start">
          {/* LEFT SECTION */}
          <div className="space-y-6">
            {/* Current Plan */}
            <Card className="border border-border/80 shadow-md">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                    {t("billing_page.plan.title")}
                    <Badge variant="outline" className="text-xs">
                      {t("billing_page.plan.badge", { plan })}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {t("billing_page.plan.description")}
                  </CardDescription>
                </div>

                <div className="text-right text-xs sm:text-sm text-muted-foreground">
                  <p>
                    {t("billing_page.plan.price", {
                      price: 39,
                      currency: "USD",
                    })}
                  </p>
                  <p>{t("billing_page.plan.interval_monthly")}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Next payment */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {t("billing_page.plan.next_payment")}{" "}
                      <span className="font-medium text-foreground">
                        {t("billing_page.plan.next_payment_date", {
                          date: nextPaymentDate,
                        })}
                      </span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs"
                    >
                      <Link href="/pricing">
                        {t("billing_page.plan.change_plan")}
                      </Link>
                    </Button>

                    <Button variant="outline" size="sm" className="text-xs">
                      {t("billing_page.plan.cancel_plan")}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Plan features */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">
                    {t("billing_page.plan.included_title")}
                  </p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {t("billing_page.plan.included_items.item1")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {t("billing_page.plan.included_items.item2")}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {t("billing_page.plan.included_items.item3")}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Invoice History */}
            <Card className="border border-border/80 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">
                  {t("billing_page.invoices.title")}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t("billing_page.invoices.description")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 ">
                {MOCK_INVOICES.length > 0 && (
                  <>
                    <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] gap-2 text-[11px] font-medium text-muted-foreground">
                      <span>{t("billing_page.invoices.table.date")}</span>
                      <span>{t("billing_page.invoices.table.amount")}</span>
                      <span>{t("billing_page.invoices.table.status")}</span>
                      <span className="text-right">
                        {t("billing_page.invoices.table.actions")}
                      </span>
                    </div>

                    <Separator />

                    <div className="space-y-1 max-h-[200px] overflow-y-auto">
                      {MOCK_INVOICES.map((invoice) => (
                        <div
                          key={invoice.id}
                          className="grid grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] gap-2 items-center text-[11px] sm:text-xs"
                        >
                          <span>{invoice.date}</span>
                          <span>
                            {invoice.amount} {invoice.currency}
                          </span>

                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            {t("billing_page.invoices.status_paid")}
                          </span>

                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <FileText className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {MOCK_INVOICES.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t("billing_page.invoices.empty")}
                  </p>
                )}

                <p className="text-[11px] text-muted-foreground mt-2">
                  {t("billing_page.invoices.note_placeholder")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-4">
            {/* Payment Method */}
            <Card className="border border-border/80 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">
                  {t("billing_page.payment.title")}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t("billing_page.payment.description")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>
                      {t("billing_page.payment.card_details", { last4 })}
                    </span>
                  </div>

                  <Badge variant="outline" className="text-[10px]">
                    {t("billing_page.payment.primary")}
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs"
                >
                  {t("billing_page.payment.update_card")}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-[11px] gap-1"
                >
                  {t("billing_page.payment.add_method")}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingPage;
