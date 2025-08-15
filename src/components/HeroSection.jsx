import context from '@/context/AppContext';
import React, { useContext, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const { setNormalSearch } = useContext(context)
  const navigate = useNavigate()

  const queryHandler = (e) => {
    e.preventDefault()
    setNormalSearch(query)
    navigate('/browse')
  }
  return (
    <div className="text-center px-4 sm:px-6 md:px-0">
      <div className="flex flex-col gap-5 my-8 sm:my-10">
        <span className="font-bold py-1 px-4 mx-auto text-orange-400 bg-gray-100 rounded-full text-sm sm:text-base">
          No. 1 Job Searching Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          One Step Away <br className="hidden sm:block" />
          To Get Your <span className="text-orange-400">Dream</span> Job
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laborum iste hic repellat odio rerum architecto quia vero autem accusantium ut!
        </p>

        <form onSubmit={queryHandler} className="w-full sm:w-[90%] md:w-[80%] lg:w-[40%] shadow mx-auto border rounded-full flex overflow-hidden">
          <input
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none px-3 py-2 text-sm sm:text-base w-full"
            type="search"
            placeholder="Find your job..."
          />
          <button type='submit' className="bg-black rounded-r-full px-5 sm:px-6 py-2 flex items-center justify-center">
            <FiSearch color="white" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
