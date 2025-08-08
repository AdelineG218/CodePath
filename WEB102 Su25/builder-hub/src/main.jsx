import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import EditPage from './routes/EditPage'
import BuildPage from './routes/BuildPage'
import Layout from './routes/Layout'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/build/:id" element={<BuildPage />} />
          <Route path="/build/:id/edit" element={<EditPage />} />
        </Route>
    </Routes>
  </BrowserRouter>
)
