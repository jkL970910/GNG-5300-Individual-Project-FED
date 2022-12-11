import {useEffect, useState} from 'react';
import { Row, Col, Button, Modal, Form, Input  } from 'antd';
import StyleCard from '../../../components/StyleCard';
import FileUploadZone from '../../../components/FileUploadZone';
import { usePhotoUpload } from '../../../hooks/usePhotoUpload';
import useLocalStorageState from '../../../hooks/useLocalStorage';

export function PhotoUpload() {
    const [file, setFile] = useState();
    const [name,] = useLocalStorageState('current_user')
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const {setUploadPhoto, loading} = usePhotoUpload(setUploadSuccess)
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();

    const handleOnDrop = (e) => {
        getBase64(e[0])
    }

    const handleUpload = (values) => {
        values['localUrl'] = file || '';
        values['imageUrl'] = values['imageUrl'] || '';
        values['uploadedUser'] = name.username;
        setUploadPhoto({ variables: {username: values['uploadedUser'], photoTitle: values['title'], description: values['description'], imgUrl: values['imageUrl'], imgLocal: values['localUrl'] }})
    }

    useEffect(() => {
        if (uploadSuccess) {
            setShowModal(false);
            alert("Photo uploaded successfully!")
        }
    }, [uploadSuccess, file])
    
    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setFile(reader.result)
            setShowModal(true)
        };
        reader.onerror = function (error) {
          alert('Upload Error: ', error);
        };
    }

    const resetModal = () => {
        setShowModal(false);
        setFile(undefined);
        form.resetFields();
    }
    
    return (
        <Row gutter={8} className='main'>
            <Col span={24}>
                <StyleCard style={{ background: 'rgb(218, 220, 224)' }}>
                    <FileUploadZone onDrop={handleOnDrop} />
                </StyleCard>
                <Button
                    onClick={() => {setShowModal(true)}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#3da58a', ':hover': {bgcolor:'green'}}}
                    >
                    Upload Image From Network
                </Button>
            </Col>
            <Modal
                title={'Merge Selected Columns'}
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
                            form='photoForm'
                            style={{marginLeft: '10px'}}
                            htmlType="submit"
                            variant="contained"
                            loading={loading}
                        >
                            Upload
                        </Button>
                    </div>
                ]}
            >
                <Form 
                    id={'photoForm'}
                    name={'photoForm'}
                    onFinish={handleUpload}
                    form={form}
                >
                    <Form.Item 
                        name="title" 
                        label="Photo Title" 
                        rules={[{ required: true, message: 'Please input the photo title!' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        name="description" 
                        label="Photo Description" 
                        rules={[{ required: true, message: 'Please input the photo description!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item 
                        name="localUrl"
                        label="Uploaded Local Image"
                    >
                        <Input.TextArea disabled= {true} defaultValue={file} placeholder={file ? 'URL: ' + file.toString().substring(0,30) + '...' : 'No local image uploaded'}/>
                    </Form.Item>
                    <Form.Item 
                        name="imageUrl"
                        label="Uploaded Network Image"
                        rules={[{ required: !file, message: "Please input a network image url or upload from local" }]}
                    >
                        <Input defaultValue='' disabled= {file}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Row>
    );
}