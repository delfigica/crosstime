"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";
import {
  btnAlabster,
  buttonDisable,
  buttonStyle,
  clockStyle,
} from "@/app/styles";

export const Cap = () => {
  // params
  const params = useSearchParams();
  const duration = params.get("duration") * 60;

  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const [starter, setStarter] = useState(10);
  const [starterRunning, setStarterRunning] = useState(false);

  useEffect(() => {
    if (!starterRunning) return;
    const interval = setInterval(() => {
      setStarter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStarterRunning(false);
          setIsRunning(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [starterRunning]);

  useEffect(() => {
    if (!isRunning || starterRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartPause = () => {
    if (timeLeft === 0) return;
    if (starterRunning) return;
    if (starter <= 0) {
      setIsRunning((prev) => !prev);
    } else if (starter == 10) {
      setStarterRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    setStarter(10);
    setStarterRunning(true);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <>
      <Typography
        sx={{ fontSize: "1.5em", margin: "10px 0px", textAlign: "center" }}
      >
        CAP
      </Typography>
      <Typography sx={{ fontSize: "1.2em", textAlign: "center" }}>
        FROM {duration / 60}&apos;
      </Typography>
      <Box sx={{ height: "70vh", display: "flex", alignItems: "center" }}>
        <Box sx={clockStyle}>
          {starterRunning ? (
            <Typography sx={{ fontSize: "5em" }}>{starter}</Typography>
          ) : (
            <Typography sx={{ fontSize: "5em" }}>
              {minutes}:{seconds}
            </Typography>
          )}
        </Box>
      </Box>
      <Button
        sx={isRunning ? buttonDisable : buttonStyle}
        fullWidth
        onClick={handleStartPause}
      >
        {isRunning ? "Stop timer" : "Start Timer"}
      </Button>

      <Button
        onClick={handleReset}
        sx={{ ...btnAlabster, margin: "10px 0px" }}
        fullWidth
      >
        Reset
      </Button>
    </>
  )
};
