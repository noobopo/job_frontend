import React, { useContext, useEffect } from 'react'
import Job from './Job'
import { Link } from 'react-router-dom'
// import useGetAllJobs from '@/hooks/useGetAllJobs'
import context from '@/context/AppContext'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const Browser = () => {
  useGetAllJobs()
  const { allJobs } = useContext(context)
  const { setNormalSearch} = useContext(context)
  useEffect(()=>{
    return ()=>setNormalSearch('')
  },[])
  return (
    <div className=' w-full px-2 md:px-3 lg:px-0 lg:max-w-7xl mx-auto'>
      <div className=' my-5'>
        <h1 className=' text-lg my-4'>Search Reasult ({allJobs.length})</h1>
        <div className=' flex flex-col gap-5'>
          {
            allJobs.map((job, index) =>
              <Link key={index} to={`/details/${job._id}`}>
                <Job job={job} />
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Browser