"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { BackHome } from "../components/BackHome";
import { useSearchParams } from "next/navigation";
import { buttonDisable, buttonStyle, clockStyle } from "../styles";

export default function Cap() {
  const params = useSearchParams();
  const duration = params.get("duration") * 60;

  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

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
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <Container sx={{ margin: "10px 0px" }}>
      <BackHome />
      <Box sx={{ height: '70vh', display: 'flex', alignItems: 'center'}}>
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
        sx={{ ...buttonStyle, margin: "10px 0px" }}
        fullWidth
      >
        Reset
      </Button>
    </Container>
  );
}
