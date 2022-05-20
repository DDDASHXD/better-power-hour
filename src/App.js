import './style/main.scss';
import Options from './components/options';
import Players from './components/players';
import Game from './components/game';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Options />
        <Game />
        <Players />
      </div>
    </div>
  );
}

export default App;
