import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebaseConfig";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  query,
  orderByChild,
  equalTo,
  remove,
  update,
  startAt,
  endAt,
  orderByKey,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();

export function useUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const dbRef = ref(database);
        get(child(dbRef, `users/${userId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            } else {
              setUserData(null);
              console.log("No data available for user:", userId);
            }
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
            console.error("Error fetching user data:", error);
          });
      } else {
        setUserData(null);
        setLoading(false);
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return { userData, loading, error };
}

export const habitOperations = {
  // Get all habits for the current user
  // Create a new habit
  // Delete a habit by id
};

export const getHabits = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const habitsRef = ref(database, "habits");
  // استعلام لجلب العادات الخاصة بالمستخدم و ترتيبها حسب created_at
  const q = query(habitsRef, orderByChild("user_id"), equalTo(user.uid));

  const snapshot = await get(q);
  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  // تحويل الكائن إلى مصفوفة مع إضافة id لكل عنصر
  const habits = Object.entries(data).map(([id, habit]) => ({
    id,
    ...(habit as any),
  }));

  // ترتيب المصفوفة حسب created_at (لأن Realtime DB لا تضمن ترتيب عند استعلام orderByChild على user_id)
  habits.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateA - dateB;
  });

  return habits;
};

export const createHabit = async (
  name: string,
  description: string = "",
  color: string = "#8B5CF6"
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const habitsRef = ref(database, "habits");

  const newHabit = {
    user_id: user.uid,
    name,
    description,
    color,
    created_at: new Date().toISOString(),
  };

  // إضافة عنصر جديد تحت "habits" مع مفتاح تلقائي
  const newHabitRef = await push(habitsRef, newHabit);

  return {
    id: newHabitRef.key,
    ...newHabit,
  };
};

export const deleteHabit = async (id: string) => {
  if (!id) throw new Error("Habit id is required");

  const habitRef = ref(database, `habits/${id}`);
  await remove(habitRef);
};

export const habitLogOperations = {
  // Get habit logs for a date range
  async getHabitLogs(startDate: string, endDate: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const logsRef = ref(database, "habit_logs");

    // جلب سجلات المستخدم حسب التواريخ (مع ترشيح user_id بعد التحميل لأنه Realtime DB لا يدعم فلتر متعدد)
    const q = query(
      logsRef,
      orderByChild("date"),
      startAt(startDate),
      endAt(endDate)
    );

    const snapshot = await get(q);
    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    // تصفية النتائج حسب user_id (لأن Realtime DB لا يدعم where متعددة بسهولة)
    const filteredLogs = Object.entries(data)
      .filter(([_, log]: [string, any]) => log.user_id === user.uid)
      .map(([id, log]) => ({
        id,
        ...(log as any),
      }));

    // ترتيب حسب التاريخ (غالباً البيانات مرتبة لكن للتأكد)
    filteredLogs.sort((a, b) => a.date.localeCompare(b.date));

    return filteredLogs;
  },

  // Toggle habit completion for a specific date
};

export const toggleHabitLog = async (habitId: string, date: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const logsRef = ref(database, "habit_logs");

  // جلب جميع السجلات لنفس العادة والتاريخ للمستخدم
  const snapshot = await get(
    query(
      logsRef,
      orderByChild("habit_id")
      // لاحظ: لا يمكن عمل فلتر مركب بسهولة لذا نحتاج جلب بيانات وعمل فلتر في الجافاسكربت
    )
  );

  if (!snapshot.exists()) {
    // لا يوجد سجلات على الإطلاق، ننشئ جديد
    const newLog = {
      user_id: user.uid,
      habit_id: habitId,
      date,
      completed: true,
    };
    const newLogRef = await push(logsRef, newLog);
    return { id: newLogRef.key, ...newLog };
  }

  const data = snapshot.val();
  // ابحث عن سجل مطابق بالعادة والتاريخ والمستخدم
  const existingEntry = Object.entries(data).find(
    ([_, log]: [string, any]) =>
      log.user_id === user.uid && log.habit_id === habitId && log.date === date
  );

  if (existingEntry) {
    const [logId, logUnknown] = existingEntry;
    const log = logUnknown as { completed: boolean; [key: string]: any };
    const updatedCompleted = !log.completed;

    const updateRef = ref(database, `habit_logs/${logId}`);
    await update(updateRef, { completed: updatedCompleted });

    return { id: logId, ...log, completed: updatedCompleted };
  } else {
    // إنشاء سجل جديد
    const newLog = {
      user_id: user.uid,
      habit_id: habitId,
      date,
      completed: true,
    };
    const newLogRef = await push(logsRef, newLog);
    return { id: newLogRef.key, ...newLog };
  }
};
