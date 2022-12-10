import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import {AnimatePresence} from 'framer-motion';
import { ImageChannel } from '../pages/ImageChannel';
import { LoginPage } from '../pages/Login/login';
import { RegisterPage } from '../pages/Login/register';

export function AnimationRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/image_channel" element={<ImageChannel/>}/>
            </Routes>
        </AnimatePresence>
    );
}