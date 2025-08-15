import React, { useContext, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import context from '@/context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { API_END_POINT } from '@/utils/constant'

const UpdateProfile = ({ isOpen, setIsOpen }) => {
  const { loading, user, setLoading, setUser } = useContext(context)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '')
      setEmail(user.email || '')
      setPhoneNumber(user.phoneNumber || '')
      setBio(user.profile?.bio || '')
      setSkills(user.profile?.skills?.join(', ') || '')
      setFile(null)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('fullName', fullName)
    formData.append('email', email)
    formData.append('phoneNumber', phoneNumber)
    formData.append('bio', bio)
    formData.append('skills', skills) // Convert to CSV if needed
    if (file) {
      formData.append('file', file)
    }

    try {
      setLoading(true)
      const res = await axios.post(`${API_END_POINT}/user/update`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (res.data.success) {
        setUser(res.data.user)
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Update Profile</DialogTitle>
          <DialogDescription>
            Update your account details and upload your resume here.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label className="ml-1">Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="ml-1">Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="ml-1">Phone Number</Label>
            <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="number" />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="ml-1">Bio</Label>
            <Input value={bio} onChange={(e) => setBio(e.target.value)} type="text" />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="ml-1">Skills (comma separated)</Label>
            <Input value={skills} onChange={(e) => setSkills(e.target.value)} type="text" />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="ml-1">Resume</Label>
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} accept="application/pdf" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-400 hover:bg-orange-500 text-white flex justify-center items-center rounded my-2 py-1.5"
          >
            {loading ? (
              <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
            ) : (
              'Update'
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfile
