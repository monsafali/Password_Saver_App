import PasswordItem from './PasswordItem'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function PasswordList({ passwords, setPasswords }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  // Filtered passwords based on search query
  const filteredPasswords = passwords.filter((password) =>
    password.website.toLowerCase().includes(search.toLowerCase())
  )

  const showPasswordsInJson = () => {
    navigate('/json', { state: { passwords } })
  }

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
    <div className="p-4">
      {/* Search Input and Buttons */}
      <div className="flex items-center mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search your password"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full border border-blue-400 rounded-md p-2"
        />
        {/* <button
          onClick={showPasswordsInJson}
          className="w-48 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Show Passwords
        </button> */}
      </div>

      {/* Scrollable Password List */}
      <div
        className="space-y-4 overflow-y-auto"
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
          <p className="text-gray-500 text-center mt-4">No matching passwords found.</p>
        )}
      </div>
    </div>
  )
}

export default PasswordList
