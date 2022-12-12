import { Col, Row, Carousel, Image, Collapse } from 'antd';
import React from 'react';
import StyleCard from '../../../components/StyleCard';
import useLocalStorageState from '../../../hooks/useLocalStorage';
import { Typography } from 'antd';
import Suspense from '../../../components/Suspense';
import { useUserPhotoList } from '../../../hooks/usePhotoGallery';
import UserImagePanel from '../../../components/UserImagePanel';
import { useUserFetch } from '../../../hooks/useLogin';

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
                        <Carousel autoplay>
                            {data && data.getUserPhotoList.map((data) => {
                                const url = data.imgUrl === '' ? data.imgLocal : data.imgUrl;
                                return <div key={data.id}>
                                    <h3>{data.title}</h3>
                                    <Image
                                        style={{
                                            minWidth: '100%',
                                            minHeight: '100%',
                                        }}
                                        src={url}
                                    />
                                </div>
                                
                            })}
                        </Carousel>
                        <Collapse>
                            <Collapse.Panel header={'Manage Your Photo'}>
                                <Suspense
                                    loading={loading}
                                    error={error}
                                    data={data}
                                    onRetry={retry}
                                >
                                    <UserImagePanel data={data?.getUserPhotoList} refetch={retry}/>
                                </Suspense>
                            </Collapse.Panel>
                        </Collapse>
                    </StyleCard>
                </Col>
            </Row>
        </StyleCard>
    );
}