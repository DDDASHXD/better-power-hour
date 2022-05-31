import React, {useEffect, useState} from 'react';
import './style/main.scss';

import Options from './components/options';
import Players from './components/players';
import Game from './components/game';

function App() {
  const [gameRunning, setGameRunning] = useState(false);
  const [wildcards, setWildcards] = useState(["Drink double", "Drink x4", "Down your drink", "Give out a drink", "Slap (player)'s ass", "Take a shot with (player)"]);
  const [players, setPlayers] = useState(["Alex", "John", "All females", "All males"]);
  const [preDetermined, setPredetermined] = useState(["Everybody drinks!", "Everybody downs their drinks!"])
  const [unlimitedMode, setUnlimitedMode] = useState(false);
  const [downDrinks, setDownDrinks] = useState(true);
  const [minutes, setMinutes] = useState("");
  return (
    <div className="App">
      <div className="wrapper">
        <Options minutes={minutes} setMinutes={(min) => setMinutes(min)} wildcards={wildcards} setWildcards={(wildcard) => setWildcards(wildcard)} unlimitedMode={unlimitedMode} setUnlimitedMode={(bool) => setUnlimitedMode(bool)} downDrinks={downDrinks} setDownDrinks={(bool) => setDownDrinks(bool)} gameRunning={gameRunning}/>
        <Game setUnlimitedMode={(bool) => setUnlimitedMode(bool)} minutes={minutes} players={players} wildcards={wildcards} preDetermined={preDetermined} unlimitedMode={unlimitedMode} downDrinks={downDrinks} gameRunning={gameRunning} setGameRunning={(bool) => setGameRunning(bool)} />
        <Players players={players} setPlayers={(player) => setPlayers(player)} />
      </div>
    </div>
  );
}

export default App;
