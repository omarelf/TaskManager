import React, { useState } from 'react';
import { loginUser, setAuthToken } from '../api/authApi';
import { Form, Input, Button, Card, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/Login.css'; 
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../features/authSlice'
import { useNavigate } from 'react-router';
import { fetchTasks } from '../features/taskSlice';



const authenticateUser = async (username, password) => {

  try {
    const response = await loginUser({username, password});

    if (response && response.user) {
        return response;
    } else {
        throw new Error('An error occurred while logging in');
        
    }
} catch (error) {
    throw new Error(error.message);
}

  
};
 

const Login = (props) => {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        dispatch(loginRequest());
        try {
            const { user, token } = await authenticateUser(username, password);
            dispatch(loginSuccess( {user, token }));
            navigate('/dashboard');
            dispatch(fetchTasks(1,5))
            notification.success({
              message: 'Login Successful',
              description: 'You have been successfully Logged In!',
            });
            
        } catch (error) {
            dispatch(loginFailure(error.message));
            notification.error({
              message: 'Error',
              description: "Error While Log in!",
            });
        }
    };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input 
              name="username" 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!'  }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
