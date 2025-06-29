"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, TrendingUp, Flame } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "Today's Progress",
      value: "75%", // مثال لقيمة ثابتة
      description: "3 habits completed", // مثال نصي ثابت
      icon: Target,
      variant: "default", // مثال: لأن 75 بين 50 و 100
    },
    {
      title: "Weekly Average",
      value: "60%",
      description: "12 completions this week",
      icon: TrendingUp,
      variant: "default",
    },
    {
      title: "Current Streak",
      value: "5",
      description: "days",
      icon: Flame,
      variant: "default",
    },
    {
      title: "Total Habits",
      value: "8",
      description: "habits tracked",
      icon: Calendar,
      variant: "default",
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="transition-all duration-200 hover:shadow-md"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.title === "Current Streak" && (
                <span className="text-sm text-muted-foreground">
                  {stat.description}
                </span>
              )}
            </div>
            {stat.title !== "Current Streak" && (
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
