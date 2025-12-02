"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";
import { buttonDisable, buttonStyle, clockStyle } from "@/app/styles";

export default function Amrap() {
  const params = useSearchParams();

  const duration = params.get("duration") * 60;

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

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
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
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
        <Box sx={clockStyle}>
          <Typography sx={{ fontSize: "5em" }}>
            {minutes}:{seconds}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "2em" }}>
          To {duration / 60}&apos;
        </Typography>
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
        sx={{ ...buttonStyle, margin: "20px 0px" }}
        fullWidth
      >
        Reset
      </Button>
    </>
  );
}
