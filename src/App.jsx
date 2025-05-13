import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterContract from './pages/contract/contract'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register-contracts' element={<RegisterContractrContract/>} />
      </Routes>
    </Router>
  )
}

export default App