import React from "react";
import { BackHome } from "../components/BackHome";

import { Container } from "@mui/material";
export default function TimersLayout({ children }) {
  return (
      <Container sx={{ margin: "10px 0px" }}>
        <BackHome />
        {children}
      </Container>
  );
}
