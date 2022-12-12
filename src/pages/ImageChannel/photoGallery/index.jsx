import React from 'react';
import StyleCard from '../../../components/StyleCard';
import Suspense from '../../../components/Suspense';
import { usePhotoGallery } from '../../../hooks/usePhotoGallery';
import ImagePanel from '../../../components/ImagePanel';

export function PhotoGallery() {
    const {data, loading, error, refetch} = usePhotoGallery();
    return (
        <StyleCard style={{ background: "rgba(0,0,0,0.2)" }}>
            <Suspense
                loading={loading}
                error={error}
                data={data}
                onRetry={refetch}
            >
                <ImagePanel data={data?.getAllPhotos} refetch={refetch}/>
            </Suspense>
        </StyleCard>
    );
}