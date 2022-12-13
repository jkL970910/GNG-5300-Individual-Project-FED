import {useState} from 'react';
import { Row, Col } from 'antd';
import ImageCard from './ImageCard';
import useLocalStorageState from '../../hooks/useLocalStorage';
import { useUserLikedPhoto, useUserUnlikedPhoto } from '../../hooks/useUserUpdate';

const ImagePanel = (props) => {
  const {
    data,
    refetch,
    panelTitle,
  } = props;

  const [user,setUser] = useLocalStorageState('current_user')
  const [, setUploadSuccess] = useState(false);

  const onUploadSuccess = (uploadSuccess, user) => {
    setUploadSuccess(uploadSuccess)
    setUser(user)
    refetch()
  }

  const {likedPhoto, likedLoading} = useUserLikedPhoto(onUploadSuccess)
  const {unlikedPhoto, unlikedloading} = useUserUnlikedPhoto(onUploadSuccess)
  
  const favoriteUpdate = (photoId, liked) => {
    liked ? 
    unlikedPhoto({ variables: {username: user['username'], photoID: photoId}})
    :
    likedPhoto({ variables: {username: user['username'], photoID: photoId}})
  }

  return (
    <Row gutter={8}>
      <Col xl={24} lg={24} sm={24} xs={24}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{ marginTop: '-24px', marginBottom: '16px', display: 'inline-block', float: 'center' }}>
            <p style={{ fontSize: '48px', fontWeight: 'bold', textAlign: 'left', marginBottom: 0}}>{panelTitle}</p>
          </div>
        </div>
      </Col>
      {data && data.map((o) => (
        <Col key={o.id} xl={24} lg={24} sm={24} xs={24}>
          <ImageCard data={o} loading={likedLoading || unlikedloading} liked={user['likedList']?.includes(o.id)} onFavoriteChange={favoriteUpdate}/>
        </Col>
      ))}
    </Row>
  );
};

export default ImagePanel;