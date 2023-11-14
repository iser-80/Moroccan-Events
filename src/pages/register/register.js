import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  const [chosen, setChosen] = useState(true)

  return (
    <div className='registerContainer'>
        <h1>Sign Up <span className='sign'>{chosen ? 'User' : 'Organization'}</span></h1>
        <form>
            <div className='formHeader'>
              <h2 onClick={() => setChosen(true)} className={chosen ? 'chosen' : 'notChosen'} >User</h2>
              <h2 onClick={() => setChosen(false)} className={!chosen ? 'chosen' : 'notChosen'}>Organization</h2>
            </div>
            <hr></hr>
            {chosen ? 
            <>
              <label>Full-Name</label>
              <input name='fname' type='text' />
              <label>Email</label>
              <input name='email' type='email' />
              <label>Phone Number</label>
              <input name='phone' type='Number' />
              <label>Password</label>
              <input name='password' type='password' /> 
              <button>Register</button>
              <p>you dont have an account yet ? come and <Link className='link' to='/login'>Sign In</Link></p>
            </>
            :
            <>
              <label>Name</label>
              <input name='name' type='text' />
              <label>Descirption</label>
              <textarea name='description' type='text' rows={2}></textarea>
              <label>Password</label>
              <input name='password' type='password' />
              <button>Register</button>
              <p>you dont have an account yet ? come and <Link className='link' to='/login'>Sign In</Link></p>
            </>
            }
        </form>
    </div>
  )
}

export default Register