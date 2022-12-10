import React from 'react';
import { Row, Col } from 'antd';
import ImageCard from './ImageCard';

const ImagePanel = (props) => {
  const {
    data,
  } = props;

  return (
    <Row gutter={8}>
      <Col xl={24} lg={24} sm={24} xs={24}>
        <div style={{ display: 'inline-block', float: 'left' }}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'left', marginBottom: 0}}>Explore Insights Here</p>
        </div>
      </Col>
      {data && data.map((o) => (
        <Col xl={24} lg={24} sm={24} xs={24}>
          <ImageCard data={o} />
        </Col>
      ))}
    </Row>
  );
};

export default ImagePanel;