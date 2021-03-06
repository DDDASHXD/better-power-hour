import React, { useEffect, useState } from "react";
import { Title, Button, Tooltip } from "@mantine/core";
import { PlayerPlay, PlayerStop, PlayerPause } from "tabler-icons-react";
import "../style/blobz.min.css";
import "../style/game.scss";
import sound from "../sounds/finish.mp3";
const finishSound = new Audio(sound);

const initialTime = 60;

const Game = (props) => {
  const [initialMinutes, setInitialMinutes] = useState(60);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [minutesLeft, setMinutesLeft] = useState(initialMinutes);
  const [currentTask, setCurrentTask] = useState("BETTER POWER HOUR");
  const [unlimitedMode, setUnlimitedMode] = useState(initialMinutes);
  const [lastPlayer, setLastPlayer] = useState("");
  const [lastWildcard, setLastWildcard] = useState("");
  const [gamePaused, setGamePaused] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [firstTask, setFirstTask] = useState(false);
  const [hideEverybody, setHideEverybody] = useState(false);

  // create async sleep function
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

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

    const generateInlinePlayer = () => {
      let newPlayer =
        props.players[Math.floor(Math.random() * props.players.length)];

      if (props.players.length > 1) {
        while (newPlayer === lastPlayer) {
          newPlayer =
            props.players[Math.floor(Math.random() * props.players.length)];
          console.log("Duplicate name");
        }
      }

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

      // Check if the wildcard string contains (player) and replace it with a random player from the list
      if (newWildcard && newWildcard.includes("(player)")) {
        if (props.players.length < 1) {
          newWildcard = newWildcard.replace("(player)", "someone");
        } else {
          let newPlayer = generateInlinePlayer();
          newWildcard = newWildcard.replace("(player)", newPlayer);
        }
      }

      setLastWildcard(newWildcard);
      return newWildcard;
    };

    // To be made
    // if (props.minutes) {
    //   updateMinutes(props.minutes);
    // }

    // Task logic
    const showTask = () => {
      const randomPlayer = generatePlayer();
      const randomWildcard = generateWildcard();
      const randomPredetermined =
        props.preDetermined[
          Math.floor(Math.random() * props.preDetermined.length)
        ];
      setCurrentPlayer(randomPlayer);
      const randomNumber = Math.random();
      // const randomNumber = 9;
      finishSound.play();

      if (!firstTask) {
        setFirstTask(true);
      }

      if (hideEverybody) {
        setHideEverybody(false);
      }

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
        setHideEverybody(true);
      } else if (randomNumber < 0.2) {
        setCurrentTask("Everybody drinks!");
        setHideEverybody(true);
        if (randomNumber < 0.1 && props.wildcards.length > 0) {
          setCurrentTask(`Everyone, ${randomWildcard}`);
        }
      } else if (props.wildcards == 0) {
        if (props.players.length > 0) {
          setCurrentTask(`${randomPlayer}, drink!`);
        } else {
          setCurrentTask("Everybody drinks!");
          setHideEverybody(true);
        }
      }
      console.log(randomNumber);
    };

    // Game loop
    if (!gamePaused) {
      if (props.gameRunning) {
        setTimeout(() => {
          if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
          } else {
            showTask();
            if (minutesLeft > 0) {
              setMinutesLeft(minutesLeft - 1);
              setTimeLeft(initialTime);
            } else {
              props.setGameRunning(false);
              setTimeLeft(initialTime);
              setCurrentTask("Game over!");
              setFirstTask(false);
              if (props.unlimitedMode) {
                setMinutesLeft(999999);
              } else {
                setMinutesLeft(initialMinutes);
              }
            }
          }
        }, 1000);
      } else {
        if (props.unlimitedMode) {
          setUnlimitedMode("???");
          setMinutesLeft(999999);
        } else {
          setUnlimitedMode(initialMinutes);
          setMinutesLeft(initialMinutes);
        }
      }
    }
  }, [
    timeLeft,
    props.gameRunning,
    props.unlimitedMode,
    gamePaused,
    props.minutes,
  ]);

  const startGame = () => {
    props.setGameRunning(true);
  };

  const stopGame = () => {
    props.setGameRunning(false);
    setGamePaused(false);
    setTimeLeft(initialTime);
    setMinutesLeft(initialMinutes);
    setFirstTask(false);
  };

  const pauseGame = () => {
    setGamePaused(!gamePaused);
  };

  return (
    <div className="game">
      <Title order={1} className="game-header">
        {firstTask ? (
          <>
            {hideEverybody ? (
              <>{currentTask}</>
            ) : (
              <>
                Everybody drinks and <br />
                {currentTask}
              </>
            )}
          </>
        ) : (
          <>Better Power Hour</>
        )}
      </Title>
      <div className="timer">
        <div className="blobs">
          <div
            className="tk-blob "
            style={{ "--fill": "#7E6AFCbb", "--amount": 15, "--time": "50s" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 317.5 353.7">
              <path d="M291.8 55.3c30.4 39.9 30.7 102 17 160.4-13.8 58.3-41.6 112.9-84 130.9s-99.3-.6-137-30C50.2 287.1 32 246.9 17 200.5 2.1 154.1-9.6 101.4 11.5 63.6 32.6 25.8 86.6 2.8 143.8.2c57.2-2.6 117.6 15.2 148 55.1z"></path>
            </svg>
          </div>
          <div
            className="tk-blob reverse"
            style={{ "--fill": "#7E6AFCbb", "--amount": 10, "--time": "40s" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274 303.2">
              <path d="M260.2 41.4c20 29.2 14.6 74.5 7.2 124.4-7.3 49.9-16.6 104.5-49.2 126-32.5 21.6-88.4 10.2-132-15.2s-75-64.7-83.6-107.8C-6.1 125.7 8 79 36.3 47.8 64.5 16.7 107 1.3 150.9.1c43.9-1.1 89.3 12 109.3 41.3z"></path>
            </svg>
          </div>
          <div
            className="tk-blob "
            style={{ "--fill": "#7E6AFCbb", "--amount": 5, "--time": "30s" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 317.5 353.7">
              <path d="M291.8 55.3c30.4 39.9 30.7 102 17 160.4-13.8 58.3-41.6 112.9-84 130.9s-99.3-.6-137-30C50.2 287.1 32 246.9 17 200.5 2.1 154.1-9.6 101.4 11.5 63.6 32.6 25.8 86.6 2.8 143.8.2c57.2-2.6 117.6 15.2 148 55.1z"></path>
            </svg>
          </div>
          <div
            className="tk-blob reverse"
            style={{ "--fill": "#7E6AFCbb", "--amount": 3, "--time": "10s" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274 303.2">
              <path d="M260.2 41.4c20 29.2 14.6 74.5 7.2 124.4-7.3 49.9-16.6 104.5-49.2 126-32.5 21.6-88.4 10.2-132-15.2s-75-64.7-83.6-107.8C-6.1 125.7 8 79 36.3 47.8 64.5 16.7 107 1.3 150.9.1c43.9-1.1 89.3 12 109.3 41.3z"></path>
            </svg>
          </div>
          <div
            className="tk-blob "
            style={{ "--fill": "#7E6AFCbb", "--amount": 7, "--time": "20s" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 317.5 353.7">
              <path d="M291.8 55.3c30.4 39.9 30.7 102 17 160.4-13.8 58.3-41.6 112.9-84 130.9s-99.3-.6-137-30C50.2 287.1 32 246.9 17 200.5 2.1 154.1-9.6 101.4 11.5 63.6 32.6 25.8 86.6 2.8 143.8.2c57.2-2.6 117.6 15.2 148 55.1z"></path>
            </svg>
          </div>
        </div>
        {/* <div class="tk-blob" style="--fill: #009688;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 317.5 353.7">
            <path d="M291.8 55.3c30.4 39.9 30.7 102 17 160.4-13.8 58.3-41.6 112.9-84 130.9s-99.3-.6-137-30C50.2 287.1 32 246.9 17 200.5 2.1 154.1-9.6 101.4 11.5 63.6 32.6 25.8 86.6 2.8 143.8.2c57.2-2.6 117.6 15.2 148 55.1z"></path>
          </svg>
        </div> */}
        <div className="countdown">
          <p className="countdown-seconds">{timeLeft}</p>
          <p className="countdown-left">
            {props.unlimitedMode
              ? `${999999 - minutesLeft}/${unlimitedMode}`
              : `${initialMinutes - minutesLeft}/${unlimitedMode}`}
          </p>
        </div>
      </div>
      <div className="buttons">
        <Tooltip label={props.gameRunning ? "Stop game" : "Start game"}>
          <Button
            style={{
              height: "3rem",
              width: "3rem",
              margin: "auto",
              padding: "0.5rem",
            }}
            onClick={props.gameRunning ? () => stopGame() : () => startGame()}
          >
            {props.gameRunning ? <PlayerStop /> : <PlayerPlay />}
          </Button>
        </Tooltip>
        {props.gameRunning && (
          <Tooltip label={gamePaused ? "Resume game" : "Pause game"}>
            <Button
              style={{
                height: "3rem",
                width: "3rem",
                margin: "auto",
                padding: "0.5rem",
              }}
              onClick={() => pauseGame()}
            >
              {gamePaused ? <PlayerPlay /> : <PlayerPause />}
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Game;
