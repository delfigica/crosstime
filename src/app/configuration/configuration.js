"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLastTimer } from "../useLastTimer";
import { BackHome } from "../components/BackHome";

import { btnBlueGrey } from "@/app/styles";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";

export const Configuration = () => {
  const [modes, setModes] = useState([
    {
      id: "01",
      label: "OTM",
      values: { min: "", rounds: "" },
      route: "timers/otm",
    },
    {
      id: "02",
      label: "AMRAP",
      values: { duration: "" },
      route: "timers/amrap",
    },
    {
      id: "03",
      label: "1:1",
      values: { rounds: "" },
      route: "timers/oneperone",
    },
    {
      id: "04",
      label: "ROUND+REST",
      values: { rest: "", rounds: "" },
      route: "timers/roundplusrest",
    },
    { id: "05", label: "CAP", values: { duration: "" }, route: "timers/cap" },
    {
      id: "06",
      label: "TABATA",
      values: { rounds: "", active: "", rest: "" },
      route: "timers/tabata",
    },
  ]);

  const [index, setIndex] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setModes((prev) =>
      prev.map((mode, i) =>
        i === index
          ? {
              ...mode,
              values: {
                ...mode.values,
                [name]: value,
              },
            }
          : mode
      )
    );
  };

  const textFieldStyle = {
    color: "#DADDD3",
    border: "1px solid #daddd3",
    borderRadius: "25px",
    textTransform: "uppercase",
    fontSize: "0.7em",
    width: "100%",
    backgroundColor: "transparent",
    padding: "1em",
  };

  //MODES
  const OTM = (
    <Box sx={{ display: "flex" }}>
      <input
        placeholder="Time round"
        style={{
          margin: "0px 10px",
          ...textFieldStyle,
        }}
        name="min"
        value={modes[0].values.min}
        onChange={handleChange}
      />
      <input
        placeholder="Rounds"
        style={{ margin: "0px 10px", ...textFieldStyle }}
        name="rounds"
        value={modes[0].values.rounds}
        onChange={handleChange}
      />
    </Box>
  );

  const AMRAP = (
    <Box>
      <input
        placeholder="duration"
        style={textFieldStyle}
        onChange={handleChange}
        value={modes[1].values.duration}
        name="duration"
      />
    </Box>
  );

  const onePerOne = (
    <Box>
      <input
        placeholder="rounds"
        style={textFieldStyle}
        onChange={handleChange}
        name="rounds"
        value={modes[2].values.rounds}
      />
    </Box>
  );

  const roundPlusRest = (
    <Box sx={{ display: "flex" }}>
      <input
        placeholder="rest time (min)"
        style={{ margin: "0px 10px", ...textFieldStyle }}
        name="rest"
        value={modes[3].values.rest}
        onChange={handleChange}
      />
      <input
        placeholder="rounds"
        style={{ margin: "0px 10px", ...textFieldStyle }}
        name="rounds"
        value={modes[3].values.rounds}
        onChange={handleChange}
      />
    </Box>
  );

  const CAP = (
    <Box>
      <input
        placeholder="duration"
        style={textFieldStyle }
        name="duration"
        value={modes[4].values.duration}
        onChange={handleChange}
      />
    </Box>
  );

  const TABATA = (
    <Box>
      <input
        placeholder="rounds"
        style={{ margin: "5px 0px", ...textFieldStyle }}
        name="rounds"
        value={modes[5].values.rounds}
        onChange={handleChange}
      />
      <input
        placeholder="active (seg)"
        style={{ margin: "5px 0px", ...textFieldStyle }}
        name="active"
        value={modes[5].values.active}
        onChange={handleChange}
      />
      <input
        placeholder="rest (seg)"
        style={{ margin: "5px 0px", ...textFieldStyle }}
        name="rest"
        value={modes[5].values.rest}
        onChange={handleChange}
      />
    </Box>
  );

  const router = useRouter();
  const { saveLastTimer } = useLastTimer();
  const handleSubmit = (e) => {
    e.preventDefault();

    const currentValues = modes[index].values;
    const params = new URLSearchParams();
    const values = [];
    Object.entries(currentValues).forEach(([key, value]) => {
      if (value !== "") {
        params.append(key, value);
        values.push(`${key}: ${value}`);
      }
    });
    const lastTimerItem = {
      name: modes[index].label,
      values: values,
      route: `/${modes[index].route}?${params.toString()}`,
    };
    saveLastTimer(lastTimerItem);
    router.push(`/${modes[index].route}?${params.toString()}`);
  };

  //STYLES COMPONENTS
  const titleStyle = { fontSize: "1.4em", textTransform: "uppercase" };
  const btnModes = {
    backgroundColor: "#1F1F1F",
    color: "#DADDD3",
    margin: "7px",
    border: "1px solid rgba(218, 221, 211, 0.18)",
  };
  const btnModesSelected = {
    color: "#000",
    background: "#daddd3",
    margin: "7px",
    border: "1px solid rgba(218, 221, 211, 0.18)",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0a0b06",
        color: "#DADDD3",
        padding: "1em",
      }}
    >
      <Box sx={{ margin: "10px" }}>
        <BackHome />
      </Box>
      <Box sx={{ margin: "0px 0px", padding: "2em" }}>
        <Typography sx={titleStyle}>Select mode</Typography>
        <hr />
        <Box sx={{ margin: "10px 0" }}>
          {modes.map((mode, i) => (
            <Button
              key={mode.id}
              variant="outlined"
              sx={i === index ? btnModesSelected : btnModes}
              onClick={() => {
                setIndex(i);
              }}
            >
              {mode.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ margin: "10px 0" }}>
          <Typography sx={titleStyle}>Config mode</Typography>
          <hr />
          <Typography sx={{ margin: "10px 0px" }}>
            {modes[index].label}
          </Typography>
          {index === 0 && OTM}
          {index === 1 && AMRAP}
          {index === 2 && onePerOne}
          {index === 3 && roundPlusRest}
          {index === 4 && CAP}
          {index === 5 && TABATA}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <Button sx={{ ...btnBlueGrey, width: "120px" }} onClick={handleSubmit}>
          Start
        </Button>
      </Box>
    </Box>
  );
};
