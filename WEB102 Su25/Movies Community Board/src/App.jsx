import './App.css';
import Board from './components/Board';

const App = () => {

  return (
    <div className="App">
      <div className="Header">
        <div className="Header2">
          <div className="Header3">
            <h1>Movie Community Board 🎥🎞️</h1>
            <h3>Plan your next movie night with confidence with this list of the latest movie favorites!</h3>
          </div>
        </div>
      </div>
      <Board />
    </div>
  )
}

export default App;