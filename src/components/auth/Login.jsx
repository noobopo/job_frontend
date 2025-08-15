import { useContext, useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom';
import { API_END_POINT } from '../../utils/constant';
import axios from 'axios'
import toast from 'react-hot-toast';
import context from '@/context/AppContext';

const Login = () => {
  const {user}= useContext(context)
  const { loading, setLoading } = useContext(context)
  const { setUser } = useContext(context)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${API_END_POINT}/user/login`, { email, password, role }, { withCredentials: true })
      if (res.data.success) {
        setUser(res.data.user)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }


  useEffect(()=>{
    if (user) {
      navigate('/')
    }
  },[])

  return (
    <div className='flex justify-center items-center'>
      <form
        onSubmit={submitHandler}
        className='w-full md:w-2xl mt-0 md:mt-10 md:shadow p-5 md:p-8 rounded-md'
      >
        <h1 className='font-bold text-2xl mb-5'>Log In</h1>

        <div className='flex flex-col gap-2 md:gap-3'>
          <Label htmlFor="email" className='ml-1.5'>Email</Label>
          <Input
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder="Enter Your Email"
          />

          <Label htmlFor="password" className='ml-1.5'>Password</Label>
          <Input
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder="Enter Your Password"
          />

          <div className='flex items-center gap-2'>
            <input
              id="student"
              required
              type="radio"
              name='role'
              value="student"
              checked={role === 'student'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="student">Student</label>

            <input
              id="recruiter"
              required
              type="radio"
              name='role'
              value="recruiter"
              checked={role === 'recruiter'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="recruiter">Recruiter</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className='bg-orange-400 hover:bg-orange-500 text-white flex justify-center items-center rounded my-2 py-1.5 disabled:opacity-50'
          >
            {loading ? (<div className=' h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>) : ("Log In")}
          </button>
        </div>

        <h1>
          Don't have an account?
          <Link to='/signup' className='ml-2 text-blue-500 underline'>Sign up</Link>
        </h1>
      </form>
    </div>
  )
}

export default Login
