"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/landing/heroSection";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { CTASection } from "@/components/landing/cta";
import { useRouter } from "next/navigation";
export default function Home() {
  const route = useRouter();
  return (
    <>
      <Header />
      <HeroSection
        onGetStarted={function (): void {
          route.push("/login");
        }}
      />
      <CTASection
        onGetStarted={function (): void {
          route.push("/login");
        }}
      />
      <Footer />
    </>
  );
}
