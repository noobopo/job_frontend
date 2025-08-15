import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import context from '@/context/AppContext'
import toast from 'react-hot-toast'


const JobDetails = () => {
  const { singleJob, setsingleJob } = useContext(context)
  const { user } = useContext(context)
  let InnitalApplied = singleJob?.applications?.some(item => item.applicant === user?._id) ?? false;
  const { id } = useParams()
  const [Applied, setApplied] = useState(InnitalApplied)

  const handleApply = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/application/apply/${id}`, { withCredentials: true })
      if (res.data.success) {
        setApplied(true)
        const singleUpdateJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        setsingleJob(singleUpdateJob)
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const fatchSingleJob = async () => {
      try {
        const res = await axios.get(`${API_END_POINT}/job/${id}`, { withCredentials: true })
        if (res.data.success) {
          setsingleJob(res.data.job)
          setApplied(res.data.job.applications.some(item=>item.applicant === user?._id))
        }

      } catch (error) {
        console.log(error?.response.data?.message);
      }
    }
    fatchSingleJob()
  }, [id])


  return (
    <div className="px-4 md:px-6 max-w-7xl mx-auto my-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">{singleJob.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-blue-100 text-blue-700">{singleJob.position} Openings</span>
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-gray-200 text-gray-800">{singleJob.salary}</span>
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-orange-100 text-orange-600">{singleJob.jobType}</span>
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-cyan-100 text-cyan-700">{singleJob.location}</span>
          </div>
        </div>
        <button
          onClick={handleApply}
          disabled={Applied}
          className={`mt-4 md:mt-0 px-6 py-2 rounded-md text-white font-semibold transition-colors ${Applied ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900'
            }`}
        >
          {Applied ? 'Applied' : 'Apply'}
        </button>
      </div>

      <div>
        <span className="font-bold text-xl">Requirements:</span>
        <div className=" flex gap-2 mt-2">
          {singleJob?.requirments?.map((item, index) =>
            <span key={index} className=" px-2  rounded-md bg-white border-2 hover:bg-gray-300 transition-all duration-300 text-black">{item}</span>
          )}
        </div>
      </div>
      <section className="mt-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
        <hr className="mb-6" />
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-bold">Role:</span> {singleJob.title}
          </p>
          <p>
            <span className="font-bold">Location:</span> {singleJob.location}
          </p>
          <p>
            <span className="font-bold">Description:</span> {singleJob.description}
          </p>

          <p>
            <span className="font-bold">Experience:</span> {singleJob.experiance}
          </p>
          <p>
            <span className="font-bold">Salary:</span> {singleJob.salary}/- Per Year
          </p>
          <p>
            <span className="font-bold">Total Applicants:</span> {singleJob?.applications?.length}
          </p>
          <p>
            <span className="font-bold">Posted Date:</span> {new Date(singleJob.createdAt).toUTCString().slice(0, 16)}
          </p>
        </div>
      </section>
    </div>
  )
}

export default JobDetails
