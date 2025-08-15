import React, { useContext, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import Autoplay from 'embla-carousel-autoplay'
import { useNavigate } from 'react-router-dom'
import context from '@/context/AppContext'


const catagory = [
  "FrontEnd Developer",
  "Data Analyst",
  "BackEnd Developer",
  "Cloud Engineer",
  "Graphic Designer",
  "Cyber Security",
  "FullStack Developer",
  "Ui/Ux Designer",
  "Database Engineer"
]

const CatagoryCarousel = () => {
  const { setNormalSearch } = useContext(context)
  const navigate = useNavigate()

   const queryHandler = (query) => {
    setNormalSearch(query)
    navigate('/browse')
  }
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className='w-full max-w-[70%] lg:max-w-2xl mx-auto my-16'>
        <CarouselContent>
          {
            catagory.map((cat, index) =>
              <CarouselItem key={index} className=' basis-2/4 md:basis-1/3 lg:basis-1/4'>
                <Button onClick={()=>queryHandler(cat)} className='rounded-full' variant='outline'>{cat}</Button>
              </CarouselItem>
            )
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}

export default CatagoryCarousel