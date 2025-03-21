import { Outlet, Link } from 'react-router'
import CrownLogo from '../../assets/crown.svg'
import './navigation.styles.css'

const Navigation = () => {
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
          <Link className='nav-link' to='/sign-in'>
            SIGN IN
          </Link>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation