import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ImageChannel } from '../ImageChannel';
import { LoginPage } from '../Login/login';
import { RegisterPage } from '../Login/register';

import {AnimatePresence} from 'framer-motion';

export function AnimationRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/image_channel" element={<ImageChannel/>}>
                    {/* <Route path="all-photos" element={<AllPhotosPage/>} />
                    <Route path="upload" element={<UploadPhotoPage/>} />
                    <Route path="favorites" element={<FavoritesPage/>} />
                    <Route path="my-space" element={<MySpacePage/>} /> */}
                </Route>
            </Routes>
        </AnimatePresence>
    );
}