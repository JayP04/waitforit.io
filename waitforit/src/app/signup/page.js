//singup page.

'use client';

import Navbar from '../components/layout/navbar';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created successfully');
        } catch (error) {
            setError(error.message);
            console.log('User creation failed');
        }
    };

    return(
        <div className='flex flex-col mx-auto min-h-screen'>
            <Navbar />
            <div className="flex flex-col items-center justify-center max-h-screen">
                <h1 className="text-4xl font-bold mb-8">Signup</h1>
                <form onSubmit={handleSignup} className="w-full max-w-sm">
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
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Signup
                    </button>
                    {error && <p>{error}</p>}
                    <p className="text-sm mt-4">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
                </form>
            </div>
        </div>
    )

}