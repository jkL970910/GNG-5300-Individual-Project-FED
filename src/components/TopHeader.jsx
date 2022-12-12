import React from 'react';
import { Row, Col, Radio } from 'antd';
import { Layout } from 'antd';
import { Link } from "react-router-dom";
import useLocalStorageState from '../hooks/useLocalStorage';
import { useNavigate, useLocation } from 'react-router';

const { Header } = Layout;

export function TopHeader() {
    const [name,] = useLocalStorageState('current_user')
    let navigate = useNavigate()

    function GetButton({title, url}) {
        let location = useLocation()
        return (
            <Radio.Button style={{background: location.pathname === url ? "#bf80ff" : null}} value={url}>{title}</Radio.Button>
        )
    }

    return (
        <Layout>
        <Header style={{ background: 'white', position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
            <Row gutter={8}>
                <Col span={6}>
                    <div style={{ display: 'flex',  justifyContent: 'center', marginBottom: '8px'}}>
                        {`Welcome! ${name?.username}`}
                    </div>
                </Col>
                <Col span={12}>
                    <Radio.Group onChange={(e) => navigate(e.target.value)} >
                        <GetButton title={'Photo Gallery'} url={'/image_channel/photo_gallery'}/>
                        <GetButton title={'My Favorite'} url={'/image_channel/my_favorite'}/>
                        <GetButton title={'Photo Upload'} url={'/image_channel/photo_upload'}/>
                        <GetButton title={'User Page'} url={'/image_channel/user_page'}/>
                    </Radio.Group>
                </Col>
                <Col span={6}>
                    <Link onClick={() => localStorage.removeItem('current_user')} to={'/login'} style={{ display: 'flex',  justifyContent: 'center', marginBottom: '8px'}}>
                        Log out
                    </Link>
                </Col>
            </Row>
        </Header>
    </Layout>
    );
};
  
export default TopHeader;