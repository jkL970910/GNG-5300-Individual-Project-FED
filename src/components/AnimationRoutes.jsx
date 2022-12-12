import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import {AnimatePresence} from 'framer-motion';
import { ImageChannel } from '../pages/ImageChannel';
import { LoginPage } from '../pages/Login/login';
import { RegisterPage } from '../pages/Login/register';
import { UserPage } from '../pages/ImageChannel/userPage';
import { PhotoUpload } from '../pages/ImageChannel/photoUpload';
import { MyFavorite } from '../pages/ImageChannel/myFavorite';
import { PhotoGallery } from '../pages/ImageChannel/photoGallery';

export function AnimationRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/image_channel" element={<ImageChannel/>}>
                    <Route path="photo_gallery" element={<PhotoGallery/>} />
                    <Route path="my_favorite" element={<MyFavorite/>} />
                    <Route path="photo_upload" element={<PhotoUpload/>} />
                    <Route path="user_page" element={<UserPage/>} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}