import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks as apiFetchTasks, addTask, updateTask, deleteTask   } from '../api/taskApi'; // Renamed to avoid conflict

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  totalTasks:0
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ page, count }, { rejectWithValue }) => {
    try {
      const response = await apiFetchTasks(page, count);
      return response; 
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (initialTask, { rejectWithValue }) => {
    try {
      const response = await addTask(initialTask);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const editTask = createAsyncThunk(
    'tasks/editTask',
    async ({ id, updatedTask }, { rejectWithValue }) => {
      try {
        const response = await updateTask(id, updatedTask);
        return response;
      } catch (error) {
        return rejectWithValue(error.toString());
      }
    }
  );

  export const removeTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, { rejectWithValue }) => {
      try {
        await deleteTask(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.toString());
      }
    }
  );

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.totalTasks = action.payload.totalTasks;
        state.tasks =[...state.tasks, ...action.payload.tasks];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        action.payload.status = 'pending'; 
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload; 
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload); 
      });
    
  },
});
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectLoading =( state) => state.tasks.loading;
export const selectTotalTasksCount = (state)=> state.tasks.totalTasks;

export default taskSlice.reducer;
