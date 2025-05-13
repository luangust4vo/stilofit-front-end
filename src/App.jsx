import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterContract from './pages/contract/contract'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register-contract' element={<RegisterContract/>} />
      </Routes>
    </Router>
  )
}

export default App