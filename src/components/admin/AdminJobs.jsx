import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import JobTable from './JobTable'
import UseGetAdminJobs from '@/hooks/UseGetAdminJobs'
import context from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'

const AdminJobs = () => {
  UseGetAdminJobs()
  const [search, setSearch] = useState('')
  const { setJobSearchText } = useContext(context)
  const navigate = useNavigate()

  useEffect(() => {
    setJobSearchText(search)
  }, [search, setJobSearchText])

  return (
    <div className="w-full px-2 md:px-4 lg:px-1 lg:max-w-7xl my-10 mx-auto">
      <div className="p-5 flex gap-4 items-center justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="py-2 px-3 w-full md:w-64 outline rounded"
          placeholder="Filter by name"
          type="text"
        />
        <Button onClick={() => navigate('/admin/job/create')} className="bg-black text-white">
          New Job
        </Button>
      </div>
      <hr />
      <div className="p-5 my-5">
        <JobTable />
      </div>
    </div>
  )
}

export default AdminJobs