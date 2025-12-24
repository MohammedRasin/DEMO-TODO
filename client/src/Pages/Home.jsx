import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, message } from 'antd';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

function Home() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [change, setChange] = useState(false);
  const [movie, setMovie] = useState({
    title: '',
    desc: '',
    imdb: '',
  });

  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
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

  // new states for editing
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // create todo
  const todoCreate = async () => {
    await axios.post('http://localhost:7000/api/add', { task: input });
    setInput('');
    setChange(prev => !prev); // refresh list
    messageApi.open({ type: 'success', content: 'task created ' });
  };

  // get all todos
  const getTodos = async () => {
    const response = await axios.get('http://localhost:7000/api/add');
    setTodos(response.data.data);
  };

  // delete todo
  const deleteTodo = async id => {
    const localToken = localStorage.getItem('token');

    await axios.delete(`http://localhost:7000/api/add/${id}`, {
      headers: { Authorization: `Bearer ${localToken}` },
    });

    setChange(prev => !prev);
  };

  // update todo
  const updateTodo = async id => {
    await axios.patch(`http://localhost:7000/api/add/${id}`, {
      task: editText,
    });
    setEditId(null);
    setEditText('');
    setChange(prev => !prev);
  };

  const { data: queryData, refetch } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:7000/api/add');
      return response.data.data;
    },
  });

  const { mutate: createTodo } = useMutation({
    mutationFn: async input2 => {
      const response = await axios.post('http://localhost:7000/api/add', {
        task: input2,
      });
      console.log(response);
      return response;
    },
    onSuccess: data => {
      console.log('data>>', data.data.token);
      localStorage.setItem('token', data?.data?.token);

      messageApi.open({ type: 'success', content: data?.data?.message });
      queryClient.invalidateQueries(['userDetails']);
    },
  });

  // useEffect(() => {
  //   getTodos();
  // }, [change]);v

  const addField = e => {
    const { name, value } = e.target;
    console.log(name, 'name -> value', value);
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="min-h-1 max-w-full border-4 border-black flex justify-center p-5">
        <h1 className="text-6xl text-amber-400">TO-DO-LIST</h1>
      </div>

      <div className="border-4 border-amber-900 flex justify-center p-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-80 border p-2 rounded"
          type="text"
          placeholder="Enter Your Task Today"
        />
        <div className="flex justify-between w-30 p-2 gap-2">
          <button
            // onClick={todoCreate}
            onClick={() => createTodo(input)}
            className="bg-green-700 text-white rounded-xl p-2"
          >
            Add
          </button>
          <button
            onClick={() => refetch()}
            className="bg-blue-700 text-white rounded-xl p-2"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-gray-900 text-amber-400 min-h-[700px] flex-col flex gap-5 p-5">
        {contextHolder}

        <Modal
          title="Basic Modal"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <input name="title" onChange={addField} placeholder="title" />
          <input name="desc" onChange={addField} placeholder="desc" />
          <button onClick={() => console.log(movie)}>console</button>
        </Modal>

        {queryData?.map(item => (
          <div
            key={item._id}
            className="bg-green-400 min-h-[60px] flex gap-2 px-4 justify-between items-center rounded-2xl"
          >
            {editId === item._id ? (
              <input
                value={editText}
                onChange={e => setEditText(e.target.value)}
                className="p-1 rounded text-black w-full"
              />
            ) : (
              <p className="text-black text-lg">{item.task}</p>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                className="bg-red-500 p-2 rounded-xl text-white"
                onClick={() => deleteTodo(item._id)}
              >
                Delete
              </button>

              {editId === item._id ? (
                <button
                  className="bg-green-600 p-2 rounded-xl text-white"
                  onClick={() => updateTodo(item._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 p-2 rounded-xl text-white"
                  onClick={() => {
                    setEditId(item._id);
                    showModal();
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
