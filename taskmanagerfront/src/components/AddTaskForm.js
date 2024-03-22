import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, editTask } from '../features/taskSlice';

const TaskCreationModal = ({isModalOpen, setIsModalOpen, editingTask, setEditingTask}) => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    
  
    const showModal = () => {
    setEditingTask(null); // Reset editingTask

      setIsModalOpen(true);
    };

    useEffect(() => {
        if (editingTask) {
          form.setFieldsValue({
            title: editingTask.title,
            description: editingTask.description,
            status:editingTask.status
          });

        } else {
          form.resetFields();
        }

      }, [editingTask, form]);




    
    
    const onSavePostClicked = () => {
            try {
                if(editingTask){
                    dispatch(editTask({id: editingTask._id, updatedTask:{...editingTask , ...form.getFieldsValue()}}));
                    form.resetFields();
                    setIsModalOpen(false);
                    editingTask ={};

                }else{
                    dispatch(addNewTask({ title, description })).unwrap()
                    form.resetFields();
                    setIsModalOpen(false);
                }
                

            } catch (err) {
                console.error('Failed to save the post', err)
            }
        

    }
  
  
  
    const handleCancel = () => {
      setIsModalOpen(false);
      form.resetFields();

    };
  
    return (
      <>
        <Button type="primary" className="Dashboard_task-btn" onClick={showModal}>Add New Task</Button>

        <Modal title="Create New Task" open={isModalOpen} onOk={onSavePostClicked} onCancel={handleCancel} footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onSavePostClicked}>
            Submit
          </Button>,
        ]}>
          <Form form={form} layout="vertical" name="taskForm">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input the title!' }]}
              onChange={(e) => setTitle(e.target.value)}

            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input the description!' }]}
              onChange={(e) => setDescription(e.target.value)}

            >
              <Input.TextArea rows={4} />
            </Form.Item>
            {editingTask && (
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>
        )}
        {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingTask ? "Save Changes" : "Add Task"}
          </Button>
        </Form.Item> */}
            
          </Form>
        </Modal>
      </>
    );
  };
  
  export default TaskCreationModal;
  