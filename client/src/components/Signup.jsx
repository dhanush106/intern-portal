import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/api'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await signup(name, email)
      if (user && user._id) {
        navigate(`/dashboard/${user._id}`)
      } else if (user && user.msg) {
        setError(user.msg)
      } else {
        setError('Signup failed. Please try again.')
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg)
      } else {
        setError('Signup failed. Please try again.')
      }
    }
  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  )
}

export default Signup
