import React, { useEffect, useState } from "react";
import { Title } from "@mantine/core";
import "../style/blobz.min.css";
import "../style/game.scss";

const Game = (props) => {
  return (
    <div className="game">
      <Title order={1}>BETTER POWER HOUR</Title>
      <div className="timer">
        <div className="blobs">
          <div
            className="tk-blob aa"
            style={{ "--fill": "#7E6AFCbb", "--amount": 10, "--time": "50s" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274 303.2">
              <path d="M260.2 41.4c20 29.2 14.6 74.5 7.2 124.4-7.3 49.9-16.6 104.5-49.2 126-32.5 21.6-88.4 10.2-132-15.2s-75-64.7-83.6-107.8C-6.1 125.7 8 79 36.3 47.8 64.5 16.7 107 1.3 150.9.1c43.9-1.1 89.3 12 109.3 41.3z"></path>
            </svg>
          </div>
          <div
            className="tk-blob"
            style={{ "--fill": "#A051FCbb", "--amount": 10, "--time": "40s" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 428.4 394.6">
              <path d="M369.4 109.2c43.2 55.3 71.5 121.4 53.4 167.3-18.2 45.8-82.8 71.4-140.5 91.7-57.8 20.4-108.7 35.4-152.9 20.3C85.1 373.4 47.6 328.3 23.2 267c-24.5-61.2-35.8-138.6-2.5-191.7C54.1 22.2 132-6.6 200 1.3c68 7.9 126.1 52.5 169.4 107.9z"></path>
            </svg>
          </div>
          <div
            className="tk-blob"
            style={{
              "--fill": "#BF3AFCbb",
              "--amount": 10,
              "--time": "30s",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.9 377">
              <path d="M389.3 42c39.8 40.8 47.5 116.3 21.3 165.4-26.1 49.1-86 71.8-145.9 104.3-59.8 32.5-119.6 74.8-168.9 63.4C46.5 363.7 7.6 298.5 1 235.7-5.5 173 20.3 112.5 59.8 71.9 99.3 31.2 152.4 10.2 215 2.8 277.5-4.7 349.5 1.2 389.3 42z"></path>
            </svg>
          </div>
        </div>
        <div className="countdown">
          <p>60</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
