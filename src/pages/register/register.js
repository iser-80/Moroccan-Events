import React from 'react'
import './register.css'

const Register = () => {
  return (
    <div className='registerContainer'>
        <h1>Sign Up <span className='sign'>User</span></h1>
        <form>
            <div className='formHeader'>
              <h2>User</h2>
              <h2>Organization</h2>
            </div>
            <hr></hr>
            {/* <label>Full-Name</label>
            <input name='fname' type='text' />
            <label>Email</label>
            <input name='email' type='email' />
            <label>Phone Number</label>
            <input name='phone' type='Number' />
            <label>Password</label>
            <input name='password' type='password' /> */}
            <label>Name</label>
            <input name='name' type='text' />
            <label>Descirption</label>
            <textarea name='description' type='text' rows={2}></textarea>
            <label>Password</label>
            <input name='password' type='password' />
            <button>Register</button>
            <p>you dont have an account yet ? come and <span>Sign In</span></p>
        </form>
    </div>
  )
}

export default Register