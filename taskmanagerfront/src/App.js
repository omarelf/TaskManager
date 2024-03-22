
import React from 'react';
import ReactDOM from 'react-dom';
import TaskManager from './routers/AppRouter';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore';
import {setAuthToken } from './api/authApi';
import { fetchTasks } from './features/taskSlice';

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}
const store = configureStore();




const App = ()=>(
    <Provider store ={store}>
        <TaskManager/>
    </Provider>
)

export default App;
