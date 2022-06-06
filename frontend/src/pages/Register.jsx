import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  const { name, email, password, password2 } = formData

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
  },[isError, isSuccess, message, navigate, dispatch, user])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))

  }

  const onSubmit =  (e) => {
    e.preventDefault()
    
    if(!name || !email || !password || !password2){

      toast.error("Please include all fields")
      return

    }else if(password !== password2){

      toast.error("Password not match")
      return

    }else {

      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
      
    }
  }


  return (
    <>
    <section className="heading">
     <h1>
       <FaUser />Register
     </h1>
     <p>Please create an account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" onChange={onChange} value={name} name='name' id='name' placeholder='Please enter your name' />
        </div>
        <div className="form-group">
          <input type="email" className="form-control" onChange={onChange} value={email} name='email' id='email' placeholder='Please enter your email address' />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" onChange={onChange} value={password} name='password' id='password' placeholder='Please enter your password' />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" onChange={onChange} value={password2} name='password2' id='password2' placeholder='Confirm password' />
        </div>
        <div className="form-group">
          <button type="submit" className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}
export default Register