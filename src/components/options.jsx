import React, { useEffect, useState } from "react";
import {
  Title,
  Switch,
  TextInput,
  ActionIcon,
  Table,
  ScrollArea,
} from "@mantine/core";
import { Trash, Pencil, Plus } from "tabler-icons-react";
import "../style/options.scss";

const Options = (props) => {
  const [newWildcard, setNewWildcard] = useState("");

  return (
    <ScrollArea className="options panel">
      <div className="panel-header">
        <Title order={2} className="options-title">
          Options
        </Title>
      </div>
      <div className="options-list">
        <div className="option">
          <p>Unlimited mode</p>
          <Switch />
        </div>
        <div className="option">
          <p>Fullscreen</p>
          <Switch />
        </div>
      </div>
      <div className="panel-header">
        <Title order={2} className="options-title">
          Wildcards
        </Title>
      </div>
      <div className="wildcards">
        <div className="input-wrapper">
          <TextInput
            placeholder="Enter new wildcard..."
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
              props.setWildcards([...props.wildcards, newWildcard]);
              setNewWildcard("");
            }}
          >
            <Plus size={33} />
          </ActionIcon>
        </div>
        <div className="wildcards-list">
          <Table>
            <thead>
              <tr>
                <th>Wildcard</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.wildcards.map((wildcard, index) => (
                <tr key={index}>
                  <td>{wildcard}</td>
                  <td className="actions">
                    <ActionIcon color="blue">
                      <Pencil size={20} />
                    </ActionIcon>
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
