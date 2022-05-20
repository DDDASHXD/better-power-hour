import React, {useEffect, useState} from 'react';
import './style/main.scss';

import Options from './components/options';
import Players from './components/players';
import Game from './components/game';

function App() {
  const [wildcards, setWildcards] = useState(["Drink double", "Drink x4", "Do a handstand", "Some other wildcard", "idk"]);
  const [players, setPlayers] = useState(["Banny", "Børge"]);
  return (
    <div className="App">
      <div className="wrapper">
        <Options wildcards={wildcards} setWildcards={(wildcard) => setWildcards(wildcard)}/>
        <Game />
        <Players players={players} setPlayers={(player) => setPlayers(player)}/>
      </div>
    </div>
  );
}

export default App;
