import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className='loginContainer'>
        <h1>Sign In</h1>
        <form>
            <label>Email</label>
            <input name='email' type='email' />
            <label>Password</label>
            <input name='password' type='password' />
            <button>Login</button>
            <p>you dont have an account yet ? come and <span>Sign Up</span></p>
        </form>
    </div>
  )
}

export default Login