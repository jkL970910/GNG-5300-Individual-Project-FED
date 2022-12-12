import React from 'react';
import { Row, Col } from 'antd';
import StyleCard from '../../../components/StyleCard';
import Suspense from '../../../components/Suspense';
import { usePhotoGallery } from '../../../hooks/usePhotoGallery';
import ImagePanel from '../../../components/ImagePanel';

export function PhotoGallery() {
    const {data, loading, error, refetch} = usePhotoGallery();
    return (
        <Row gutter={8} className='main'>
            <Col span={24}>
                <StyleCard style={{ background: 'rgb(218, 220, 224)' }}>
                    <Suspense
                        loading={loading}
                        error={error}
                        data={data}
                        onRetry={refetch}
                    >
                        <ImagePanel data={data?.getAllPhotos} refetch={refetch}/>
                    </Suspense>
                </StyleCard>
            </Col>
        </Row>
    );
}