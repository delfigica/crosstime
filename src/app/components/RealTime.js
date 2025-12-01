"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export const RealTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const parseTime = (time) => {
    console.log(time);
    if (time < 10) {
      return "0" + time;
    } else if (time >= 10) {
      return time;
    }
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "4em" }}>
        {parseTime(now.getHours())}: {parseTime(now.getMinutes())}:{" "}
        {parseTime(now.getSeconds())}
      </Typography>
    </Box>
  );
};
