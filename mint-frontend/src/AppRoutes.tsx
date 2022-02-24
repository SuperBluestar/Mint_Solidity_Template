import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import Footer from "layouts/Footer";

import Home from "pages/Home"
import NotFound from "pages/NotFound"
import Admin from "pages/Admin/Index"; 
import AdminDashboard from 'pages/Admin/Dashboard';
import AdminPanel1 from 'pages/Admin/Panel1';
import AdminPanel2 from 'pages/Admin/Panel2';

const AppRoutes = () => {
    const location = useLocation();
    return (
        <div className="w-full flex flex-col">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="title" content="Ukrainecharity"/>
                <meta name="description" content="Pray for Ukraine - Your help will be seen!"/>
                {/* <meta name="author" content="The Mafioso"/> */}
                <meta name="image" content="IMAGE SENT BELOW"/>
                <link rel="apple-touch-icon" href="/logo192.png"/>
                <link rel="manifest" href="/manifest.json"/>
                {/* <link rel="stylesheet" href="/font/index.css"/> */}
                <title>Ukrainecharity</title>
                <meta property="og:title" content="Ukrainecharity"/>
                <meta property="og:site_name" content="Ukrainecharity"/>
                <meta property="og:url" content="https://ukrainecharity.gives/"/>
                {/* <meta property="article:author" content="The Mafioso™"/>
                <meta property="og:description" content="The #AAA hyper-real mafia #metaverse on #fantom Find fame, glory and real power in the battle for the ultimate title: The Mafioso"/>
                <meta property="og:type" content="article"/>
                <meta property="article:tag" content="The Mafioso™, nft, art, crypto, blockchain, bnb, eth, minted, bsc, opensea, artist, nft creator, nft marketplace opensea, marketplace"/>
                <meta property="og:image" content="https://themafioso.com/title_slide.png" />
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://themafioso.com/"/> */}
                <meta property="og:title" content="Ukrainecharity"/>
                {/* <meta property="og:description" content="The #AAA hyper-real mafia #metaverse on #fantom Find fame, glory and real power in the battle for the ultimate title: The Mafioso"/>
                <meta property="og:image" content="https://themafioso.com/title_slide.png" />
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://www.thejiggys.com/"/> */}
                <meta property="twitter:title" content="Ukrainecharity"/>
                {/* <meta property="twitter:description" content="The #AAA hyper-real mafia #metaverse on #fantom Find fame, glory and real power in the battle for the ultimate title: The MafiosoL"/>
                <meta property="twitter:image" content="https://themafioso.com/title_slide.png" /> */}
            </Helmet>
            <Routes location={location}>
                <Route path="" element={<Home />} />
                <Route path="admin" element={<Admin />}>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="1" element={<AdminPanel1 />} />
                    <Route path="2" element={<AdminPanel2 />} />
                    <Route path="*" element={<Navigate to="" />} />
                </Route>
                <Route path="404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="404" />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default AppRoutes;