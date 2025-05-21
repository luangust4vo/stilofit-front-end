import React from 'react'
import AppRoutes from './routes/AppRoutes'

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