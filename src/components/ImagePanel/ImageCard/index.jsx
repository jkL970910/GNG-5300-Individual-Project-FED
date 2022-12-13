import React from 'react';
import { Card, Image, message } from 'antd';
import './index.css';
import copy from 'copy-to-clipboard';
import { HeartOutlined, ShareAltOutlined, LoadingOutlined } from '@ant-design/icons';

const ImageCard = (props) => {
  const {
    data,
    loading,
    liked,
    onFavoriteChange
  } = props;
  const {id, description, imgLocal, imgUrl, title, uploadUser} = data;

  const url = imgUrl === '' ? imgLocal : imgUrl;

  const copyCode = () => {
    if (copy(url, {
      debug: true,
    })) message.success(`The link of ${title} has copied successfully, send it to your friends!`);
  };

  return (
    <div className={"imageCard"}>
      <Card
        hoverable
        style={{ width: '100%', display: 'inline-block', textAlign: 'center', marginBottom: '24px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{ textAlign: 'left' }}>
            <Image
              style={{maxWidth:'56rem', height:'auto'}}
              src={url}
            />
          </div>
          <div style={{ textAlign: 'left', flex: 1, margin: '30px' }}>
            <p style={{ fontSize: '48px', fontWeight: 'bold' }}>{title}</p>
            <div>
              <p style={{ fontSize: '24px', display:'inline-block' }}>Created By: {uploadUser}</p>
              <ShareAltOutlined 
                style={{ float: 'right', fontSize: '32px', marginLeft: '8px' }} 
                onClick={copyCode}
              />
              {loading ? 
                <LoadingOutlined style={{ fontSize: 25 }} />
              :
              <HeartOutlined 
                style={{ float: 'right', fontSize: '32px', color: liked ? 'red' : ''}} 
                onClick={() => onFavoriteChange(id, liked)}
              />}
            </div>
            <p style={{ fontSize: '30px' }}>{description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImageCard;