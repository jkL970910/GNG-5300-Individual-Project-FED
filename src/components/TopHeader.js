import React from 'react';
import { AndroidOutlined } from '@ant-design/icons';
import { Row, Tabs, Col } from 'antd';
import { PhotoGallery } from '../pages/ImageChannel/photoGallery';
import { MyFavorite } from '../pages/ImageChannel/myFavorite';
import { UserPage } from '../pages/ImageChannel/userPage';
import { PhotoUpload } from '../pages/ImageChannel/photoUpload';
import { Layout } from 'antd';
import { Link } from "react-router-dom";
import useLocalStorageState from '../hooks/useLocalStorage';

const { Content, Header } = Layout;

const itemMap = [
    {
        key: 'photoGallery',
        name: 'Photo Gallery',
        tab: <PhotoGallery/>
    },
    {
        key: 'myFavorite',
        name: 'My Favorite',
        tab: <MyFavorite/>
    },
    {
        key: 'photoUpload',
        name: 'Photo Upload',
        tab: <PhotoUpload/>
    },
    {
        key: 'userPage',
        name: 'User Page',
        tab: <UserPage/>
    }
]

export function TopHeader() {
    const [name,] = useLocalStorageState('current_user')
    return (
        <Layout>
        <Header style={{ background: 'white', position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
            <Row gutter={8}>
                <Col span={24}>
                    <div style={{ display: 'flex',  justifyContent: 'center', marginBottom: '8px'}}>
                        {`Welcome! ${name.username}`}
                    </div>
                </Col>
                <Col span={24}>
                    <Link onClick={() => localStorage.removeItem('current_user')} to={'/login'} style={{ display: 'flex',  justifyContent: 'center', marginBottom: '8px'}}>
                        Log out
                    </Link>
                </Col>
                <Col span={24}>
                    <Tabs
                        centered={true}
                        tabBarGutter={'6rem'}
                        defaultActiveKey="photoGallery"
                        items={itemMap.map((item) => {
                            return {
                                label: (
                                    <span>
                                    <AndroidOutlined />
                                        {item.name}
                                    </span>
                                ),
                                key: item.key,
                                children: <Content className="site-layout" style={{ padding: '0 50px' }}>{item.tab}</Content>,
                            };
                        })}
                    />
                </Col>
            </Row>
        </Header>
    </Layout>
    );
};
  
export default TopHeader;