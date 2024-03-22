import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { Form, Input, Button, Card, notification } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/Register.css'; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) => {
      
    setFormData({ ...formData, [e.target.name]: e.target.value })
};

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      notification.error({
        message: 'Error',
        description: "Passwords don't match",
      });
      return;
    }

    try {
      await registerUser({ username, email, password });
      notification.success({
        message: 'Registration Successful',
        description: 'You have been successfully registered!',
      });
      navigate('/login'); 
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description:'An error occurred during registration.',
      });
    }
  };

  return (
    <div className="register-container">
    <Card className="register-card">
      <Form
        name="register"
        className="register-form"
        onFinish={onSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input name="username" prefix={<UserOutlined className="site-form-item-icon" />} value={username} placeholder="Username" onChange={onChange} />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          <Input  name="email" prefix={<MailOutlined className="site-form-item-icon" />} value={email} placeholder="Email" onChange={onChange} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          hasFeedback
        >
          <Input.Password
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
  );
};

export default Register;
