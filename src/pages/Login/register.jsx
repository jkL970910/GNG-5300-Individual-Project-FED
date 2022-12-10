import {useState, useEffect} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './login.css';
import { useNavigate } from 'react-router';
import { useRegister } from '../../hooks/useLogin';

export function RegisterPage() {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const {getRegister} = useRegister(setRegisterSuccess)

    let navigate = useNavigate()

    const onFinish = values => {
      if (values['password'] !== values['confirmPassword']) {
        alert("Password should be matched!")
      } else {
        getRegister({ variables: {username: values['username'], password: values['password']}})
      }
    };

    useEffect(() => {
      if (registerSuccess) {
        alert("Register Success!")
        navigate("/login")
      }
    }, [navigate, registerSuccess])
    
    const onFinishFailed = errorInfo => {
        alert('Failed:', errorInfo);
    };
    
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
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Almost There</p>
              <p>Start your journey from here</p>
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
              <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: 'Please confirm your password!' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirm Password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Register
                </Button>
              </Form.Item>
              <Form.Item name="remember" >
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={() => navigate("/login")} type="link">Back to login</Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </motion.div>
    );
}