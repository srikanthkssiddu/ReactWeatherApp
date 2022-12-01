import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Alert } from "@mui/material";

export const CountryDetails = () => {
  const { name } = useParams();
  const [countryInfo, setCountryInfo] = useState();
  const [capitalName, setCapitalName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState();
  const [countryApiError, setCountryApiError] = useState(false);
  const [weatherApiError, setWeatherApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getCountryData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = response.data;
      setCountryInfo(data[0]);
      setCapitalName(data[0].capital[0]);
    } catch (error) {
      setCountryApiError(true);
    }
  }, [name]);

  useEffect(() => {
    getCountryData();
  }, [getCountryData]);

  const getWeatherDetails = async () => {
    window.scrollTo({ top: 500, left: 0, behavior: "smooth" });
    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=60774ad1b455f3cff7d3f8a273f488f5&query=${capitalName}`
      );
      const data = response.data;
      setWeatherInfo(data.current);
      setLoading(false);
    } catch (error) {
      setWeatherApiError(true);
    }
  };

  const getBackToHome = () => {
    navigate("/");
  };

  const myStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1874&q=80')",
    height: "185vh",
    width: "200vh",
    marginTop: "-100px",
    fontSize: "50px",
    backgroundSize: "cover",
  };
  return (
    <div style={myStyle}>
      <div className="fullLayout">
        <div className="layout">
          <h3>Country Details:-</h3>

          {countryInfo ? (
            <div className="heading">
              <p>Capital: {countryInfo.capital[0]}</p>
              <p>Population: {countryInfo.population}</p>
              <p>
                Latitude: {countryInfo.latlng[0]}
                <sup>o</sup>
              </p>
              <p>
                Longitude: {countryInfo.latlng[1]}
                <sup>o</sup>
              </p>
              <small>Country Flag : </small>
              <img src={countryInfo.flags.svg} height="100px" alt="" />

              <br />
              <br />
              <Button
                size="medium"
                variant="contained"
                onClick={getWeatherDetails}
              >
                Capital Weather
              </Button>
            </div>
          ) : (
            <div>
              {" "}
              {countryApiError ? (
                <>
                  <Alert severity="error" sx={{ m: 3 }}>
                    Country info not found!
                  </Alert>
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={getBackToHome}
                  >
                    Please try agin
                  </Button>
                </>
              ) : (
                "Loading..."
              )}
            </div>
          )}

          {weatherInfo ? (
            <div className="heading">
              <br />
              <h1>Weather Info:-</h1>
              <br />
              <img
                src={weatherInfo.weather_icons[0]}
                alt="Weather Icon"
                height="130px"
              />
              <p>
                Temperature: {weatherInfo.temperature}
                <sup>o</sup>
              </p>
              <p>Wind Speed: {weatherInfo.wind_speed}</p>
              <p>Precip: {weatherInfo.precip}</p>
            </div>
          ) : (
            <div>
              {weatherApiError ? (
                <Alert severity="warning">
                  Weather info not found. Please try again!
                </Alert>
              ) : (
                <p>{loading ? "Loading..." : ""}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
