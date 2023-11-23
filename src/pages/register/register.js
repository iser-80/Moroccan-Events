import React, { useState } from 'react'
import styles from './register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userRegisterAsync } from '../../redux_toolkit/slices/api/userApiSlice'
import { organizationRegisterAsync } from '../../redux_toolkit/slices/api/organizationApiSlice'

const Register = () => {
  const [chosen, setChosen] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerSubmit = (e) => {
    e.preventDefault()

    if(chosen){ // user Register
      const response = dispatch(userRegisterAsync({name, email, phone, password}))
      if(response){
        navigate('/login')

        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
      }

    } // organization register
    else{
      const response = dispatch(organizationRegisterAsync({name, description, email, password}))
      if(response){
        navigate('/login')

        setName('')
        setDescription('')
        setEmail('')
        setPassword('')
      }
    }
  }

  return (
    <div className={styles.registerPageContainer}>
        <h1>Sign Up <span className={styles.registerPagesign}>{chosen ? styles.registerPageUser : styles.registerPageOrganization}</span></h1>
        <form onSubmit={registerSubmit}>
            <div className={styles.registerPageformHeader}>
              <h2 onClick={() => setChosen(true)} className={chosen ? styles.registerPagechosen : styles.registerPagenotChosen} >User</h2>
              <h2 onClick={() => setChosen(false)} className={!chosen ? styles.registerPagechosen : styles.registerPagenotChosen}>Organization</h2>
            </div>
            <hr></hr>
            {chosen ? 
            <>
              <label>Full-Name</label>
              <input onChange={(e) => setName(e.target.value)} name='name' type='text' />
              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} name='email' type='email' />
              <label>Phone Number</label>
              <input onChange={(e) => setPhone(e.target.value)} name='phone' type='Number' />
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} name='password' type='password' /> 

            </>
            :
            <>
              <label>Name</label>
              <input onChange={(e) => setName(e.target.value)} name='name' type='text' />
              <label>Descirption</label>
              <textarea onChange={(e) => setDescription(e.target.value)} name='description' type='text' rows={2}></textarea>
              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} name='email' type='email' />
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} name='password' type='password' />
            </>
            }
            <button type='submit'>Register</button>
            <p>you dont have an account yet ? come and <Link className={styles.registerPagelink} to='/login'>Sign In</Link></p>
        </form>
    </div>
  )
}

export default Register