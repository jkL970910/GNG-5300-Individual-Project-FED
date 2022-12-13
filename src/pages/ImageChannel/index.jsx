import * as React from 'react';
import { motion } from 'framer-motion';
import './index.css';
import TopHeader from '../../components/TopHeader';
import { Outlet } from "react-router";
import { Row, Col, Card } from 'antd';
import { useLocation } from 'react-router';
import './index.css';

export function ImageChannel() {
    let location = useLocation()
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
                {location.pathname === '/image_channel' 
                    ? <Card className={'bgImgCenter'}>
                            <div style={{display: 'flex', flexDirection: 'column', height: '1000px'}}>
                                <div style={{ visibility: 'hidden', marginTop: '24px', fontSize: '64px', display: 'inline-block'}} >Start Your Journey From Here</div>
                                <div style={{ marginTop: '24px', fontSize: '86px', display: 'inline-block'}} >Start Your Journey From Here</div>
                                <div style={{ marginTop: '24px', fontSize: '36px', display: 'inline-block'}} >Select Tabs to discover landscapes</div>
                            </div>
                        </Card> 
                    : <Outlet/>}
                </Col>
                <Col span={3}/>
            </Row>
        </motion.div>
    );
}