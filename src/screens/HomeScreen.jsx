import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import { Container } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { WiDayRainWind } from "weather-icons-react";

export const Home = () => {
  const [countryName, setCountryName] = useState("");
  const navigate = useNavigate();
  const getCuntryName = async () => {
    navigate(`/about/${countryName}`);
  };
  const myStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1874&q=80')",
    height: "120vh",
    width: "200vh",
    marginTop: "-100px",
    fontSize: "50px",
    backgroundSize: "cover",
  };

  return (
    <div style={myStyle}>
      <Container maxWidth="md">
        <div className="grid">
          <div className="symbol">
            <WiDayRainWind size={184} color="#000" />
          </div>
          <div className="wrapper1">
            <div clasname="input">
              <TextField
                id="outlined-basic"
                fullWidth
                value={countryName}
                label="Enter country Name"
                variant="outlined"
                onChange={(e) => setCountryName(e.target.value)}
              />
            </div>
            <div className="button">
              <Button
                size="large"
                variant="contained"
                disabled={countryName === ""}
                onClick={getCuntryName}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
