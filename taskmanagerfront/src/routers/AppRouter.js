import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppHeader from '../components/Header';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import PrivateRoute from '../components/privateRoute';



const TaskManager = ()=>(
    <BrowserRouter>
    <div>
        <AppHeader/>
        <Routes>
        <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" 
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>} 
                />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </div>
</BrowserRouter>
)

export default TaskManager ;