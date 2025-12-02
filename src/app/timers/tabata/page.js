"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";
import {
  btnAlabster,
  buttonDisable,
  buttonStyle,
  clockStyle,
} from "../../styles";

export default function Tabata() {
  // params
  const params = useSearchParams();
  const rounds = params.get("rounds");
  const workSeconds = params.get("active");
  const restSeconds = params.get("rest");

  const [phase, setPhase] = useState("idle"); // idle | work | rest | finished
  const [timeLeft, setTimeLeft] = useState(workSeconds);
  const [round, setRound] = useState(1);
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
    if (
      !isRunning ||
      phase === "idle" ||
      phase === "finished" ||
      starterRunning
    )
      return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, phase]);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft !== 0) return;

    if (phase === "work") {
      setPhase("rest");
      setTimeLeft(restSeconds);
    } else if (phase === "rest") {
      if (round >= rounds) {
        setPhase("finished");
        setIsRunning(false);
      } else {
        setRound((r) => r + 1);
        setPhase("work");
        setTimeLeft(workSeconds);
      }
    }
  }, [timeLeft, phase, isRunning, round, rounds, workSeconds, restSeconds]);

  const handleStartPause = () => {
    if (phase === "finished") return;

    if (phase === "idle") {
      setPhase("work");
      setTimeLeft(workSeconds);
    }
    if (starterRunning) return;
    if (starter <= 0) {
      setIsRunning((prev) => !prev);
    } else if (starter == 10) {
      setStarterRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase("idle");
    setRound(1);
    setTimeLeft(workSeconds);
    setStarter(10);
    setStarterRunning(true);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  let phaseLabel = "";
  if (phase === "idle") phaseLabel = "START TIMER";
  if (phase === "work") phaseLabel = "WORKING TIME";
  if (phase === "rest") phaseLabel = "REST TIME";
  if (phase === "finished") phaseLabel = "FINISH TIME";

  return (
    <>
      <Typography
        sx={{ textAlign: "center", fontSize: "2em", marginTop: "20px" }}
      >
        TABATA
      </Typography>
      <Typography sx={{ fontSize: "1em", textAlign: "center" }}>
        ROUND {round}/{rounds}
      </Typography>
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
      <Typography sx={{ textAlign: "center", margin: "10px 0px" }}>
        {phaseLabel}
      </Typography>
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
