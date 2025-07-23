import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DetailView from './routes/DetailView'
import Layout from './routes/Layout'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
        </Route>
        <Route path="/recipeDetails/:id" element={<DetailView />} />
    </Routes>
  </BrowserRouter>
)
