import { useState, useEffect } from 'react'
// import PasswordForm from './components/PasswordForm'
import PasswordList from './components/PasswordList'
import JsonPage from './components/JsonPage'
import NewPass from './components/NewPass'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { openDB } from 'idb'

const DB_NAME = 'passwordManager'
const STORE_NAME = 'passwords'
function App() {
  const [passwords, setPasswords] = useState([])

  useEffect(() => {
    const initializeDB = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME) // No keyPath specified
          }
        }
      })

      // Fetch passwords from IndexedDB
      const savedPasswords = await db.getAll(STORE_NAME)
      setPasswords(savedPasswords || [])
    }

    initializeDB()
  }, [])

  // Save passwords to IndexedDB whenever the list changes
  useEffect(() => {
    const saveToDB = async () => {
      const db = await openDB(DB_NAME, 1)

      // Clear the existing store and write the updated list
      const tx = db.transaction(STORE_NAME, 'readwrite')
      await tx.objectStore(STORE_NAME).clear()

      passwords.forEach((password) => {
        tx.objectStore(STORE_NAME).add(password)
      })

      await tx.done
    }

    if (passwords.length > 0) {
      saveToDB()
    }
  }, [passwords])

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
