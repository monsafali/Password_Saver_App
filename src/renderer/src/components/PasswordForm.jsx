import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'

function PasswordForm({ setPasswords, hideForm, passwords }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => {
    // Calculate new ID based on the highest current ID in passwords
    const newId = passwords.length > 0 ? Math.max(...passwords.map((p) => p.id)) + 1 : 1
    const newPassword = { id: newId, ...data }

    console.log('New Password:', newPassword) // Debugging log to check newPassword

    // Use functional update to ensure we have the latest state when adding
    setPasswords((prevPasswords) => {
      console.log('Prev Passwords:', prevPasswords) // Debugging log to check prevPasswords
      return [...prevPasswords, newPassword]
    })

    // Reset form and hide the form after submission
    reset()
    hideForm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {/* Fields for Website, Username, and Password */}
      <div className="form-group">
        <label htmlFor="website" className="form-label">
          Website
        </label>
        <input
          id="website"
          type="text"
          placeholder="Enter a website link"
          {...register('website', { required: 'Website is required' })}
          className="form-input"
        />
        {errors.website && <p className="form-error">{errors.website.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter a username"
          {...register('username', { required: 'Username is required' })}
          className="form-input"
        />
        {errors.username && <p className="form-error">{errors.username.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="password-container">
          <input
            id="password"
            placeholder="Enter a password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required'
            })}
            className="form-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>
        {errors.password && <p className="form-error">{errors.password.message}</p>}
      </div>

      <div className="form-actions">
        <button type="submit" className="form-button">
          Save Password
        </button>
      </div>
    </form>
  )
}

export default PasswordForm
