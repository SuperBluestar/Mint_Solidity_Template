import React, { Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "layouts/Header"
import Home from "pages/Home"
import NotFound from "pages/NotFound"
import Admin from "pages/Admin/Index"; 
import AdminDashboard from 'pages/Admin/Dashboard';

const AppRoutes = () => {
    const location = useLocation();
    return (
        <div className="w-full flex flex-col">
            <Header />
            <Routes location={location}>
                <Route path="" element={<Home />} />
                <Route path="admin" element={<Admin />}>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="*" element={<Navigate to="" />} />
                </Route>
                <Route path="404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="404" />} />
            </Routes>
        </div>
    )
}

export default AppRoutes;