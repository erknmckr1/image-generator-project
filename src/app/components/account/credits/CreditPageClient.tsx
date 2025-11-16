"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCallback, useRef, useState, useEffect } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function CreditsClientPage({ initialData, summary }) {
  const { t } = useTranslation();

  const [items, setItems] = useState(initialData);
  const [offset, setOffset] = useState(initialData.length);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  const LIMIT = 20;

  const fetchMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/generate_images/history?limit=${LIMIT}&offset=${offset}`,
        {
          cache: "no-store",
        }
      );

      const json = await res.json();

      if (json?.items?.length > 0) {
        setItems((prev) => [...prev, ...json.items]);
        setOffset((prev) => prev + LIMIT);
        setHasMore(json.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  }, [offset, isLoading, hasMore]);

  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [fetchMoreData]);

  return (
    <div className="min-h-[calc(100vh-64px)] mt-14 bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8 py-10 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
            {t("credits_page.header.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("credits_page.header.description")}
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] gap-4 items-start">
          {/* LEFT SECTION */}
          <div className="space-y-6">
            {/* Credit Summary */}
            <Card className="border border-border/80 shadow-md">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="text-base sm:text-lg">
                    {t("credits_page.summary.title")}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {t("credits_page.summary.description")}
                  </CardDescription>
                </div>

                <div className="text-right text-xs sm:text-sm text-muted-foreground">
                  <p>
                    {t("credits_page.summary.remaining")}:{" "}
                    <span className="font-semibold text-foreground">
                      {summary?.credits_remaining ?? 0}
                    </span>
                  </p>
                  <p>
                    {t("credits_page.summary.used")}:{" "}
                    <span className="font-semibold text-foreground">
                      {summary?.credits_total_used ?? 0}
                    </span>
                  </p>
                </div>
              </CardHeader>
            </Card>

            {/* Usage History */}
            <Card className="border border-border/80 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">
                  {t("credits_page.history.title")}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t("credits_page.history.description")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 ">
                {initialData.length > 0 && (
                  <>
                    {/* TABLE HEADER */}
                    <div className="grid grid-cols-[1.2fr_1.2fr_0.7fr_0.7fr_1fr] gap-2 text-[11px] font-medium text-muted-foreground">
                      <span>{t("credits_page.table.id")}</span>
                      <span>{t("credits_page.table.date")}</span>
                      <span>{t("credits_page.table.credits")}</span>
                      <span>{t("credits_page.table.status")}</span>
                      <span>{t("credits_page.table.feature")}</span>
                    </div>

                    <Separator />

                    {/* TABLE ROWS */}
                    <div className="space-y-1 max-h-[300px] overflow-y-auto">
                      {items.map((row) => (
                        <div
                          key={row.id}
                          className="grid grid-cols-[1.2fr_1.2fr_0.7fr_0.7fr_1fr] gap-2 items-center text-[11px] sm:text-xs py-1 hover:bg-muted/50 "
                        >
                          <span>{row.id.slice(0, 8)}...</span>

                          <span>
                            {new Date(row.created_at).toLocaleDateString()}
                          </span>

                          <span className="font-medium">
                            -{row.credits_used}
                          </span>

                          <span
                            className={`capitalize ${
                              row.status === "succeeded"
                                ? "text-emerald-600"
                                : row.status === "running"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {t(`credits_page.status.${row.status}`)}
                          </span>

                          <span className="text-muted-foreground">
                            {row.feature || "-"}
                          </span>
                        </div>
                      ))}

                      {/* loading */}
                      {isLoading && (
                        <div className="flex justify-center py-3">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-foreground" />
                        </div>
                      )}

                      {/* Observer target */}
                      <div ref={observerTarget} className="h-10" />
                    </div>
                  </>
                )}

                {initialData.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t("credits_page.history.empty")}
                  </p>
                )}

                <p className="text-[11px] text-muted-foreground mt-2">
                  {t("credits_page.history.note")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-4">
            {/* Buy Credits */}
            <Card className="border border-border/80 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">
                  {t("credits_page.right_section.buy_credits.title")}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t("credits_page.right_section.buy_credits.description")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs"
                  asChild
                >
                  <Link href="/pricing">
                    {t("credits_page.right_section.buy_credits.button")}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Billing */}
            <Card className="border border-border/80 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">
                  {t("credits_page.right_section.billing.title")}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t("credits_page.right_section.billing.description")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs gap-1"
                  asChild
                >
                  <Link href="/account/billing">
                    {t("credits_page.right_section.billing.button")}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
