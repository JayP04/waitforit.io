//login page
'use client';

import Navbar from '../components/layout/navbar';



import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
      // Redirect to home page or dashboard after successful login
    } catch (error) {
      setError(error.message);
      console.log('login failed, user not found');
    }
  };

  return (
    <div className='flex flex-col mx-auto min-h-screen  '>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-h-screen">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login 
            </button>
          </div>
          {error && <p>{error}</p>}
          <p className="text-sm mt-4">Don't have an account? <a href="/signup" className="text-blue-500">Signup</a></p>
        </form>
      </div>
    </div>
  );
}

