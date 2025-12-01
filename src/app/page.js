import { Box, Container, Typography } from "@mui/material";
import "./globals.css";
import { RealTime } from "./components/RealTime";

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#d7ccc8",
          width: "100%",
          height: "30vh",
          marginTop: "1em",
          borderRadius: "10px",
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
          fontWeight: '500'
        }}
      >
        <RealTime />
      </Box>
    </Container>
  );
}
