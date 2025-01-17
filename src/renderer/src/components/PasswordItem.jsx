import { FaRegCopy } from 'react-icons/fa6'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'

function PasswordItem({ password, setPasswords, passwords, index }) {
  const [copiedField, setCopiedField] = useState('') // Track which field is copied
  const [showDialog, setShowDialog] = useState(false) // Manage dialog visibility

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this password?')
    if (confirmed) {
      setPasswords((prevPasswords) => prevPasswords.filter((_, i) => i !== index))
    }
  }

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(''), 2000) // Reset the copied state after 2 seconds
    })
  }

  const showPasswordDetails = () => {
    setShowDialog(true)
  }

  const closeDialog = () => {
    setShowDialog(false)
  }

  return (
    <div>
      <div className="password-item">
        {/* Website Name */}
        <div>
          <p className="website-name" onClick={showPasswordDetails}>
            {password.website}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="actions">
          {/* Copy Username */}
          <div className="copy-container">
            <span className="label">Username:</span>
            <button
              onClick={() => handleCopy(password.username, 'Username')}
              className={`copy-btn ${copiedField === 'Username' ? 'copied' : ''}`}
            >
              <FaRegCopy />
            </button>
          </div>

          {/* Copy Password */}
          <div className="copy-container">
            <span className="label">Password:</span>
            <button
              onClick={() => handleCopy(password.password, 'Password')}
              className={`copy-btn ${copiedField === 'Password' ? 'copied' : ''}`}
            >
              <FaRegCopy />
            </button>
          </div>

          {/* Delete Button */}
          <button onClick={handleDelete} className="delete-btn">
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2 className="dialog-title">Details for {password.website}</h2>
            <p>
              <strong>Username:</strong> {password.username}
            </p>
            <p>
              <strong>Password:</strong> {password.password}
            </p>
            <p>
              <strong>Total Passwords Saved:</strong> {passwords.length}
            </p>
            <button onClick={closeDialog} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PasswordItem
