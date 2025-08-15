import React, { useContext, useEffect, useMemo, useState } from 'react'
import FilterCard from './FilterCard'
import Job from './Job'
import { Link } from 'react-router-dom'
import context from '@/context/AppContext'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { Button } from './ui/button'
import { X } from 'lucide-react'

const Jobs = () => {
  useGetAllJobs()   // Just call it, no loading state
  const { allJobs, normalSearch } = useContext(context)
  const [isOpen, setIsOpen] = useState(false)

  // Lock background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [isOpen])

  // Filter jobs using memoization
  const filteredJob = useMemo(() => {
    if (!normalSearch) return allJobs
    return allJobs.filter((job) =>
      [job.title, job.description, job.location]
        .some((field) => field.toLowerCase().includes(normalSearch.toLowerCase()))
    )
  }, [allJobs, normalSearch])

  return (
    <>
      <div className='px-2 md:px-0 w-full md:max-w-7xl my-10 mx-auto'>
        <div className='flex flex-col md:flex-row gap-5'>

          {/* Mobile filter button */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(true)}
              className="w-full"
            >
              Filter Jobs
            </Button>
          </div>

          {/* Desktop filter sidebar */}
          <div className='hidden md:block w-[14%]'>
            <FilterCard />
          </div>

          {/* Job list */}
          <div className='flex-1 md:h-[82vh] overflow-y-auto pb-5'>
            {filteredJob.length <= 0 ? (
              <span>No Job Found</span>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {filteredJob.map((job) => (
                  <Link to={`/details/${job._id}`} key={job._id}>
                    <Job job={job} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex">
          <div className="w-3/4 sm:w-1/2 bg-white h-full p-4 overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterCard />
          </div>

          {/* Overlay click to close */}
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  )
}

export default Jobs
