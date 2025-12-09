"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";
import {
  btnAlabster,
  btnBlueGrey,
  buttonDisable,
  buttonStyle,
  clockStyle,
  counterTitle,
  timeSubtitle,
  timeText,
} from "@/app/styles";
import { BackHome } from "@/app/components/BackHome";

export const OnePerOne = () => {
  // params
  const params = useSearchParams();
  const maxRounds = Number(params.get("rounds") || 0);

  const [phase, setPhase] = useState("idle"); // idle | work | rest | finished
  const [timeInPhase, setTimeInPhase] = useState(0);
  const [lastWorkDuration, setLastWorkDuration] = useState(0);
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

    const interval = setInterval(() => {
      setTimeInPhase((prev) => {
        if (phase === "work") {
          return prev + 1;
        }
        if (phase === "rest") {
          return prev - 1;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, phase]);

  useEffect(() => {
    if (!isRunning || starterRunning) return;
    if (phase !== "rest") return;

    if (timeInPhase <= 0) {
      if (round >= maxRounds) {
        setPhase("finished");
        setIsRunning(false);
      } else {
        setRound((r) => r + 1);
        setTimeInPhase(0);
        setPhase("work");
      }
    }
  }, [timeInPhase, phase, round, maxRounds, isRunning]);

  const handleStartPause = () => {
    if (phase === "finished") return;

    if (phase === "idle") {
      setPhase("work");
      setTimeInPhase(0);
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
    setTimeInPhase(0);
    setLastWorkDuration(0);
    setRound(1);
    setStarter(10);
    setStarterRunning(true);
  };

  const handleRoundDone = () => {
    if (phase !== "work") return;

    const workDuration = timeInPhase;
    setLastWorkDuration(workDuration);
    setTimeInPhase(workDuration);
    setPhase("rest");
  };

  const safeTime = Math.max(timeInPhase, 0);
  const minutes = String(Math.floor(safeTime / 60)).padStart(2, "0");
  const seconds = String(safeTime % 60).padStart(2, "0");

  let phaseLabel = "";
  if (phase === "idle") phaseLabel = "START TIMER";
  if (phase === "work") phaseLabel = "WORKING TIME";
  if (phase === "rest") phaseLabel = "REST TIME";
  if (phase === "finished") phaseLabel = "FINISH TIME";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2em",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography sx={timeText}>
            {round}/{maxRounds}
          </Typography>
          <Typography sx={timeSubtitle}>ROUNDS</Typography>
        </Box>
        <Box>
          <Typography sx={timeText}>{minutes}</Typography>
          <Typography sx={timeSubtitle}>M</Typography>
        </Box>
        <Box>
          <Typography sx={timeText}>
            {starterRunning ? starter : seconds}
          </Typography>
          <Typography sx={timeSubtitle}>S</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Typography sx={{ ...counterTitle, margin: "auto" }}>1:1</Typography>
          <Typography
            sx={{ ...counterTitle, fontSize: "1em", margin: "auto -20px" }}
          >
            {phaseLabel}
          </Typography>
        </Box>
        <Box sx={{ width: "80%" }}>
          <Button
            onClick={handleRoundDone}
            disabled={phase !== "work" || !isRunning}
            sx={
              !isRunning
                ? { ...buttonDisable, margin: "10px 0px" }
                : { ...btnBlueGrey, margin: "10px 0px" }
            }
            fullWidth
          >
            Round done
          </Button>
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
          <BackHome />
        </Box>
      </Box>
    </Box>
  );
};
