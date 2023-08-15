
import React, { Fragment, useEffect,useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Rightbar, Sidebar } from '../../components';
import routes from '../../routes/index';

const Main = (props) => {

    return (
        <>
            {/* Navbar ----------------------------- */}
            {/* <Routes>
                {routes.map((route) => {
                    if (route.navbar)
                        return <Route path={route.path} element={<Navbar />} />;
                })}
            </Routes> */}
            {/* <Routes>
                {routes.map((route) => {
                    if (route.bannerRegion)
                        return <Route path={route.path} element={<BannerRegion/>} />;
                })}
            </Routes> */}

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
            {/* Right bar */}
            <Routes>
                {routes.map((route) => {
                    if (route.rightbar)
                        return <Route path={route.path} element={route.componentRightbar} />;
                })}
            </Routes>
            </div>
        </>
    )
}


export default Main
