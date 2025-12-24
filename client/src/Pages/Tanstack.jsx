import React from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Modal, message } from 'antd';

function Tanstack() {
  const queryClient = useQueryClient();
  const [TaskName, setTaskName] = useState('');
  const [editId, setEditId] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: queryData } = useQuery({
    queryKey: ['userDetail'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:7000/api/add');
      console.log(response.data.data);
      return response.data.data;
    },
  });
  const { mutate: addTodo } = useMutation({
    mutationFn: async name => {
      const response = await axios.post('http://localhost:7000/api/add', {
        task: name,
      });
      console.log(response);
      return response;
    },
    onSuccess: data => {
      console.log(data.data.message);
      queryClient.invalidateQueries(['userDetail']);
    },
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async id => {
      const response = await axios.delete(
        `http://localhost:7000/api/add/${id}`
      );
      console.log(response);
      return response;
    },
    onSuccess: data => {
      console.log(data.data.message);
      queryClient.invalidateQueries(['userDetail']);
    },
  });
  const { mutate: updateTodo } = useMutation({
    mutationFn: async id => {
      const response = await axios.patch(
        `http://localhost:7000/api/add/${id}`,
        {
          task: TaskName,
        }
      );
      console.log(response);
      return response;
    },
    onSuccess: data => {
      console.log(data.data.message);
      queryClient.invalidateQueries(['userDetail']);
      handleOk();
    },
  });

  return (
    <>
      <div className="bg-red-400">
        <input
          onChange={e => setTaskName(e.target.value)}
          type="text"
          placeholder="TYPE TASK NAME"
        />
        <button
          onClick={() => {
            console.log(TaskName);
            addTodo(TaskName);
          }}
        >
          add
        </button>
      </div>

      <div className=" bg-amber-300">
        {queryData?.map(item => (
          <div className="bg-red-600">
            {item.task}{' '}
            <button
              className="bg-red-400 pl-3"
              onClick={() => deleteTodo(item._id)}
            >
              delete
            </button>{' '}
            <button
              className="bg-red-400 pl-3"
              onClick={() => {
                setEditId(item._id);
                showModal();
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          name="title"
          onChange={e => setTaskName(e.target.value)}
          placeholder="title"
        />

        <button onClick={() => updateTodo(editId)}>Submit</button>
      </Modal>
    </>
  );
}
export default Tanstack;
