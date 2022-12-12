import React from 'react';
import { Row, Col } from 'antd';
import StyleCard from '../../../components/StyleCard';
import Suspense from '../../../components/Suspense';
import ImagePanel from '../../../components/ImagePanel';
import { useLikedPhotoList } from '../../../hooks/usePhotoGallery';
import useLocalStorageState from '../../../hooks/useLocalStorage';

export function MyFavorite() {
    const [name,] = useLocalStorageState('current_user')
    const {data, loading, error, refetch} = useLikedPhotoList(name.username);
    return (
        <Row gutter={8} className='main'>
            <Col span={24}>
                <StyleCard style={{ background: 'rgb(218, 220, 224)' }}>
                    <Suspense
                        loading={loading}
                        error={error}
                        data={data?.getLikePhotoList}
                        onRetry={refetch}
                        emptyDescription={"No photos yet, select your first favorite photo now!"}
                    >
                        <ImagePanel data={data?.getLikePhotoList} refetch={refetch}/>
                    </Suspense>
                </StyleCard>
            </Col>
        </Row>
    );
}