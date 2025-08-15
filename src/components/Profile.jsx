import { Avatar } from '@radix-ui/react-avatar'
import React, { useContext, useEffect, useState } from 'react'
import { AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedJobs from './AppliedJobs'
import UpdateProfile from './UpdateProfile'
import context from '@/context/AppContext'
import { API_END_POINT } from '@/utils/constant'
import toast from 'react-hot-toast'
import axios from 'axios'

const isReasums = true

const Profile = () => {
    const { user } = useContext(context)
    const skills = user?.profile?.skills
    const [isOpen, setIsOpen] = useState(false)
    const [appliedJobs, setAppliedJobs] = useState([])    

    useEffect(() => {
        const fatchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${API_END_POINT}/application/applied`,{withCredentials:true})
                setAppliedJobs(res.data.applications)
                
        } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        fatchAppliedJobs()
    }, [])

    return (
        <>
            <div className=' w-full p-2 md:p-3 lg:p-8 lg:max-w-6xl md:border rounded-md mx-auto my-5'>
                <div className=' flex justify-between'>
                    <div className=' flex gap-3 md:gap-5'>
                        <Avatar className=' '>
                            <AvatarImage src={user?.profile?.profilePhoto || 'https://th.bing.com/th/id/OIP.tX36supoUyT_GOZtBHrQJgHaHa?w=157&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'} className=' rounded-md w-25 h-20 md:w-24 md:h-24' />
                        </Avatar>
                        <div>
                            <h1 className=' font-semibold text-xl font-serif'>{user?.fullName}</h1>
                            <p className=' text-sm text-gray-500 max-w-[500px]'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setIsOpen(true)} variant='outline'><Pen /></Button>
                </div>
                <div className='my-3'>
                    <div className=' flex items-center gap-4 my-1'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className=' flex items-center gap-4 my-1'>
                        <Contact />
                        <span>+91 {user?.phoneNumber}</span>
                    </div>
                </div>
                <div className=''>
                    <h1 className=' font-medium text-lg'>Skills</h1>
                    {
                        skills?.length <= 0 ? <span>NA</span> :
                            <div className=' flex flex-wrap gap-2 my-1.5'>
                                {
                                    skills?.map((ite, index) =>
                                        <div key={ite} className=' flex text-sm justify-center tracking-tighter items-center text-white font-semibold  h-6 px-3  border-1 rounded-md bg-black border-gray-300'>{ite}</div>

                                    )
                                }
                            </div>
                    }
                </div>
                <div className=''>
                    <h1 className=' font-medium text-lg'>Reasume</h1>
                    {
                        isReasums ? <a className=' text-blue-500 hover:underline text-sm' target='blank' href={user?.profile?.reasume}>{user.profile?.reasumeName}</a> :
                            <span>NA</span>
                    }
                </div>
            </div>
            <div className=' w-full md:max-w-7xl mx-auto p-2'>
                <h1 className=' text-lg font-semibold'>All Your Applied Jobs</h1>
                <AppliedJobs applications={appliedJobs} />
            </div>
            <UpdateProfile isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

export default Profile