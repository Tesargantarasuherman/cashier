
import React, { Fragment, useEffect,useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar } from '../../components';


const Main = (props) => {

    return (
        <>
        <ToastContainer />
            {/* Navbar ----------------------------- */}
            <Routes>
                {routes.map((route) => {
                    if (route.navbar)
                        return <Route path={route.path} element={<Navbar />} />;
                })}
            </Routes>
            <Routes>
                {routes.map((route) => {
                    if (route.bannerRegion)
                        return <Route path={route.path} element={<BannerRegion/>} />;
                })}
            </Routes>

            {/* ---------------------------------- */}
            {/* Render Sidebar */}
            <div className="w-full h-screen flex">
            <Routes>
                {routes.map((route) => {
                    if (route.sidebar)
                        return <Route path={route.path} element={<Sidebar />} />;
                })}
            </Routes>

            {/* Render Page */}
            <Routes>
                {routes.map((route) => {
                    return <Route path={route.path} element={
                        route.component
                    } />
                })}
            </Routes>
            </div>
        </>
    )
}


export default Main
