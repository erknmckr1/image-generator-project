import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 via-background to-muted flex items-center justify-center">
      {children}
    </div>
  );
}
