"use client";
import React from "react";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export const UsuallyWorks = () => {
  const works = [
    {
      name: "OTM",
      values: ["min: 1", "rounds: 9"],
      route: "timers/otm?min=1&rounds=9",
    },
    {
      name: "AMRAP",
      values: ["duration: 15'"],
      route: "timers/amrap?duration=15",
    },
    {
      name: "ROUND+REST",
      values: ["rest: 1", "rounds: 5"],
      route: "timers/roundplusrest?rest=1&rounds=5",
    },
    {
      name: "TABATA",
      values: ["active: 40", "rounds: 8", "rest: 20"],
      route: "timers/tabata?rounds=8&active=40&rest=20",
    },
  ];

  const router = useRouter();
  const goToWork = (route) => {
    router.push(route);
  };
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "1.5em",
          textTransform: "uppercase",
          margin: "15px 0px 5px 0px",
          textAlign: "center",
        }}
      >
        Usually Works
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          paddingBottom: "20px ",
        }}
      >
        {works.map((work, i) => (
          <Box
            key={i}
            sx={{
              width: "46%",
              height: "120px",
              backgroundColor: "#1F1F1F",
              color: "#EFF1EF",
              borderRadius: "5px",
              margin: "5px",
              padding: "1em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(218, 221, 211, 0.18)",
            }}
            onClick={() => {
              goToWork(work.route);
            }}
          >
            <Typography sx={{ fontSize: "1.1em" }}>{work.name}</Typography>
            <Box>
              {work.values.map((value, index) => (
                <Typography
                  key={index}
                  sx={{ fontSize: "0.7em", textTransform: "uppercase" }}
                >
                  {value}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
