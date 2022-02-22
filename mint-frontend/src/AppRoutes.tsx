import React, { Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "layouts/Header"
import Home from "pages/Home"
import NotFound from "pages/NotFound"
import Admin from "pages/Admin/Index"; 
import AdminDashboard from 'pages/Admin/Dashboard';
import AdminPanel1 from 'pages/Admin/Panel1';
import AdminPanel2 from 'pages/Admin/Panel2';
import AdminPanel3 from 'pages/Admin/Panel3';

const AppRoutes = () => {
    const location = useLocation();
    return (
        <div className="w-full flex flex-col">
            <Header />
            <Routes location={location}>
                <Route path="" element={<Home />} />
                <Route path="admin" element={<Admin />}>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="1" element={<AdminPanel1 />} />
                    <Route path="2" element={<AdminPanel2 />} />
                    <Route path="3" element={<AdminPanel3 />} />
                    <Route path="*" element={<Navigate to="" />} />
                </Route>
                <Route path="404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="404" />} />
            </Routes>
        </div>
    )
}

export default AppRoutes;