import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterContract from './pages/contract/contract'
import Register from './pages/cliente/index'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register-contract' element={<RegisterContract/>} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App