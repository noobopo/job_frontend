import React, { useContext, useEffect, useState } from 'react'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/hooks/UsegetAllcompany'
import context from '@/context/AppContext'
import { Button } from '../ui/button'

const Company = () => {
  useGetAllCompany()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const { setCompanySearch } = useContext(context)

  useEffect(() => {
    setCompanySearch(search)
  }, [search, setCompanySearch])

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
        <Button onClick={() => navigate('/admin/company/create')} className="bg-black text-white">
          New Company
        </Button>
      </div>
      <hr />
      <div className="p-5 my-5">
        <CompanyTable />
      </div>
    </div>
  )
}

export default Company
