"use client";
import React, { useEffect, useState } from "react";

export const useLastTimer = () => {
  const [lastTimer, setLastTimer] = useState({
    name: undefined,
    values: [],
    route: "timers/",
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
        const raw = window.localStorage.getItem('lastTimer');
        if(!raw) return;
        const parsed = JSON.parse(raw);
        setLastTimer(parsed);
    } catch (err) {
        console.error('Error reading last timer:', err);
        
    }
  }, []);

  const saveLastTimer = (timer) => {
    setLastTimer(timer);
    try {
      window.localStorage.setItem('lastTimer', JSON.stringify(timer));
    } catch (err) {
      console.error("Error saving last timer:", err);
    }
  };

   const clearLastTimer = () => {
    setLastTimer(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return { lastTimer, saveLastTimer, clearLastTimer };
};
