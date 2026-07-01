import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCoffees from './pages/ViewCoffees'
import EditCoffee from './pages/EditCoffee'
import CreateCoffees from './pages/CreateCoffee'
import CoffeeDetails from './pages/CoffeeDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/create',
      element: <CreateCoffees title='BARISTA HELPER | Customize' />
    },
    {
      path:'/',
      element: <ViewCoffees title='BARISTA HELPER | Custom Coffees' />
    },
    {
      path: '/coffee/:id',
      element: <CoffeeDetails title='BARISTA HELPER | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCoffee title='BARISTA HELPER | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App