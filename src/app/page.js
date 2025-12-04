import Link from "next/link";
import { RealTime } from "./components/RealTime";
import { UsuallyWorks } from "./components/UsuallyWorks";

import "./globals.css";
import { btnSmokyBlack } from "./styles";
import { Box, Button, Container, Typography } from "@mui/material";

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
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: 'column',
          padding: '1em'
        }}
      >
        <Typography sx={{ fontSize: '1.5em'}}>CROSSTIME</Typography>
        <RealTime />
      </Box>
      <Link href={"/configuration"}>
        <Button
          variant="contained"
          fullWidth
          sx={{ margin: "10px 0px", ...btnSmokyBlack }}
        >
          New clock
        </Button>
      </Link>
      <UsuallyWorks />
    </Container>
  );
}
