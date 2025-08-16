import './App.css'
import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'
import Details from './pages/Details'
import { Link } from 'react-router-dom'

function App() {
  let element = useRoutes([
    { path: "/",
      element:<Home />},
    { path: "/new",
      element:<Create />},
    { path: "/creator/:id",
      element:<Details />},
    { path: "/creator/:id/edit",
      element:<Edit />}
  ]);
  console.log("loaded")

  return (
    <div className="App">
      <div className="Header">
        <h1>Creatorverse</h1>
        <Link to="/"><button className="headerBtn"> Explore Creators 👽  </button></Link>
        <Link to="/new"><button className="headerBtn"> Add Creator 👻 </button></Link>
      </div>
      <div className="Main">
        {element}
      </div>
    </div>
  )
}

export default App
