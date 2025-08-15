import React from 'react'
import { Link } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    return (
        <Link to={`/details/${job._id}`} className=' border flex flex-col justify-between rounded-md p-1 md:p-2 lg:p-4'>
            <div className=' '>
                <h1 className=' font-medium text-gray-900'>{job?.companyId?.name}</h1>
                <h1 className=' text-sm text-gray-500'>India</h1>
            </div>
            <div>
                <h1 className=' text-blue-600 text-xl'>{job.title}</h1>
                <p>{job.description}</p>
            </div>
            <div className=' flex gap-2 md:gap-0.5 lg:gap-2 mt-2'>
                <div className=' flex text-sm justify-center tracking-tighter items-center text-blue-400 font-semibold px-0.5 h-6  w-40  border-1 rounded-md hover:bg-gray-100 border-gray-300'>{job.position} Opening</div>
                <div className=' flex text-sm justify-center items-center text-gray-900 font-semibold px-0.5 h-6  w-40  border-1 rounded-md hover:bg-gray-100 border-gray-300'>{job.salary}</div>
                <div className=' flex text-sm justify-center items-center text-orange-500 font-semibold px-0.5 h-6  w-40  border-1 rounded-md hover:bg-gray-100 border-gray-300'>{job.jobType}</div>
                <div className=' flex text-sm justify-center items-center text-cyan-500 font-semibold px-0.5 h-6  w-40  border-1 rounded-md hover:bg-gray-100 border-gray-300'>{job.location}</div>
            </div>
        </Link>
    )
}

export default LatestJobCards