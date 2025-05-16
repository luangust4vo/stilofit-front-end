import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './pages/cliente/index'
import DataCustomer from './pages/cliente/dataCustomer'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Register />} />
        <Route path="/cliente/:id" element={<DataCustomer />} />
      </Routes>
    </Router>
  )
}

export default App