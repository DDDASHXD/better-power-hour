import React, { useEffect, useState } from "react";
import { Title, Button } from "@mantine/core";
import "../style/blobz.min.css";
import "../style/game.scss";

const initialTime = 3;
const initialMinuts = 60;

const Game = (props) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [minutesLeft, setMinutesLeft] = useState(initialMinuts);
  const [gameRunning, setGameRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState("BETTER POWER HOUR");
  const [unlimitedMode, setUnlimitedMode] = useState(initialMinuts);
  const [lastPlayer, setLastPlayer] = useState("");
  const [lastWildcard, setLastWildcard] = useState("");

  useEffect(() => {
    const generatePlayer = () => {
      let newPlayer =
        props.players[Math.floor(Math.random() * props.players.length)];

      if (props.players.length > 1) {
        while (newPlayer === lastPlayer) {
          newPlayer =
            props.players[Math.floor(Math.random() * props.players.length)];
          console.log("Duplicate player");
        }
      }

      setLastPlayer(newPlayer);
      return newPlayer;
    };

    const generateWildcard = () => {
      let newWildcard =
        props.wildcards[Math.floor(Math.random() * props.wildcards.length)];

      if (props.wildcards.length > 1) {
        while (newWildcard === lastWildcard) {
          newWildcard =
            props.wildcards[Math.floor(Math.random() * props.wildcards.length)];
          console.log("Duplicate wildcard");
        }
      }

      setLastWildcard(newWildcard);
      return newWildcard;
    };

    // Task logic
    const showTask = () => {
      const randomPlayer = generatePlayer();
      const randomWildcard = generateWildcard();
      const randomPredetermined =
        props.preDetermined[
          Math.floor(Math.random() * props.preDetermined.length)
        ];
      const randomNumber = Math.random();
      // const randomNumber = 9;

      if (
        randomNumber < 0.9 &&
        randomNumber > 0.2 &&
        props.wildcards.length > 0
      ) {
        // Wildcard
        if (props.players.length > 0) {
          setCurrentTask(`${randomPlayer}, ${randomWildcard}`);
        } else {
          setCurrentTask(`Everyone, ${randomWildcard}`);
        }
      } else if (randomNumber > 0.9) {
        if (props.downDrinks) {
          setCurrentTask("Everybody downs their drinks!");
        } else {
          setCurrentTask("Everybody drinks!");
        }
      } else if (randomNumber < 0.2) {
        setCurrentTask("Everybody drinks!");
        if (randomNumber < 0.1 && props.wildcards.length > 0) {
          setCurrentTask(`Everyone, ${randomWildcard}`);
        }
      } else if (props.wildcards == 0) {
        if (props.players.length > 0) {
          setCurrentTask(`${randomPlayer}, drink!`);
        } else {
          setCurrentTask("Everybody drinks!");
        }
      }
      console.log(randomNumber);
    };

    // Game loop
    if (gameRunning) {
      setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          showTask();
          if (minutesLeft > 0) {
            setMinutesLeft(minutesLeft - 1);
            setTimeLeft(initialTime);
          } else {
            setGameRunning(false);
            setTimeLeft(initialTime);
            setCurrentTask("Game over!");
            if (props.unlimitedMode) {
              setMinutesLeft(999999);
            } else {
              setMinutesLeft(initialMinuts);
            }
          }
        }
      }, 1000);
    } else {
      if (props.unlimitedMode) {
        setUnlimitedMode("∞");
        setMinutesLeft(999999);
      } else {
        setUnlimitedMode(initialMinuts);
        setMinutesLeft(initialMinuts);
      }
    }
  }, [timeLeft, gameRunning, props.unlimitedMode]);

  const startGame = () => {
    setGameRunning(true);
  };

  const stopGame = () => {
    setGameRunning(false);
    setTimeLeft(initialTime);
    setMinutesLeft(initialMinuts);
  };

  return (
    <div className="game">
      <Title order={1} className="game-header">
        {currentTask}
      </Title>
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
          <p className="countdown-seconds">{timeLeft}</p>
          <p className="countdown-left">
            {props.unlimitedMode
              ? `${999999 - minutesLeft}/${unlimitedMode}`
              : `${initialMinuts - minutesLeft}/${unlimitedMode}`}
          </p>
        </div>
      </div>
      <Button
        style={{ height: "3rem", width: "50%", margin: "auto" }}
        onClick={gameRunning ? () => stopGame() : () => startGame()}
      >
        {gameRunning ? "Stop Game" : "Start Game"}
      </Button>
    </div>
  );
};

export default Game;
