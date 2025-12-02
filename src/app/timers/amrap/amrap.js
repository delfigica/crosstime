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

export const Amrap = () => {
 // params
  const params = useSearchParams();
  const duration = params.get("duration") * 60;

  const [time, setTime] = useState(0);
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
      setTime((prev) => {
        if (prev + 1 >= duration) {
          clearInterval(interval);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, duration]);

  const handleStartPause = () => {
    if (time >= duration) return;
    if (starterRunning) return;
    if (starter <= 0) {
      setIsRunning((prev) => !prev);
    } else if (starter == 10) {
      setStarterRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setStarter(10);
    setStarterRunning(true);
  };

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <>
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: "1.5em", margin: "10px 0px" }}>
          AMRAP
        </Typography>
        <Typography sx={{ fontSize: "1.2em" }}>
          To {duration / 60}&apos;
        </Typography>
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
  );
}