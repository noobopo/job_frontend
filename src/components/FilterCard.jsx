import { RadioGroup } from '@radix-ui/react-radio-group'
import React, { useContext, useEffect, useState } from 'react'
import { RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'
import context from '@/context/AppContext'

const filterData = [
  {
    filterType: "Location",
    array: ['Kolkata', 'Bangalore', 'Pune', 'Hyderabad', 'Mumbai']
  },
  {
    filterType: "Salary",
    array: ['0-40 k', '42-1 lakh', '1-5 lakh', '5-10 lakh']
  },
  {
    filterType: "Industry",
    array: ['BackEnd Developer', 'Front End Developer', 'Data Analyst', 'Cloud Engineer', 'Full Stack Developer']
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const { setNormalSearch} =useContext(context)

  const changeHandler = (value) => {
    setSelectedValue(value)
  }
  useEffect(() => {
    setNormalSearch(selectedValue);
  }, [selectedValue])
  return (
    <div className="bg-white shadow rounded-2xl p-5 border border-gray-100">
      <h1 className="font-bold text-xl mb-4 text-gray-800">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-semibold text-lg text-gray-700 mb-2">{data.filterType}</h2>
            <div className="space-y-2 pl-1">
              {data.array.map((item, idx) => {
                const itemId = `i${index}- ${idx}`
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="h-4 w-4 border-gray-400 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 rounded-full"
                    />
                    <Label htmlFor={item} className="text-gray-600 cursor-pointer">{item}</Label>
                  </div>
                )

              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
