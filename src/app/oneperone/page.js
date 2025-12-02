"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Box, Button, Container, Typography } from "@mui/material";
import { BackHome } from "../components/BackHome";
import { buttonDisable, buttonStyle } from "../styles";

export default function OnePerOne() {
  const params = useSearchParams();
  const maxRounds = params.get("rounds");

  const [phase, setPhase] = useState("idle"); // idle | work | rest | finished
  const [timeInPhase, setTimeInPhase] = useState(0);
  const [lastWorkDuration, setLastWorkDuration] = useState(0);
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || phase === "idle" || phase === "finished") return;

    const interval = setInterval(() => {
      setTimeInPhase((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, phase]);

  useEffect(() => {
    if (!isRunning) return;
    if (phase !== "rest") return;
    if (lastWorkDuration === 0) return;

    if (timeInPhase >= lastWorkDuration) {
      if (round >= maxRounds) {
        setPhase("finished");
        setIsRunning(false);
      } else {
        setRound((r) => r + 1);
        setTimeInPhase(0);
        setPhase("work");
      }
    }
  }, [timeInPhase, phase, lastWorkDuration, round, maxRounds, isRunning]);

  const handleStartPause = () => {
    if (phase === "finished") return;

    if (phase === "idle") {
      setPhase("work"); // iniciar directamente en WORK
      setTimeInPhase(0);
    }

    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase("idle");
    setTimeInPhase(0);
    setLastWorkDuration(0);
    setRound(1);
  };

  const handleRoundDone = () => {
    if (phase !== "work") return;

    setLastWorkDuration(timeInPhase);
    setTimeInPhase(0);
    setPhase("rest");
  };

  const minutes = String(Math.floor(timeInPhase / 60)).padStart(2, "0");
  const seconds = String(timeInPhase % 60).padStart(2, "0");

  let phaseLabel = "";
  if (phase === "idle") phaseLabel = "START";
  if (phase === "work") phaseLabel = "WORKING";
  if (phase === "rest") phaseLabel = "REST";
  if (phase === "finished") phaseLabel = "FINISHED";

  return (
    <Container sx={{ margin: "10px 0px" }}>
      <BackHome />
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: "7em" }}>
          {minutes}:{seconds}
        </Typography>
        <Typography sx={{ fontSize: "2em" }}>
          ROUND {round}/{maxRounds}
        </Typography>
        <Typography sx={{ fontSize: "1.2em", textTransform: 'uppercase' }}>
          {phase} time
        </Typography>
      </Box>
      <Box sx={{ margin: '10px 0px'}}>
        <Button
          onClick={handleRoundDone}
          disabled={phase !== "work" || !isRunning}
          sx={!isRunning ? buttonDisable : buttonStyle}
          fullWidth
        >
          Round done
        </Button>
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
    </Container>
  );
}
