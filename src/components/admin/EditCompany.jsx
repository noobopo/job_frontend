import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowBigLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import toast from 'react-hot-toast'
import axios from 'axios'
import { API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import context from '@/context/AppContext'
import useGetSingleCompany from '@/hooks/useGetSingleCompany'

const EditCompany = () => {
  const { loading, setLoading, singleCompany } = useContext(context)
  const { id } = useParams()
  useGetSingleCompany(id)
  const navigate = useNavigate()
  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('description', input.description)
    formData.append('website', input.website)
    formData.append('location', input.location)
    if (input.file) {
      formData.append('file', input.file)
    }
    try {
      setLoading(true)
      const res = await axios.put(`${API_END_POINT}/company/update/${id}`, formData, {
        withCredentials: true, headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/company')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some Internal Error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: singleCompany.file || null
    })
  }, [singleCompany])

  const handeDelete = async()=>{
    try {
      const res = await axios.delete(`${API_END_POINT}/company/delete/${id}`,{withCredentials:true})
      if (res.data.success) {
        toast.success(res.data.message)
        navigate(-1)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="w-full lg:max-w-5xl mx-auto p-3 md:p-6 lg:p-8 my-8">
      <div className="flex items-center gap-3 mb-6">
        <Button onClick={()=>navigate(-1)} variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-black">
          <ArrowBigLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </Button>
        <h1 className="text-3xl font-semibold">Company Setup</h1>
        <Button onClick={handeDelete} className={' ml-auto'}>Delete Company</Button>
      </div>

      <Card className="shadow-sm border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Edit Company Details</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler} className="space-y-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="Enter company name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="About your company"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="Enter company website"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  type="text"
                  placeholder="Enter company location"
                  className="mt-2"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  accept="image/*"
                  onChange={changeFileHandler}
                  type="file"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex justify-start">
              <Button disabled={loading} type="submit" className="px-6">
                {
                  loading ? 'loading...' : 'Save Changes'
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditCompany
