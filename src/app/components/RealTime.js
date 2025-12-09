"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { timeSubtitle, timeText } from "../styles";

export const RealTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const parseTime = (time) => {
    if (time < 10) {
      return "0" + time;
    } else if (time >= 10) {
      return time;
    }
  };

  return (
    <Box>
      <Box>
        <Typography sx={{ ...timeText, fontSize: '2em' }}>
          {parseTime(now.getHours())}
        </Typography>
        <Typography sx={{ ...timeSubtitle }}>H</Typography>
      </Box>
      <Box>
        <Typography sx={{ ...timeText, fontSize: '2em' }}>
          {parseTime(now.getMinutes())}
        </Typography>
        <Typography sx={{ ...timeSubtitle }}>M</Typography>
      </Box>
      <Box>
        <Typography sx={{ ...timeText, fontSize: '2em' }}>
          {parseTime(now.getSeconds())}
        </Typography>
        <Typography sx={{ ...timeSubtitle }}>S</Typography>
      </Box>
    </Box>
  );
};
