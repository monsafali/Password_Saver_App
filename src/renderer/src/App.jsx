import { useState } from 'react'
import PasswordForm from './components/PasswordForm'
import PasswordList from './components/PasswordList'
import JsonPage from './components/JsonPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewPass from './components/NewPass'

function App() {
  const [passwords, setPasswords] = useState([])

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mx-auto p-4 max-w-[600px] bg-purple-100">
              <PasswordList passwords={passwords} setPasswords={setPasswords} />
              <NewPass setPasswords={setPasswords} />

              {/* <PasswordForm setPasswords={setPasswords} /> */}
            </div>
          }
        />
        <Route path="/json" element={<JsonPage />} />
      </Routes>
    </Router>
  )
}

export default App
