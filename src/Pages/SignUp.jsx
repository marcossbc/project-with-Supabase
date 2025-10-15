import React from 'react'
import { useState } from 'react'

function SignUp() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-6'>
      <div className='max-w-md w-full'>
        <div className='text-center mb-10'>
          <h1 className='text-3xl font-bold'>Create an Account</h1>
          <p className='text-gray-600 mt-2'>join our community and start sharing your ideas</p>
        </div>
        {/* info */}
        <div className='bg-white rounded-lg shadow-md p-7'>
          <form >
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
                <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="enter your name "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

          </form>

        </div>
      </div>

    </div>
  )
}

export default SignUp
