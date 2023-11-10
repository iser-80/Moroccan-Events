import React from 'react'
import './register.css'

const Register = () => {
  return (
    <div className='registerContainer'>
        <h1>Sign Up</h1>
        <form>
            <label>Email</label>
            <input name='email' type='email' />
            <label>Password</label>
            <input name='password' type='password' />
            <button>Register</button>
            <p>you dont have an account yet ? come and <span>Sign In</span></p>
        </form>
    </div>
  )
}

export default Register