import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: LoginUser } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        'http://localhost:7000/api/auth/login',
        {
          email,
          password,
        }
      );
      return response.data;
    },
    onSuccess: data => {
      console.log('logindata>>', data.message);
      localStorage.setItem('token1', data.token);
    },
  });

  return (
    <div className="bg-red-700  h-screen flex flex-col gap-2  justify-center items-center  text-amber-50 border-2">
      <input
        onChange={e => setEmail(e.target.value)}
        type="text"
        placeholder="email"
      />
      <input
        onChange={e => setPassword(e.target.value)}
        type="text"
        placeholder="password"
      />
      <button onClick={() => LoginUser()}>submit</button>
    </div>
  );
}

export default Login;
