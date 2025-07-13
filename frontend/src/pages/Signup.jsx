import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
 
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
       

        try {
            const response = await axios.post( `${import.meta.env.VITE_API_URL}/auth/register`, {
                name,
                email,
                password

            })
            if (response.data.success) {
                navigate('/login');
            }
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="flex h-screen flex-col items-center justify-center gap-6 bg-teal-500 px-4">
            <div className='flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg w-full max-w-md sm:p-8 h-[80vh] max-h-[700px]'>
                <h2 className='text-2xl font-bold mb-4'>Signup</h2>

                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="name" className='block  text-2xl text-gray-700'>Name</label>


                        <input type="text" id="name" name="name" placeholder='Enter your name' required className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-2xl px-3 py-2' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="email" className='block  text-2xl text-gray-700'>Email</label>
                        <input type="email" id="email" name="email " required className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-2xl px-3 py-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="password" className='block  text-2xl text-gray-700'>Password</label>
                        <input type="password" id="password" name="password" placeholder='********' required className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-2xl px-3 py-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="confirmPassword" className='block  text-2xl text-gray-700'>Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder='********' required className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-2xl px-3 py-2' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    {confirmPassword && password !== confirmPassword && (
  <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
)}


                    <div className='mb-4'>
                        <button type='submit' className='w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 text-2xl'   disabled={confirmPassword && password !== confirmPassword}  >Signup</button>

                        <p className='text-sm text-gray-500'>Already have an account? <Link to='/login' className='text-teal-500 hover:text-teal-600'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;