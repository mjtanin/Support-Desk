import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navegate = useNavigate()

  const onLogOut = (e) => {
    e.preventDefault()
    dispatch(logout())
    dispatch(reset())
    navegate('/')
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogOut}>
              <FaSignOutAlt />Logout
            </button>
          </li>
        ) : (
          <>
          <li>
            <Link to='/login'>
              <FaSignInAlt />Login
            </Link>
          </li>
          <li>
            <Link to='/register'>
              <FaUser />Register
            </Link>
          </li>
          </>
        )}
      </ul>
    </header>
  )
}
export default Header