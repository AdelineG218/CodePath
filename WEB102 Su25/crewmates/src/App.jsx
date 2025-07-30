import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'


const App = () => {
  const crewmates = [
      {'id':'1', 
      'name': 'George',
      'speed': '5', 
      'strength': '8'},
      {'id':'2', 
      'name': 'Larry',
      'speed': '1', 
      'strength': '10'},
      {'id':'3', 
      'name': 'Samantha',
      'speed': '6', 
      'strength': '4'},
      {'id':'4', 
      'name': 'Patricia',
      'speed': '7', 
      'strength': '7'},
  ]


  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={crewmates}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={crewmates} />
    },
    {
      path:"/new",
      element: <CreatePost />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>Crewmates</h1>
        <Link to="/"><button className="headerBtn"> Explore Crewmates 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> Add New Crewmates 🏆 </button></Link>
      </div>
        {element}
    </div>

  )
}

export default App
