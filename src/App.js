import React, {useEffect, useState} from 'react';
import './style/main.scss';

import Options from './components/options';
import Players from './components/players';
import Game from './components/game';

function App() {
  const [wildcards, setWildcards] = useState(["Drink double", "Drink x4", "Do a handstand", "Hug the player to your right", "Take off a peice of clothing"]);
  const [players, setPlayers] = useState(["Benny", "Børge"]);
  const [preDetermined, setPredetermined] = useState(["Everybody drinks!", "Everybody downs their drinks!"])
  const [unlimitedMode, setUnlimitedMode] = useState(false);
  const [downDrinks, setDownDrinks] = useState(true);
  return (
    <div className="App">
      <div className="wrapper">
        <Options wildcards={wildcards} setWildcards={(wildcard) => setWildcards(wildcard)} unlimitedMode={unlimitedMode} setUnlimitedMode={(bool) => setUnlimitedMode(bool)} downDrinks={downDrinks} setDownDrinks={(bool) => setDownDrinks(bool)}/>
        <Game players={players} wildcards={wildcards} preDetermined={preDetermined} unlimitedMode={unlimitedMode} downDrinks={downDrinks}/>
        <Players players={players} setPlayers={(player) => setPlayers(player)}/>
      </div>
    </div>
  );
}

export default App;
