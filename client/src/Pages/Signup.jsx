import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const userCreate = async () => {
  //     const response = await axios.post('http://localhost:7000/api/auth', {
  //       name,
  //       email,
  //       password,
  //     });
  //     console.log(response.data.data);
  //   };

  const { mutate: createUser } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        'http://localhost:7000/api/auth/signup',
        {
          name: name,
          email: email,
          password: password,
        }
      );
      console.log(response);
      return response;
    },
    onSuccess: data => {
      console.log('registerData>>', data.data.token);
      localStorage.setItem('token1', data.data.token);
    },
  });
  return (
    <>
      <div className="bg-red-700  h-screen flex flex-col gap-2  justify-center items-center  text-amber-50 border-2 ">
        <input
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder="ENTER YOUR NAME"
        />
        <input
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="EMAIL"
        />
        <input
          className="text-white"
          onChange={e => setPassword(e.target.value)}
          type="text"
          placeholder="PASSWORD..."
        />
        <button onClick={() => createUser()} className="bg-amber-400" bg->
          Submit
        </button>
      </div>
    </>
  );
}

export default Signup;
