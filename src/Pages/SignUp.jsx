import React from 'react'
import { useState } from 'react'

function SignUp() {
  const [ email, setEmail] = useState("")
  const [ usarname, setUsarname] = useState("")
  const [ password, setPassword] = useState("")
  const [ confirmPassword, setConfirmPassword] = useState("")
  const [ isLoading, setLoading] = useState(false)
  const [ error, setError] = useState(null)
  const [ success, setSuccess] = useState(false)

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-6'>
      <div className='max-w-md '>
        <div>
          <h1>Create Account</h1>
          <p>join communty  and start shering your ideas</p>
        </div>
        {/* info */}
        <div className='bg-white rounded-lg shadow-md p-7'>
          <form >

          </form>

        </div>
      </div>
      
    </div>
  )
}

export default SignUp
