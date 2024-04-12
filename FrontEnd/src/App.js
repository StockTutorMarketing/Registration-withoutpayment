import './App.css';
import Faq from './components/Faq';
import Testimonials from './components/Testimonials';
import { ChakraProvider} from '@chakra-ui/react'
import WhatOffer from './components/WhatOffer';
import Certificate from './components/Certificate';
import OurCourses from './components/OurCourses';
import BottomBar from './components/BottomBar';
import { useEffect, useState } from 'react';
import Combine from './components/Combine';
import Slider from './components/Slider';
import Slider1 from './components/Slider1';
import Combinebottom from './components/Combinebottom';

function App() {
  const [showBottomBar, setShowBottomBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Setting the number of components to scroll past before showing the bottom bar
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
    <ChakraProvider>
        {/* <Slider/> */}
        <Combine/>
        <Combinebottom/>
        <OurCourses/>
        <WhatOffer/>
        <Testimonials/>
        {/* <Slider1/> */}
        <Certificate/>
        <Faq/>
        {showBottomBar && (
        <div>
          <BottomBar/>
        </div>
      )}        
    </ChakraProvider>
    </>
  );
}

export default App;
