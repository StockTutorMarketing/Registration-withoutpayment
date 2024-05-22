import "../App.css"
import React from 'react'
import { useEffect, useState } from 'react';
import Combine from '../components/Combine';
import Faq from '../components/Faq';
import Certificate from '../components/Certificate';
import Testimonials from '../components/Testimonials';
import OurCourses from '../components/OurCourses';
import WhatOffer from '../components/WhatOffer';

const Home = () => {
    

    return (
        <>
            <Combine />
            <OurCourses />
            <WhatOffer />
            <Testimonials />
            <Certificate />
            <Faq />
        </>
    )
}

export default Home