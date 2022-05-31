import React, { useEffect, useState } from "react";
import {
  Title,
  Switch,
  TextInput,
  ActionIcon,
  Table,
  ScrollArea,
  NumberInput,
  Tooltip,
} from "@mantine/core";
import { Trash, Pencil, Plus, Tool } from "tabler-icons-react";
import "../style/options.scss";

const Options = (props) => {
  const [newWildcard, setNewWildcard] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [gameRunning, setGameRunning] = useState(true);

  useEffect(() => {
    if (fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    if (props.gameRunning) {
      setGameRunning(true);
    } else {
      setGameRunning(false);
    }
    console.log(props.gameRunning);
  }, [fullscreen, props.gameRunning]);

  return (
    <ScrollArea className="options panel">
      <div className="panel-header">
        <Title order={2} className="options-title">
          Options
        </Title>
      </div>
      <div className="options-list">
        {gameRunning ? (
          <></>
        ) : (
          <Tooltip label="Should the game last forever?">
            <div className="option">
              <p>Unlimited mode</p>
              <Switch
                checked={props.unlimitedMode}
                onChange={(event) =>
                  props.setUnlimitedMode(event.target.checked)
                }
              />
            </div>
          </Tooltip>
        )}
        <Tooltip label="Fullscreen mode">
          <div className="option">
            <p>Fullscreen</p>
            <Switch onChange={(event) => setFullscreen(event.target.checked)} />
          </div>
        </Tooltip>
        <Tooltip label="Should a down drink wildcard appear? (10% chance)">
          <div className="option">
            <p>Down drinks</p>
            <Switch
              checked={props.downDrinks}
              onChange={(event) => props.setDownDrinks(event.target.checked)}
            />
          </div>
        </Tooltip>
        <Tooltip label="How long should the game last in minutes?">
          <div className="option">
            <p>Minutes</p>
            <NumberInput
              value={props.minutes}
              onChange={(val) => props.setMinutes(val)}
              placeholder="default: 60"
            />
          </div>
        </Tooltip>
      </div>
      <div className="panel-header">
        <Title order={2} className="options-title">
          Tasks
        </Title>
      </div>
      <div className="wildcards">
        <div className="input-wrapper">
          <TextInput
            placeholder="Enter new task..."
            onChange={(event) => setNewWildcard(event.target.value)}
            value={newWildcard}
            onKeyUp={(event) => {
              if (event.code === "Enter") {
                props.setWildcards([...props.wildcards, newWildcard]);
                setNewWildcard("");
              }
            }}
          />
          <ActionIcon
            style={{ width: "40px", height: "100%" }}
            variant="filled"
            color="blue"
            onClick={() => {
              if (
                newWildcard.length > 0 &&
                !props.wildcards.includes(newWildcard)
              ) {
                props.setWildcards([...props.wildcards, newWildcard]);
                setNewWildcard("");
              }
            }}
          >
            <Plus size={33} />
          </ActionIcon>
        </div>
        <div className="wildcards-list">
          <Table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.wildcards.map((wildcard, index) => (
                <tr key={index}>
                  <td>{wildcard}</td>
                  <td className="actions">
                    <Tooltip label="Delete task">
                      <ActionIcon
                        variant="filled"
                        color="red"
                        onClick={() => {
                          props.setWildcards(
                            props.wildcards.filter((w, i) => i !== index)
                          );
                        }}
                      >
                        <Trash size={20} />
                      </ActionIcon>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Options;
