import React, { useEffect, useState } from "react";
import {
  Title,
  Switch,
  TextInput,
  ActionIcon,
  Table,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import { Plus, Trash } from "tabler-icons-react";

const Players = (props) => {
  const [newPlayer, setNewPlayer] = useState("");
  return (
    <ScrollArea className="players panel">
      <div className="panel-header">
        <Title order={2}>Players</Title>
      </div>
      <div className="input-wrapper">
        <TextInput
          placeholder="Enter new player..."
          onChange={(event) => setNewPlayer(event.target.value)}
          value={newPlayer}
        />
        <ActionIcon
          style={{ width: "40px", height: "100%" }}
          variant="filled"
          color="blue"
          onClick={() => {
            if (newPlayer.length > 0 && !props.players.includes(newPlayer)) {
              props.setPlayers([...props.players, newPlayer]);
              setNewPlayer("");
            }
          }}
        >
          <Plus size={33} />
        </ActionIcon>
      </div>
      <div className="players-list">
        <Table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.players.map((player, index) => (
              <tr key={index}>
                <td>{player}</td>
                <td>
                  <Tooltip label="Delete player">
                    <ActionIcon
                      variant="filled"
                      color="red"
                      onClick={() => {
                        props.setPlayers(
                          props.players.filter((p) => p !== player)
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
    </ScrollArea>
  );
};

export default Players;
