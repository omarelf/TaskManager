import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css'; 
import {  Button, List, Skeleton, Select, Badge } from 'antd';
import { fetchTasks, removeTask, selectTotalTasksCount } from '../features/taskSlice';
import AddTaskForm from './AddTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTasks, selectLoading } from '../features/taskSlice';

const Dashboard = () => {
  const [editingTask, setEditingTask] = useState(null); 

  const data = useSelector(selectAllTasks);
  const loading= useSelector(selectLoading);
  const totalTasks = useSelector(selectTotalTasksCount);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');


  const [page, setPage] = useState(1);
  const count = 2; 

  useEffect(() => {
    dispatch(fetchTasks(page, count));
  }, []); 

 
  const onLoadMore = () => {
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      dispatch(fetchTasks({ page: nextPage, count }));
      return nextPage;

    });
  };
  const handleEdit = (item) =>{
    setEditingTask(item);
    setIsModalOpen(true); 
  } 

  const handleDelete = (id)=>{
    dispatch(removeTask(id))
  }

  const loadMore =
    !loading && (data?.length < totalTasks)  ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  
 

  return (
    <div className="dashboard-container">
        <div className="dashboard-header">
        <AddTaskForm  isModalOpen={isModalOpen}   editingTask={editingTask} setEditingTask= {setEditingTask} setIsModalOpen={setIsModalOpen} />

            <div style={{ marginBottom: 16, marginTop: 16 }}>
                <Select
                  defaultValue="all"
                  style={{ width: 200 }}
                  onChange={value => setFilter(value)}
                >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="pending">Pending</Select.Option>
                    <Select.Option value="completed">Completed</Select.Option>
              </Select>
            </div>

        </div>
        <List
          className="demo-loadmore-list"
          loading={loading}
          loadMore={loadMore}

          itemLayout="horizontal"
          dataSource={filter === 'all' ? data : data.filter(task => task.status === filter)}
          renderItem={(item) => (
            <List.Item key={item._id} actions={[
              <a onClick={() => handleEdit(item)} key="edit">edit</a>,
              <a onClick={() => handleDelete(item._id)} key="delete">delete</a>
            ]}>
              <Skeleton title={true} loading={item.loading} active>
                <div className="flex-container">
                  <div className="task-title">{item.title}</div>
                  <div className="task-description">{item.description}</div>
                  <div className="task-status">{item.status === 'completed' ? <Badge status="success" text="Completed" /> : <Badge status="error" text="Pending" />}</div>
                </div>
              </Skeleton>
            </List.Item>
            
          )}
        />
      </div>

  );
};

export default Dashboard;
