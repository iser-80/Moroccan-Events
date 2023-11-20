import React, { useEffect, useState } from 'react'
import './login.css'
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

  const userInfo = useSelector((state) => state.authUser)
  const organizationInfo = useSelector((state) => state.authOrganization)


  // useEffect(() => {
  //   if(userInfo || organizationInfo){
  //     navigate('/')
  //   }
  // }, [userInfo, organizationInfo, navigate])

  const handleOnSubmit = (e) => {
    e.preventDefault()

    // user authentification
    if(chosen){
      const response = dispatch(userLoginAsync({email, password}))
      if(response){
        dispatch(setUserCredentials({email, password}))
        navigate('/')
        setEmail('')
        setPassword('')
      }
    }
    // organization authentification
    else {
       const response = dispatch(organizationLoginAsync({email, password}))
       if(response){
        dispatch(setOrganizationCredentials({email, password}))
        navigate('/')
        setEmail('')
        setPassword('')
       }
    }
  }

  return (
    <div className='loginContainer'>
        <h1>Sign In</h1>
        <div className='chose'>
          <h2 onClick={() => setChosen(true)} className={chosen ? 'chosen' : 'notChosen'}>user</h2>
          <h2 onClick={() => setChosen(false)} className={chosen ? 'notChosen' : 'chosen'}>organization</h2>
        </div>
        <form onSubmit={handleOnSubmit}>
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} name='email' type='email' />
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} name='password' type='password' />
            <button type='submit'>Login</button>
            <p>you dont have an account yet ? come and <Link className='link' to='/register'>Sign Up</Link></p>
        </form>
    </div>
  )
}

export default Login