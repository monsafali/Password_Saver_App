import PasswordItem from './PasswordItem'
import { useState, useEffect } from 'react'

function PasswordList({ passwords, setPasswords }) {
  const [search, setSearch] = useState('')

  // Filtered passwords based on search query
  const filteredPasswords = passwords.filter((password) =>
    password.website.toLowerCase().includes(search.toLowerCase())
  )

  // Save passwords to file whenever the list changes
  useEffect(() => {
    const savePasswords = async () => {
      try {
        const response = await fetch('./passwords.json', {
          method: 'PUT', // Simulated file write
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(passwords)
        })

        if (!response.ok) {
          throw new Error('Failed to save passwords.')
        }
      } catch (error) {
        console.error('Error saving passwords:', error)
      }
    }

    if (passwords.length > 0) {
      savePasswords()
    }
  }, [passwords])

  return (
    <div className="password-list-container">
      {/* Search Input and Buttons */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search your password"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Scrollable Password List */}
      <div
        className="password-list"
        style={{
          maxHeight: '500px' // 3 items * estimated height of 84px per item
        }}
      >
        {filteredPasswords.map((password, index) => (
          <PasswordItem
            key={index}
            password={password}
            setPasswords={setPasswords}
            passwords={passwords}
            index={index}
          />
        ))}

        {/* If no results are found */}
        {filteredPasswords.length === 0 && (
          <p className="no-results">No matching passwords found.</p>
        )}
      </div>
    </div>
  )
}

export default PasswordList
