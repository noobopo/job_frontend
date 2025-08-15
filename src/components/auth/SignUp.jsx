import React, { useContext, useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { API_END_POINT } from '../../utils/constant';
import toast from 'react-hot-toast';
import context from '@/context/AppContext';

const SignUp = () => {
  const { user } = useContext(context)
  const { loading, setLoading } = useContext(context)
  const navigate = useNavigate()
  const [fullName, setfullName] = useState('')
  const [email, setemail] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [password, setpassword] = useState('')
  const [role, setRole] = useState('')
  const [file, setfile] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullName", fullName)
    formData.append("email", email)
    formData.append("phoneNumber", phoneNumber)
    formData.append("password", password)
    formData.append("role", role)
    formData.append("file", file)
    setLoading(true)
    try {
      const res = await axios.post(`${API_END_POINT}/user/register`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])
  return (
    <div className=' flex justify-center items-center '>
      <form onSubmit={submitHandler} className=' w-full md:w-2xl mt-0 md:mt-10  md:shadow-md p-5 md:p-8 rounded-md' action="">
        <h1 className=' font-bold text-2xl mb-5'>Sign Up</h1>
        <div className=' flex flex-col gap-2 md:gap-3'>
          <Label className='ml-1.5'>Full Name</Label>
          <Input required name='fullName' value={fullName} onChange={(e) => setfullName(e.target.value)} type='text' placeholder="Enter Your Full Name" />
          <Label className='ml-1.5'>Email</Label>
          <Input required name='email' value={email} onChange={(e) => setemail(e.target.value)} type='email' placeholder="Enter Your Email" />
          <Label className='ml-1.5'>Phone Number</Label>
          <Input required name='phoneNumber' value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} type='number' placeholder="Enter Your Phone Number" />
          <Label className='ml-1.5'>Password</Label>
          <Input required name='password' value={password} onChange={(e) => setpassword(e.target.value)} type='password' placeholder="Enter Your Password" />
          <div className=' flex items-center gap-2'>
            <input required type="radio" name='role' value={"student"} checked={role === 'student'} onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="">Student</label>
            <input required type="radio" name='role' value={"recruiter"} checked={role === 'recruiter'} onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="">Recruiter</label>
          </div>
          <div className=' flex flex-col gap-3'>
            <Label>Profile Image</Label>
            <Input onChange={(e) => setfile(e.target.files[0])} accept='image/*' type="file" />
          </div>
          <button type='submit' disabled={loading} className='bg-orange-400 hover:bg-orange-500 text-white flex justify-center items-center rounded my-2 py-1.5'>
            {
              loading ? (<div className=' h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin'></div>) : (" Sign Up")
            }
          </button>
        </div>
        <h1>Already have an Account? <Link to={'/login'} className=' ml-2 text-blue-500 underline'>Login</Link></h1>
      </form>
    </div>
  )
}

export default SignUp