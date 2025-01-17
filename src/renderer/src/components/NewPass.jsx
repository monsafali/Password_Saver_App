import React, { useState } from 'react'
import PasswordForm from './PasswordForm'

function NewPass({ setPasswords, passwords }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <button className="custom-style" onClick={() => setShowForm(true)}>
        Add New Password
      </button>
      {showForm && (
        <PasswordForm
          setPasswords={setPasswords} // Pass down setPasswords function
          hideForm={() => setShowForm(false)} // Pass down hideForm function
          passwords={passwords} // Pass down the passwords array
        />
      )}
    </div>
  )
}

export default NewPass
