import React from 'react'
import { CiBookmark } from "react-icons/ci";

const Job = ({job}) => {

    const days = (mongodbTime)=>{
        const createdTime = new Date(mongodbTime)
        const curreTime = new Date()
        const timeDifference = curreTime-createdTime
        return Math.floor(timeDifference/(24*60*60*1000))
    }
    return (
        <>
            <div className=' py-2 px-3 border rounded-md'>
                <div className=' flex justify-between items-center mb-2'>
                    <h1>{days(job?.createdAt)} days ago</h1>
                    <CiBookmark size={22} />
                </div>
                <div>
                    <div className=' flex items-center gap-2 mt-1'>
                        <img src={ job?.companyId?.logo ||"https://www.designyourway.net/blog/wp-content/uploads/2019/03/HP-logo.jpg" }alt="" className=' h-10 w-10 border-1 p-1 border-gray-100' />
                        <div className='leading-tight'>
                            <h1>{job?.companyId?.name}</h1>
                            <h1 className=' text-sm text-gray-600'>India</h1>
                        </div>
                    </div>
                </div>
                <div className=' my-2'>
                    <h1 className=' text-xl text-blue-500 font-medium'>{job?.title}</h1>
                    <p className=' text-sm text-gray-600'>{job?.description}</p>
                </div>
                <div className=' flex gap-2 md:gap-0.5 lg:gap-2 mt-2'>
                    <div className=' flex text-sm justify-center tracking-tighter items-center text-purple-400 font-semibold px-0.5 h-6  w-42  border-1  rounded-md hover:bg-gray-100 border-gray-300'>{job?.position} Opening</div>
                    <div className=' flex text-sm justify-center items-center text-gray-900 font-semibold px-0.5 h-6  w-40  border-1 rounded-md hover:bg-gray-100 border-gray-300'>{job?.salary}</div>
                    <div className=' flex text-sm justify-center items-center text-orange-500 font-semibold px-0.5 h-6  w-40  border-1 rounded-md hover:bg-gray-100 border-gray-300'>{job?.jobType}</div>
                    <div className=' flex text-sm justify-center items-center text-cyan-500 font-semibold px-0.5 h-6  w-40  border-1 rounded-md hover:bg-gray-100 border-gray-300'>{job?.location}</div>
                </div>
            </div>
        </>
    )
}

export default Job