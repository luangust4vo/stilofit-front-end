import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './pages/cliente/index'
import Turma from './pages/turma/index'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Register />} />
        <Route path="/turma" element={<Turma />} />
      </Routes>
    </Router>
  )
}

export default App