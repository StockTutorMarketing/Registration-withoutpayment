import "../App.css"
import React from 'react'
import { useEffect, useState } from 'react';
import Combine from '../components/Combine';
import Faq from '../components/Faq';
import Certificate from '../components/Certificate';
import Testimonials from '../components/Testimonials';
import OurCourses from '../components/OurCourses';
import WhatOffer from '../components/WhatOffer';
import BottomBar from "../components/Bottambar";
import Review from "../components/Review";

const Home = () => {
    const [showBottomBar, setShowBottomBar] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const componentsToScrollPast = 1;
            const scrollPositionToTrigger = window.innerHeight * componentsToScrollPast;

            if (window.scrollY > scrollPositionToTrigger) {
                setShowBottomBar(true);
            } else {
                setShowBottomBar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <>
            <Combine />
            <OurCourses />
           <Review />
            <WhatOffer />
            <Testimonials />
            <Certificate />
            <Faq />

            {showBottomBar && (
                <div>
                    <BottomBar />
                </div>
            )}
        </>
    )
}

export default Home