'use client';

import Navbar from '../components/layout/navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Dashboard() {
    return(
        <div className='flex flex-col mx-auto min-h-screen'>
            <Navbar />
            <div className="flex flex-col items-center justify-center max-h-screen">
                <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
                <p>Welcome to the dashboard</p>
            </div>
        </div>
    )
};