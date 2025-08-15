import React, { useContext } from 'react'
import LatestJobCards from './LatestJobCards'
import context from '@/context/AppContext'

const LatestJobs = () => {
  const { allJobs } = useContext(context)
  return (
    <div className=' w-full px-3 md:px-8 lg:px-0 mx-auto lg:w-7xl'>
      <h1 className=' text-3xl font-bold text-orange-500 my-5'>Latest Job <span className=''>Openings</span></h1>
      <div className=' my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {
          allJobs.length <= 0 ? <span>Job Not Found</span> :  allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job= {job} />)
        }
      </div>
    </div>
  )
}

export default LatestJobs