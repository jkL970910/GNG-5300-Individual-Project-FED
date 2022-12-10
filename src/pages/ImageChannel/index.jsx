import * as React from 'react';
import { motion } from 'framer-motion';
import './index.css';
import TopHeader from '../../components/TopHeader';

export function ImageChannel() {
    return (
        <motion.div 
            className="image-page"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <TopHeader/>
        </motion.div>
    );
}