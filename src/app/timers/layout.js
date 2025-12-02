import { Container } from "@mui/material";
import React from "react";
import { BackHome } from "../components/BackHome";

export default function TimersLayout({ children }) {
  return (
    <Container sx={{ margin: '10px 0px'}}>
      <BackHome />
      { children }
    </Container>
  );
}
