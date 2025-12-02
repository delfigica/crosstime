import { Box, Button, Container } from "@mui/material";
import { RealTime } from "./components/RealTime";

import "./globals.css";
import { buttonStyle } from "./styles";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#DADDD3",
          width: "100%",
          height: "30vh",
          marginTop: "1em",
          borderRadius: "10px",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
        }}
      >
        <RealTime />
      </Box>
      <Link href={"/timers/configuration"}>
        <Button
          variant="contained"
          fullWidth
          sx={{ margin: "10px 0px", ...buttonStyle }}
        >
          New clock
        </Button>
      </Link>
    </Container>
  );
}
