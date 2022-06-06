import { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData
  const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())

  },[isError, isSuccess, message, user, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))

  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if(!email || !password){
      toast.error('Please include all fields')
      return
    }else {
      const userData = {
        email,
        password
      }
      dispatch(login(userData))
    }
  }



  return (
    <>
    <section className="heading">
     <h1>
       <FaSignInAlt /> Login
     </h1>
     <p>Please login your account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit} >
        <div className="form-group">
          <input type="email" className="form-control" onChange={onChange} value={email} name='email' id='email' placeholder='Please enter your email' />
          <input type="password" className="form-control" onChange={onChange} value={password} name='password' id='password' placeholder='Please enter your password' />
          <button type="submit" className="btn btn-block">Login</button>
        </div>
      </form>
    </section>
    </>
  )
}
export default Login