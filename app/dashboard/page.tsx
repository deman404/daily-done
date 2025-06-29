"use client";

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { HabitForm } from "@/components/habits/HabitForm";
import { HabitCard } from "@/components/habits/HabitCard";
import { Habit, HabitLog } from "@/type";
import { getHabits, deleteHabit } from "@/lib/Logic";

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);

  // جلب العادات عند تحميل الصفحة
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const habitsData = await getHabits();
        setHabits(habitsData);
      } catch (error) {
        console.error("Failed to fetch habits:", error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <>
      <DashboardHeader />
      <div className="p-4">
        <DashboardStats />
        <div className="space-y-6 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Your Habits</h2>
              <p className="text-muted-foreground mt-1">
                Manage and track your daily habits
              </p>
            </div>
            <HabitForm
              onHabitCreated={async () => {
                const updatedHabits = await getHabits();
                setHabits(updatedHabits);
              }}
            />
          </div>

          {habits.length === 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Plus className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">No habits yet</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Create your first habit to start building a better daily
                  routine and track your progress.
                </p>
                <HabitForm
                  onHabitCreated={async () => {
                    const updatedHabits = await getHabits();
                    setHabits(updatedHabits);
                  }}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => {
                // Calculate completion rate for this habit
                const logsForHabit = habitLogs.filter(
                  (log) => log.habit_id === habit.id
                );
                const completedCount = logsForHabit.filter(
                  (log) => log.completed
                ).length;
                const completionRate =
                  logsForHabit.length > 0
                    ? (completedCount / logsForHabit.length) * 100
                    : 0;

                return (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onDelete={async (id) => {
                      await deleteHabit(id);
                      const updatedHabits = await getHabits();
                      setHabits(updatedHabits);
                    }}
                    completionRate={completionRate}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
