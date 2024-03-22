import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { logout } from '../features/authSlice'; 
import { useNavigate } from 'react-router';

const { Header } = Layout;

const AppHeader = () => {
  const isAuthenticated = !!localStorage.getItem('token')
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');

  };

  return (
    <Header>
      <Menu style={{minWidth:'100%' }} theme="dark" mode="horizontal" selectable={false}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        {isAuthenticated ? (
          <>
            {/* Display a logout option if the user is authenticated */}
            <Menu.Item key="2" onClick={handleLogout}>Logout</Menu.Item>
          </>
        ) : (
          <>
            {/* Display login and register options if the user is not authenticated */}
            <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/register">Register</Link></Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default AppHeader;
