import { useState, useEffect } from 'react'
import PasswordList from './components/PasswordList'
import NewPass from './components/NewPass'

import '../src/assets/index.css'

function App() {
  const [passwords, setPasswords] = useState([])

  return (
    <div className="container">
      <PasswordList passwords={passwords} setPasswords={setPasswords} />
      <NewPass setPasswords={setPasswords} passwords={passwords} />
    </div>
  )
}

export default App
