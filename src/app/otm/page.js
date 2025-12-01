"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { buttonDisable, buttonStyle } from "../styles";
import { Box, Button, Container, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Otm() {
  const params = useSearchParams();

  const min = params.get("min");
  const rounds = params.get("rounds");
  
  const [roundsLefts, setRoundsLefts] = useState(1)


  const totalTime = (min * rounds) * 60;

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

  const parseTime = (time) => {
    if (time < 10) {
      return "0" + time;
    } else if (time >= 10) {
      return time;
    }
  };
  return (
    <Container sx={{ marginTop: "10px" }}>
      <Link href={"/"}>
        <Button variant="contained" sx={{ ...buttonStyle }}>
          Back home
        </Button>
      </Link>
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column'
        }}
      >
        <Typography sx={{ fontSize: "7em" }}>
          {minutes}:{seconds}
        </Typography>
        <Typography sx={{ fontSize: '2em'}}>ROUND {roundsLefts}/{rounds} </Typography>
      </Box>
      <Button
        sx={isRunning ? buttonDisable : buttonStyle}
        fullWidth
        onClick={handleStartPause}
      >
       {isRunning ? 'Stop timer' : 'Start Timer'}
      </Button>

      <Button onClick={handleReset} sx={{...buttonStyle, margin:'20px 0px'}} fullWidth >Reset</Button>

    </Container>
  );
}
