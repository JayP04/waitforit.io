// File: home.js

import Navbar from './components/layout/navbar';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className= "absolute inset-x-0 top-3 left-1/4 right-"><Navbar /></div>

      <div className="container text-white mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center">
          WaitForIt.io
        </h1>
        <p className="text-center mt-4 text-xl">
          The legendary way to send messages to the future!
       </p>
      </div>
      <div className='container text-white mx-auto px-4 py-12 '>
        <h1 className='text-2xl font-bold text-center mt-8'>How does it work?</h1>
      </div>


    </div>
  )
}