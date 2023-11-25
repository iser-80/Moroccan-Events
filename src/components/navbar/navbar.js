import React, { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import { Button, Link } from 'react-scroll'
import { Router, Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { organizationLogout } from '../../redux_toolkit/slices/organizationSlice'
import { organizationGetOrganizationAsync, organizationLogoutAsync } from '../../redux_toolkit/slices/api/organizationApiSlice'
import { userGetUserAsync, userLogoutAsync } from '../../redux_toolkit/slices/api/userApiSlice'
import { userLogout } from '../../redux_toolkit/slices/userSlice'

const Navbar = () => {
    const [user, setUser] = useState({})
    const [organization, setOrganization] = useState({})

    const dispatch = useDispatch()

    //check if the org is logged in
    const orgIsAuthentificated = useSelector((state) => state.authOrganization)
    const userIsAuthentificated = useSelector((state) => state.authUser)

    useEffect(() => {
        const fetchData = async () => {
          if (orgIsAuthentificated.organizationInfo !== null) {
            const authOrganization = typeof orgIsAuthentificated.organizationInfo === 'string'
              ? JSON.parse(orgIsAuthentificated.organizationInfo)
              : orgIsAuthentificated.organizationInfo;

              setOrganization(authOrganization)
          } else {
            if (userIsAuthentificated.userInfo !== null) {
              const authUser = typeof userIsAuthentificated.userInfo === 'string'
                ? JSON.parse(userIsAuthentificated.userInfo)
                : userIsAuthentificated.userInfo;
      
              setUser(authUser);
            } else {
              console.log('no one is logged in');
            }
          }
        };
      
        fetchData();
      }, [orgIsAuthentificated, userIsAuthentificated]);
    
    useEffect(() => {
        console.log(user)
        console.log(organization)
    }, [user, organization])

    async function handleLogout() {
        try {
            if(userIsAuthentificated.userInfo !== null){
                const response = await dispatch(userLogoutAsync())
                if(response){
                    dispatch(userLogout())
                    console.log(userIsAuthentificated.userInfo)
                }else{
                    console.log('user logout failed')
                }
            }else{
                if(orgIsAuthentificated.organizationInfo !== null){
                    const response = await dispatch(organizationLogoutAsync());
                    if(response){
                        dispatch(organizationLogout());
                        console.log(orgIsAuthentificated.organizationInfo);                            
                    }
                    else{
                        console.log('organization lofout failed')
                    }
                }else{
                    console.log('both of organiation and user are null')
                }
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    }    

  return (
    <nav>
        <div className={styles.navbarContainer}>
            <div className={styles.navbarLogo}>
                FESTI-FLOW
            </div>
            <ul>
                <li>
                    <Link to="home" spy={true} smooth={true} duration={500} className={styles.navbarLink} >Home</Link>
                </li>
                <li>
                    <Link to="events" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >Events</Link>
                </li>
                <li>
                    <Link to="artists" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >Artists</Link>
                </li>
                <li>
                    <Link to="about" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >About</Link>
                </li>
                <li>
                    <Link to="sponsor" spy={true} smooth={true} duration={500} className={styles.navbarLink}  >Sponsors</Link>
                </li>
            </ul>
            <div className={styles.authentificationBtns}>
                {(userIsAuthentificated.userInfo !== null || orgIsAuthentificated.organizationInfo !== null) ?
                    <>
                        {userIsAuthentificated.userInfo !== null ?
                            <>
                                {user !== null ? ( // Add this check for username
                                <>
                                    <h1>Hi, {user.name}</h1>
                                    <Button onClick={handleLogout}>log out</Button>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                            </>
                        :
                            <>
                            {organization !== null ? (
                                <>
                                    <h1>Hi {organization.name}</h1>
                                    <Button onClick={handleLogout} >log out</Button>
                                </> 
                            ):(
                                <p>Loading...</p>
                            )}
                            </>
                    }
                    </>
                :
                    <>
                        <RouterLink to='/login' className={styles.authentificationBtn}>Login</RouterLink>
                        <RouterLink to='/register' className={styles.authentificationBtn}>Register</RouterLink>
                    </>
                }
            </div>
        </div>
    </nav>
  )
}

export default Navbar