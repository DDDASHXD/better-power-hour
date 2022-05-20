import React, { useEffect, useState } from "react";
import { Title, Button } from "@mantine/core";
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
            className="tk-blob aa"
            style={{ "--fill": "#7E6AFCbb", "--amount": 10, "--time": "40s" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274 303.2">
              <path d="M260.2 41.4c20 29.2 14.6 74.5 7.2 124.4-7.3 49.9-16.6 104.5-49.2 126-32.5 21.6-88.4 10.2-132-15.2s-75-64.7-83.6-107.8C-6.1 125.7 8 79 36.3 47.8 64.5 16.7 107 1.3 150.9.1c43.9-1.1 89.3 12 109.3 41.3z"></path>
            </svg>
          </div>
          <div
            className="tk-blob aa"
            style={{ "--fill": "#7E6AFCbb", "--amount": 5, "--time": "30s" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274 303.2">
              <path d="M260.2 41.4c20 29.2 14.6 74.5 7.2 124.4-7.3 49.9-16.6 104.5-49.2 126-32.5 21.6-88.4 10.2-132-15.2s-75-64.7-83.6-107.8C-6.1 125.7 8 79 36.3 47.8 64.5 16.7 107 1.3 150.9.1c43.9-1.1 89.3 12 109.3 41.3z"></path>
            </svg>
          </div>
        </div>
        <div className="countdown">
          <p className="countdown-seconds">60</p>
          <p className="countdown-left">5/60</p>
        </div>
      </div>
      <Button style={{ height: "3rem", width: "50%", margin: "auto" }}>
        Start Game
      </Button>
    </div>
  );
};

export default Game;
