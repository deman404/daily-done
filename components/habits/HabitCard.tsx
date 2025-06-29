"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Habit } from "@/type";
import { Trash2, MoreHorizontal } from "lucide-react";

interface HabitCardProps {
  habit: Habit;
  onDelete: (id: string) => void;
  completionRate?: number;
  onToggleDone?: (habitId: string) => void; // دالة من خارج الكومبوننت لتبديل الحالة
  isDoneToday?: boolean; // حالة إنجاز اليوم (تحتاج توفرها من الأب)
}

export function HabitCard({
  habit,
  onDelete,
  completionRate = 0,
  onToggleDone,
  isDoneToday = false,
}: HabitCardProps) {
  return (
    <Card className="group transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: habit.color }}
            />
            <CardTitle className="text-lg">{habit.name}</CardTitle>
          </div>

          <Button
            size="sm"
            variant={isDoneToday ? "destructive" : "outline"}
            onClick={() => onToggleDone && onToggleDone(habit.id)}
          >
            {isDoneToday ? "Done" : "Mark as done"}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Habit</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{habit.name}"? This action
                  cannot be undone and will remove all tracking data for this
                  habit.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(habit.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {habit.description && (
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {habit.description}
          </p>
        )}

        {/* Progress section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This week</span>
            <span className="font-medium">{completionRate}%</span>
          </div>

          <Progress
            value={completionRate}
            className="h-2"
            style={
              {
                "--progress-background": habit.color,
              } as React.CSSProperties
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
