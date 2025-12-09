"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLastTimer } from "./useLastTimer";
import { RealTime } from "./components/RealTime";
import { UsuallyWorks } from "./components/UsuallyWorks";

import "./globals.css";
import { counterTitle } from "./styles";
import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";

const boxHome = {
  backgroundColor: "#1F1F1F",
  width: "180px",
  padding: ".5em",
  borderRadius: "10px",
  height: "210px",
  border: "1px solid rgba(218, 221, 211, 0.18)",
};

const btnNewClock = {
  backgroundColor: "#1F1F1F",
  border: "1px solid rgba(218, 221, 211, 0.18)",
};

export default function Home() {
  const { lastTimer } = useLastTimer();

  useEffect(() => {
console.log(lastTimer);

  }, [lastTimer])

  const router = useRouter();
  const goToWork = (route) => {
    router.push(route);
  };
  return (
    <Container
      sx={{ minHeight: "100vh", backgroundColor: "#0a0b06", color: "#DADDD3" }}
    >
      <Box sx={{ padding: "1.5/*  */em" }}>
        <Typography
          sx={{ fontSize: "2em", color: "#DADDD3", textAlign: "center" }}
        >
          CROSSTIME
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            ...boxHome,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <RealTime />
          <Typography sx={{ ...counterTitle, fontSize: "1.5em" }}>
            TIME
          </Typography>
        </Box>
          <Box
            onClick={() => {
              goToWork(lastTimer.route);
            }}
            sx={{ ...boxHome }}
          >
            <Typography
              sx={{
                fontSize: "1.5em",
                textAlign: "center",
                color: "#DADDD3",
                textDecoration: "none",
              }}
            >
              LAST TIMER
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: "15px 0",
              }}
            >
              <Box>
                {lastTimer?.values.map((value, i) => (
                  <Typography
                    key={i}
                    sx={{ textTransform: "uppercase", fontSize: ".9em" }}
                  >
                    {value}
                  </Typography>
                ))}
              </Box>
              <Typography sx={{ ...counterTitle, fontSize: "1.5em" }}>
                {lastTimer.name}
              </Typography>
            </Box>
          </Box>
      </Box>
      <Link href={"/configuration"}>
        <Button
          variant="contained"
          fullWidth
          sx={{ margin: "15px 0px", ...btnNewClock }}
        >
          New clock
        </Button>
      </Link>
      <UsuallyWorks />
    </Container>
  );
}
