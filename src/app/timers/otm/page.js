"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";
import { btnAlabster, buttonDisable, buttonStyle, clockStyle } from "@/app/styles";

export default function Otm() {

  // params
  const params = useSearchParams();
  const min = params.get("min");
  const rounds = params.get("rounds");

  const totalTime = min * rounds * 60;
  
  const [roundsLefts, setRoundsLefts] = useState(1);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft !== totalTime && timeLeft % (60 * min) === 0) {
      setRoundsLefts((prev) => prev + 1);
    }
  }, [timeLeft, isRunning, totalTime]);

  const handleStartPause = () => {
    if (timeLeft === 0) return;
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
    
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
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
        <Typography sx={{ fontSize: '1.5em', margin: '10px 0px'}}>OTM</Typography>
        <Typography sx={{ fontSize: "1em" }}>
          ROUND {roundsLefts}/{rounds}{" "}
        </Typography>
        <Box sx={clockStyle}>
          <Typography sx={{ fontSize: "5em" }}>
            {minutes}:{seconds}
          </Typography>
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
