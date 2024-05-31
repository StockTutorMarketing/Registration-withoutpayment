import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../Pages/Home'
import Thankyou from '../Pages/Thankyou'

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/thankyou" element={<Thankyou />} />
               
            </Routes>
        </>
    )
}

export default AllRoutes