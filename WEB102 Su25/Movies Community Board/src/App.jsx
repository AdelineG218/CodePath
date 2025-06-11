import './App.css';
import Board from './components/Board';

const App = () => {

  return (
    <div className="App">
      <h1>Movies Community Board</h1>
      <h2>Check out this web app to find the newest movies and vote for your favorites!</h2>
      <Board />
    </div>
  )
}

export default App;