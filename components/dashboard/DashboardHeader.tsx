"use client";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, LogOut } from "lucide-react";
import { toast } from "sonner";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUserData } from "@/lib/Logic"; // تأكد أن هذا hook يعمل كما في السابق
import React from "react";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function DashboardHeader() {
  const router = useRouter();
  // Explicitly type userData to avoid 'never' type error
  const { userData, loading, error } = useUserData() as {
    userData: { email?: string; username?: string } | null;
    loading: boolean;
    error: any;
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.message || "حدث خطأ أثناء تسجيل الخروج");
      });
  };

  const getInitials = (email?: string) => {
    if (!email) return "A";
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DailyDone</h1>
              <p className="text-xs text-muted-foreground leading-none">
                Build better habits
              </p>
            </div>
          </div>

          {/* User section */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-sm font-medium">
                  {userData?.username ? getInitials(userData.username) : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">
                {/* عرض البريد مباشرة من userData */}
                {loading && <span>جارٍ تحميل...</span>}
                {!loading && error && (
                  <span className="text-red-500">حدث خطأ</span>
                )}
                {!loading && !error && userData?.email && (
                  <span>{userData.email}</span>
                )}
                {!loading && !error && !userData?.email && (
                  <span>غير مسجل</span>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
