import React, { useContext, useEffect } from 'react'
import HeroSection from './HeroSection'
import CatagoryCarousel from './CatagoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import context from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'
import FeaturesSection from './FeaturesSection'


const Home = () => {
  const { user } = useContext(context)
  const navigate = useNavigate()
  useGetAllJobs()
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/company')
    }
  }, [])
  return (
    <div>
      <HeroSection />
      <CatagoryCarousel />
      <LatestJobs />
      {/* <FeaturesSection /> */}
      <Footer />
    </div>
  )
}

export default Home