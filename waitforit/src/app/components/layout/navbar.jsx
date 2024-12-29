//navigation bar

'use client';



import { Button } from '../ui/button';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='flex justify-center'>
        <nav className="w-screen bg-white p-4">
            <div className=" text-gray-800 mx-auto flex justify-between items-center">
                <div className=" text-lg font-bold">
                <Link href="/">WaitForIt.io</Link>
                </div>
                <div className="space-x-4">
                <Link href="/dashboard">
                    <Button className="text-white bg-gray-800">Dashboard</Button>
                </Link>
                <Link href={"/login"}>
                    <Button className="text-white bg-gray-800">Login</Button>
                </Link>
                <Link href={"/signup"}>
                    <Button className="text-white bg-gray-800">Signup</Button>
                </Link>
                </div>
            </div>
        </nav>
    </div>
  );
}