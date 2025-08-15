import React, { useContext, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import context from '@/context/AppContext';
import UsegetAllcompany from '@/hooks/UsegetAllcompany';
import { API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const { allCompany, loading, setLoading } = useContext(context)
  const navigate = useNavigate()
  const [input, setInput] = useState({
    title: '', description: '', requirments: '', salary: '', experiance: '',
    location: '', jobType: '', position: '', companyId: ''
  });

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('title', input.title)
    formData.append('description', input.description)
    formData.append('requirments', input.requirments)
    formData.append('salary', input.salary)
    formData.append('experiance', input.experiance)
    formData.append('location', input.location)
    formData.append('jobType', input.jobType)
    formData.append('position', input.position)
    formData.append('companyId', input.companyId)

    try {
      setLoading(true)
      const res = await axios.post(`${API_END_POINT}/job/post`, formData, {
        withCredentials: true, headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate(-1)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }finally{
      setLoading(false)
    }

  };

  UsegetAllcompany();

  return (
    <div className="w-full p-2 md:p-3 md:max-w-6xl mx-auto my-10">
      <h1 className="text-2xl font-bold my-2">Create New Job</h1>
      <form onSubmit={HandleSubmit} className="lg:p-10 border-2 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-4">
          <div>
            <Label className="m-1 text-lg">Job Title</Label>
            <Input required onChange={onChangeHandler} name="title" value={input.title} type="text" placeholder="enter job title" />
          </div>
          <div>
            <Label className="m-1 text-lg">Description</Label>
            <Input required onChange={onChangeHandler} name="description" value={input.description} type="text" placeholder="enter job details" />
          </div>
          <div>
            <Label className="m-1 text-lg">Requirements</Label>
            <Input required onChange={onChangeHandler} name="requirments" value={input.requirments} type="text" placeholder="enter requirements like Java, Python" />
          </div>
          <div>
            <Label className="m-1 text-lg">Salary</Label>
            <Input required onChange={onChangeHandler} name="salary" value={input.salary} type="number" placeholder="like 1000000" />
          </div>
          <div>
            <Label className="m-1 text-lg">Experience</Label>
            <Input required onChange={onChangeHandler} name="experiance" value={input.experiance} type="text" placeholder="like 0-1 year" />
          </div>
          <div>
            <Label className="m-1 text-lg">Location</Label>
            <Input required onChange={onChangeHandler} name="location" value={input.location} type="text" placeholder="enter job location" />
          </div>
          <div>
            <Label className="m-1 text-lg">Job Type</Label>
            <Input required onChange={onChangeHandler} name="jobType" value={input.jobType} type="text" placeholder="like full time, part time" />
          </div>
          <div>
            <Label className="m-1 text-lg">Position</Label>
            <Input required onChange={onChangeHandler} name="position" value={input.position} type="number" placeholder="enter no of positions" />
          </div>
          <div className="w-full">
            <Label className="m-1 text-lg">Company</Label>
            <select required
              name="companyId"
              value={input.companyId}
              onChange={onChangeHandler}
              className="w-full py-2.5 rounded-md border px-2"
            >
              <option value="">Select company</option>
              {allCompany?.map((comp) => (
                <option key={comp._id} value={comp._id}>
                  {comp.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className='bg-orange-400 w-full hover:bg-orange-500 text-white flex justify-center items-center rounded my-2 py-1.5 disabled:opacity-50'
        >
          {loading ? (<div className=' h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>) : ("Create New")}
        </button>
        {
          allCompany.length === 0 && (
            <span className=' text-red-500 font-bold'>Please Create A company First</span>
          )
        }
      </form>
    </div>
  );
};

export default CreateJob;
