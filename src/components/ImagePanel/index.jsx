import {useState} from 'react';
import { Row, Col } from 'antd';
import ImageCard from './ImageCard';
import useLocalStorageState from '../../hooks/useLocalStorage';
import { useUserLikedPhoto, useUserUnlikedPhoto } from '../../hooks/useUserUpdate';

const ImagePanel = (props) => {
  const {
    data,
  } = props;

  const [name,] = useLocalStorageState('current_user')
  const [, setUploadSuccess] = useState(false);
  const {likedPhoto, likedLoading} = useUserLikedPhoto(setUploadSuccess)
  const {unlikedPhoto, unlikedloading} = useUserUnlikedPhoto(setUploadSuccess)

  const favoriteUpdate = (photoId, liked) => {
    liked ? 
    unlikedPhoto({ variables: {username: name['username'], photoId: photoId}})
    :
    likedPhoto({ variables: {username: name['username'], photoId: photoId}})
  }

  return (
    <Row gutter={8}>
      <Col xl={24} lg={24} sm={24} xs={24}>
        <div style={{ display: 'inline-block', float: 'left' }}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'left', marginBottom: 0}}>Explore Landscapes Here</p>
        </div>
      </Col>
      {data && data.map((o) => (
        <Col xl={24} lg={24} sm={24} xs={24}>
          <ImageCard data={o} loading={likedLoading || unlikedloading} liked={name['likedList'].includes(o.id)} onFavoriteChange={favoriteUpdate}/>
        </Col>
      ))}
    </Row>
  );
};

export default ImagePanel;