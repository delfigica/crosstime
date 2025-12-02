"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";
import { buttonDisable, buttonStyle, clockStyle } from "@/app/styles";

export default function RoundPlusRest() {
  //params
  const props = useSearchParams();
  const restSeconds = props.get("rest") * 60;
  const rounds = props.get("rounds");

  const [phase, setPhase] = useState("idle"); // idle | work | rest | finished
  const [timeInPhase, setTimeInPhase] = useState(0);
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || phase === "idle" || phase === "finished") return;

    const id = setInterval(() => {
      setTimeInPhase((prev) => {
        if (phase === "work") {
          return prev + 1;
        } else if (phase === "rest") {
          return prev - 1;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, phase]);

  useEffect(() => {
    if (!isRunning || phase !== "rest") return;

    if (timeInPhase <= 0) {
      if (round >= rounds) {
        setPhase("finished");
        setIsRunning(false);
      } else {
        setRound((r) => r + 1);
        setPhase("work");
        setTimeInPhase(0);
      }
    }
  }, [timeInPhase, phase, rounds, round, isRunning]);

  const handleStartPause = () => {
    if (phase === "finished") return;

    if (phase === "idle") {
      setPhase("work");
      setTimeInPhase(0);
    }

    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase("idle");
    setTimeInPhase(0);
    setRound(1);
  };

  const handleRoundDone = () => {
    if (phase !== "work") return;

    setPhase("rest");
    setTimeInPhase(restSeconds);
  };

  const minutes = String(Math.floor(timeInPhase / 60)).padStart(2, "0");
  const seconds = String(Math.max(timeInPhase % 60, 0)).padStart(2, "0");

  let phaseLabel = "";
  if (phase === "idle") phaseLabel = "START TIMER";
  if (phase === "work") phaseLabel = "WORKING TIME";
  if (phase === "rest") phaseLabel = "REST TIME";
  if (phase === "finished") phaseLabel = "FINISH TIME";
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
          ROUND {round}/{rounds}
        </Typography>
        <Typography sx={{ fontSize: "1.2em", textTransform: "uppercase" }}>
          {phaseLabel}
        </Typography>
      </Box>
      <Box sx={{ margin: "10px 0px" }}>
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
    </>
  );
}
