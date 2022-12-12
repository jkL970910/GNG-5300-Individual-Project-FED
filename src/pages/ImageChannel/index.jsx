import * as React from 'react';
import { motion } from 'framer-motion';
import './index.css';
import TopHeader from '../../components/TopHeader';
import { Outlet } from "react-router";
import { Row, Col } from 'antd';

export function ImageChannel() {
    return (
        <motion.div 
            className="image-page"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <TopHeader/>
            <Row gutter={8} className='main'>
                <Col span={3}/>
                <Col span={18}>
                    <Outlet/>
                </Col>
                <Col span={3}/>
            </Row>
        </motion.div>
    );
}