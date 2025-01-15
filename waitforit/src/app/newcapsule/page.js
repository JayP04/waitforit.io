//new capsule creation page
'use client';

import Navbar from '../components/layout/navbar';
import { Input } from '@/app/components/ui/input';
import { useState } from 'react';




export default function NewCapsule() {

    //state for the table inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [recipients, setRecipients] = useState('');

    //erroe and success
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    //form submnission handle func
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //if something empty is submittedd
        if(!title || !description || !releaseDate || !recipients){
            setError('Please fill all the fields');
            setSuccess('');
            return;
        }

        //send to the backedn
        try {
            const response = await fetch('http://localhost:5000/capsules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },//sedning the json data
                body: JSON.stringify({
                    title,
                    description,
                    releaseDate,
                    recipients
                })
            });

            //getting the response
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            //if success
            setSuccess('Capsule created successfully', data.message);
            setError('');
            setTitle('');
            setDescription('');
            setReleaseDate('');
            setRecipients('');
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };




    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-800'>
            <div className='absolute inset-x-0 top-3 left-1/4 right-'><Navbar /></div>
            <div className='container text-white mx-auto px-4 py-12'>
                <h1 className='text-4xl font-bold top-15 text-center'>New Capsule</h1>
                <form onSubmit={handleSubmit} className='container text-black bg-gray mx-auto position-relative justify-center text-center mt-4 text-xl'>
                    <Input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value) } /><br />
                    <Input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value) } /><br/>
                    <Input placeholder='MM/DD/YYYY' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value) } /><br/>
                    <Input placeholder='recipients' value={recipients} onChange={(e) => setRecipients(e.target.value) } /><br/>
                    {error && <p className='text-red-500 text-sm italic'>{error}</p>}
                    {success && <p className='text-green-500 text-sm italic'>{success}</p>}
                    <button className='bg-white text-black rounded-md px-4 py-2 mt-4' type='submit'>Create</button>
                </form>
            </div>
        </div>
    );
}