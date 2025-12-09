"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { btnBlueGrey } from "@/app/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import { BackHome } from "../components/BackHome";
import { useLastTimer } from "../useLastTimer";

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

  //MODES
  const OTM = (
    <Box sx={{ display: "flex" }}>
      <TextField
        size="small"
        label="Time round"
        sx={{
          margin: "0px 10px",
        }}
        name="min"
        value={modes[0].values.min}
        onChange={handleChange}
      />
      <TextField
        size="small"
        label="Rounds"
        sx={{ margin: "0px 10px" }}
        name="rounds"
        onChange={handleChange}
        value={modes[0].values.rounds}
      />
    </Box>
  );

  const AMRAP = (
    <Box>
      <TextField
        size="small"
        label="duration"
        fullWidth
        onChange={handleChange}
        value={modes[1].values.duration}
        name="duration"
      />
    </Box>
  );

  const onePerOne = (
    <Box>
      <TextField
        size="small"
        label="rounds"
        fullWidth
        onChange={handleChange}
        name="rounds"
        value={modes[2].values.rounds}
      />
    </Box>
  );

  const roundPlusRest = (
    <Box sx={{ display: "flex" }}>
      <TextField
        size="small"
        label="rest time (min)"
        sx={{ margin: "0px 10px" }}
        name="rest"
        value={modes[3].values.rest}
        onChange={handleChange}
      />
      <TextField
        size="small"
        label="rounds"
        sx={{ margin: "0px 10px" }}
        name="rounds"
        value={modes[3].values.rounds}
        onChange={handleChange}
      />
    </Box>
  );

  const CAP = (
    <Box>
      <TextField
        size="small"
        label="duration"
        fullWidth
        name="duration"
        value={modes[4].values.duration}
        onChange={handleChange}
      />
    </Box>
  );

  const TABATA = (
    <Box>
      <TextField
        size="small"
        label="rounds"
        fullWidth
        sx={{ margin: "5px 0px" }}
        name="rounds"
        value={modes[5].values.rounds}
        onChange={handleChange}
      />
      <TextField
        size="small"
        label="active (seg)"
        fullWidth
        sx={{ margin: "5px 0px" }}
        name="active"
        value={modes[5].values.active}
        onChange={handleChange}
      />
      <TextField
        size="small"
        label="rest (seg)"
        fullWidth
        sx={{ margin: "5px 0px" }}
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
    const values = []
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
    backgroundColor: "#daddd3",
    color: "#0a0b06",
    margin: "7px",
    border: "1px solid #daddd3",
  };
  const btnModesSelected = {
    color: "#daddd3",
    background: "#889681",
    margin: "7px",
    border: "1px solid #889681",
  };

  return (
    <>
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
    </>
  );
};
