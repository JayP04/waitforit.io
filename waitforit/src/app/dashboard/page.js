'use client';

import Navbar from '../components/layout/navbar';
import React from 'react';
import Link from 'next/link';

export default function Dashboard() {


    return(
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className= "absolute inset-x-0 top-3 left-1/4 right-"><Navbar /></div>

      <div className="container text-white mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold top-15 text-center">
          Dashboard
        </h1>

        <div className='container  bg-gray mx-auto position-relative justify-center text-center mt-4 text-xl'>
            <Link href='/newcapsule'>
                <button className='bg-white text-black rounded-md px-4 py-2 mt-4'  >Create new capsule</button>
            </Link>
            
        </div>

      </div>


    </div>
    )
};