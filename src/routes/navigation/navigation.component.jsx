import { useContext } from 'react'
import { Outlet, Link } from 'react-router'
import CrownLogo from '../../assets/crown.svg'
import './navigation.styles.css'
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {
  const {currentUser, setCurrentUser } = useContext(UserContext)

  const signOutHandler = async() => {
    await signOutUser()
    setCurrentUser(null)
  }

  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <img src={CrownLogo} />
        </Link>
        <nav className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? (
              <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
            ) : (
              <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
            )
          }
        </nav>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation