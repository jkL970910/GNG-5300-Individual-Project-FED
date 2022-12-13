import { Col, Row, Carousel, Image, Collapse } from 'antd';
import React from 'react';
import StyleCard from '../../../components/StyleCard';
import useLocalStorageState from '../../../hooks/useLocalStorage';
import { Typography } from 'antd';
import Suspense from '../../../components/Suspense';
import { useUserPhotoList } from '../../../hooks/usePhotoGallery';
import UserImagePanel from '../../../components/UserImagePanel';
import { useUserFetch } from '../../../hooks/useLogin';
import './index.css';

const { Title } = Typography;

export function UserPage() {
    const [user, setUser] = useLocalStorageState('current_user')
    const {refetch: refetchUser} = useUserFetch(user.username, setUser);
    const {data, loading, error, refetch} = useUserPhotoList(user.username);
    const retry = () => {
        refetch();
        refetchUser();
    }
    return (
        <StyleCard style={{ background: 'rgb(0, 0, 0, 0.2)' }}>
            <Row>
                <Col span={6}>
                    <StyleCard title={`Hi! ${user?.username}`} style={{ background: "rgb(218, 220, 224)" }}>
                        <Title level={4}>Since you join our family:</Title>
                        <Title level={5}>{`You Upload: ${user.myPhotos.length} photos`}</Title>
                        <Title level={5}>{`You Liked: ${user.likedList.length} photos`}</Title>
                        <Title level={5}>Keep it going!</Title>
                    </StyleCard>
                </Col>
                <Col span={18}>
                    <StyleCard title={`Manage Your Photos Here`} style={{ background: "rgb(218, 220, 224)" }}>
                        <Suspense
                            loading={loading}
                            error={error}
                            data={data?.getUserPhotoList}
                            onRetry={retry}
                        >   
                        <Carousel autoplay={true}>
                            {data && data.getUserPhotoList.map((data) => {
                                const url = data.imgUrl === '' ? data.imgLocal : data.imgUrl;
                                return <div key={data.id}>
                                    <h3>{data.title}</h3>
                                        <Image
                                            style={{maxWidth:'48rem', height:'auto'}}
                                            src={url}
                                        />
                                </div>
                            })}
                            </Carousel>
                        </Suspense>
                        <Collapse className='collapse' style={{ marginTop: '12px', marginLeft: '24px', marginRight: '24px'}}>
                            <Collapse.Panel header={'Manage Your Photo'}>
                                <UserImagePanel data={data?.getUserPhotoList} refetch={retry}/>
                            </Collapse.Panel>
                        </Collapse>
                    </StyleCard>
                </Col>
            </Row>
        </StyleCard>
    );
}