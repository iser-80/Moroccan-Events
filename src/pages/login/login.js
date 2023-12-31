import React, { useEffect, useState } from 'react'
import styles from './login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAsync } from '../../redux_toolkit/slices/api/userApiSlice'
import { setUserCredentials } from '../../redux_toolkit/slices/userSlice'
import { setOrganizationCredentials } from '../../redux_toolkit/slices/organizationSlice'
import { organizationLoginAsync, organizationRegisterAsync } from '../../redux_toolkit/slices/api/organizationApiSlice'
 
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [chosen, setChosen] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleOnSubmit = async (e) => {
    e.preventDefault()

    // user authentification
    if(chosen === true){
      const response = await dispatch(userLoginAsync({email, password}))
      if(response && response.payload){
        dispatch(setUserCredentials(response.payload))
        dispatch(setOrganizationCredentials(null))
        navigate('/')
        setEmail('')
        setPassword('')
      }
    }
    // organization authentification
    else {
      const response = await dispatch(organizationLoginAsync({ email, password }));

      if (response && response.payload) {
        console.log(response);
        dispatch(setOrganizationCredentials(response.payload)); // Directly pass the response
        dispatch(setUserCredentials(null));
        navigate('/');
        setEmail('');
        setPassword('');
      } else {
        // Handle login failure, show an error message or redirect to login page
        console.error('Login failed:', response);
      }
      
    }
  }

  return (
    <div className={styles.loginPageContainer}>
        <h1>Sign In</h1>
        <div className={styles.chose}>
          <h2 onClick={() => setChosen(true)} className={chosen ? styles.loginPagechosen : styles.loginPagenotChosen}>user</h2>
          <h2 onClick={() => setChosen(false)} className={chosen ? styles.loginPagenotChosen : styles.loginPagechosen}>organization</h2>
        </div>
        <form onSubmit={handleOnSubmit}>
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} name='email' type='email' />
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} name='password' type='password' />
            <button type='submit'>Login</button>
            <p>you dont have an account yet ? come and <Link className={styles.link} to='/register'>Sign Up</Link></p>
        </form>
    </div>
  )
}

export default Login