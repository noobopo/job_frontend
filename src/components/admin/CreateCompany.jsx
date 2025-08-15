import React, { useContext, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { API_END_POINT } from '@/utils/constant'
import context from '@/context/AppContext'

const CreateCompany = () => {
  const { setsingleCompany } = useContext(context)
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${API_END_POINT}/company/register`, { name }, { withCredentials: true })
      if (res.data.success) {
        toast.success(res.data.message)
        const id = res?.data?.company?._id
        navigate(`/admin/company/${id}`)
        setsingleCompany(res?.data?.company)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className=' rounded-md  w-full px-2 md:px-3  md:w-4xl mx-auto my-15'>
      <h1 className=' text-2xl font-bold text-orange-500'>Add new company</h1>
      <p className=' text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,</p>
      <div className=' flex flex-col my-5' >
        <Label className='ml-2 text-lg'>Company Name</Label>
        <Input onChange={(e) => setName(e.target.value)} className='mb-2' placeholder='Google, Microsoft etc.' />
        <div className=' flex gap-4 my-5'>
          <Button onClick={() => navigate('/admin/company')} variant='outline'>Cancle</Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateCompany