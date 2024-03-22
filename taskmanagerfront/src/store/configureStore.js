import {configureStore} from '@reduxjs/toolkit'
import tasksReducer from '../features/taskSlice';
import authReducer from '../features/authSlice';


export default ()=>{
const store = configureStore( {
    reducer: {
    auth: authReducer,
    tasks: tasksReducer

  },
    },
    )
    return store;



}
