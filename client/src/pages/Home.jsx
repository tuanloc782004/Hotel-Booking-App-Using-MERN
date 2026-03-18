import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestionation from '../components/FeaturedDestionation'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedDestionation />
            <ExclusiveOffers />
            <Testimonial />
            <NewsLetter />
        </>
    )
}

export default Home