import React, { useState } from 'react'
import PasswordForm from './PasswordForm'

function NewPass({ setPasswords }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <button className="bg-red-400 p-4 rounded-full w-full" onClick={() => setShowForm(true)}>
        Add New Password
      </button>
      {showForm && <PasswordForm setPasswords={setPasswords} hideForm={() => setShowForm(false)} />}
    </div>
  )
}

export default NewPass
