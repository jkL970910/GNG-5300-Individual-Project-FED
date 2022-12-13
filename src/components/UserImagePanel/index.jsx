import {useEffect, useState} from 'react';
import { Row, Col, Modal, Button, Form, Input } from 'antd';
import { usePhotoDelete, usePhotoUpdate } from '../../hooks/usePhotoUpdate';
import ImageManageCard from './ImageManageCard';

const UserImagePanel = (props) => {
  const {
    data,
    refetch,
  } = props;

  const [form] = Form.useForm();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const {setUpdatePhoto, loading: updateLoading} = usePhotoUpdate(setUpdateSuccess)
  const {setDeletePhoto, loading: deleteLoading} = usePhotoDelete(setDeleteSuccess)

  useEffect(() => {
    if (updateSuccess) {
      setShowModal(false);
      setUpdateSuccess(false);
      alert("Photo updated successfully!")
      refetch()
    } else if (deleteSuccess) {
      setShowModal(false);
      setDeleteSuccess(false);
      alert("Photo deleted successfully!")
      refetch()
    }
  }, [refetch, updateSuccess, deleteSuccess])
  
  const handleRequest = (value, requestType) => {
    if (requestType === 'update') {
      setSelectedPhoto(value);
      form.setFieldValue({
        title: value.title,
        description: value.description,
        localUrl: value.imgLocal,
        imageUrl: value.imgUrl
      })
      setShowModal(true);
    }
    if (requestType === 'delete') {
      setDeletePhoto({ variables: {photoID: value.id} })
    }
  }

  const handleUpdate = (value) => {
    setUpdatePhoto({ variables: {photoID: selectedPhoto.id, photoTitle: value.title, description: value.description, imgUrl: selectedPhoto.imgUrl, imgLocal: selectedPhoto.imgLocal} })
  }

  const resetModal = () => {
    setShowModal(false);
    setSelectedPhoto(undefined);
    form.resetFields();
}

  return (
    <Row gutter={2}>
      {data && data.map((o) => (
        <Col key={o.id} xl={24} lg={24} sm={24} xs={24}>
          <ImageManageCard data={o} loading={updateLoading || deleteLoading} onChangeRequest={handleRequest}/>
        </Col>
      ))}
      <Modal
        key={'updateModel'}
        title={'Update Your Photo'}
        open={showModal} 
        width='50%' 
        onCancel={() => {resetModal()}}
        forceRender={true}
        footer={[
        <div>
          <Button type="primary" onClick={() => {resetModal()}}>
            Cancel
          </Button>
          <Button
            key="submit"
            form='photoUpdateForm'
            style={{marginLeft: '10px'}}
            htmlType="submit"
            variant="contained"
            loading={updateLoading}
          >
            Update
          </Button>
        </div>
      ]}
    >
        <Form
          id={'photoUpdateForm'}
          key={'photoUpdateForm'}
          name={'photoUpdateForm'}
          onFinish={handleUpdate}
          form={form}
        >
          <Form.Item 
            name="title" 
            label="Photo Title" 
            rules={[{ required: true, message: 'Please input the photo title!' }]}
          >
            <Input placeholder={selectedPhoto?.title}/>
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Photo Description" 
            rules={[{ required: true, message: 'Please input the photo description!' }]}
          >
            <Input.TextArea placeholder={selectedPhoto?.description} />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default UserImagePanel;