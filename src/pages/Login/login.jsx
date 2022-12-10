import {useEffect, useState} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useLogin } from '../../hooks/useLogin';

export function LoginPage() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const {getLoginUser} = useLogin(setLoginSuccess)
  
  const navigate = useNavigate()

  const onFinish = values => {
    getLoginUser({ variables: {username: values['username'], password: values['password']}})
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate("/image_channel")
    }
  }, [navigate, loginSuccess])
  
  return (
    <motion.div 
      className="login-page"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login"/>
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Image Channel</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
              <Button onClick={() => navigate("/register")} type="link">Don't have an account? Register here!</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </motion.div>
  );
}