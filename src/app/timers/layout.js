import React from "react";
import { BackHome } from "../components/BackHome";

import { Box, Container } from "@mui/material";
export default function TimersLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0a0b06", color: "#DADDD3" }}>
      {children}
    </Box>
  );
}
