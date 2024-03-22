import React from 'react';
import { Typography } from 'antd';
import '../styles/Home.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';



const { Title } = Typography;
const Home = () => (
  <div className="home-container">
  <h1>Welcome to Our Application</h1>
  <p>This is a simple Home page of Task Manager App!</p>
  <button><Link to="/login">Get Started</Link></button>
</div>
);

export default Home;
