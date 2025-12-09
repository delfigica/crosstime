import Link from "next/link";
import { RealTime } from "./components/RealTime";
import { UsuallyWorks } from "./components/UsuallyWorks";

import "./globals.css";
import { btnSmokyBlack, counterTitle } from "./styles";
import { Box, Button, Container, Typography } from "@mui/material";

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
        <Box sx={{ ...boxHome }}>
          <Typography sx={{ fontSize: "1.5em", textAlign: "center" }}>
            LAST TIMER
          </Typography>
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
