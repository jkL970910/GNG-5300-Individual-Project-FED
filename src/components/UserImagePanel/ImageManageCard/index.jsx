import React from 'react';
import { Button, Card, Popconfirm } from 'antd';
import './index.css';

const ImageManageCard = (props) => {
  const {
    data,
    onChangeRequest
  } = props;
  const {imgLocal, imgUrl, title} = data;

  const url = imgUrl === '' ? imgLocal : imgUrl;

  return (
    <div className={"userImageCard"}>
      <Card
        hoverable
        style={{ width: '100%', display: 'inline-block', textAlign: 'center', marginBottom: '24px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{ textAlign: 'left' }}>
            <img src={url} alt='' />
          </div>
          <div style={{ textAlign: 'left', flex: 1, margin: '30px' }}>
            <p style={{ fontSize: '48px', fontWeight: 'bold' }}>{title}</p>
          </div>
          <Button onClick={() => {onChangeRequest(data, 'update')}}>Update</Button>
          <Popconfirm placement="topRight" title={"Are you sure you wanna delete this photo?"} okText="Yes" cancelText="No" onConfirm={() => {onChangeRequest(data, 'delete')}}>
            <Button>Delete</Button>
          </Popconfirm>
        </div>
      </Card>
    </div>
  );
};

export default ImageManageCard;