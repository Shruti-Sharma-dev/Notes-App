import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider.jsx';
const Login = () => {


const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const {login} = useAuth();

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( email, password);

    try {
        const response = await axios.post(  `${import.meta.env.VITE_API_URL}/auth/login`, {
          
            email,
            password
           
        })
        if(response.data.success){
            login(response.data.user);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        }
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

    return (

        <div className="flex h-screen flex-col items-center justify-center gap-6 bg-teal-500 px-4">
            <div className='flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg w-full max-w-md sm:p-8 h-[80vh] max-h-[700px]'>
                <h2 className='text-2xl font-bold mb-20'>Login</h2>

                <form onSubmit={handleSubmit}>
                    
                    <div className='mb-4'>
                        <label htmlFor="email" className='block  text-2xl text-gray-700'>Email</label>
                        <input type="email" id="email" name="email " required className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-2xl px-3 py-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="password" className='block  text-2xl text-gray-700'>Password</label>
                        <input type="password" id="password" name="password" placeholder='********' required className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-2xl px-3 py-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  

                    <div className='mb-4'>
                        <button type='submit' className='w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 text-2xl'>Login</button>

                        <p className='text-sm text-gray-500'>Dont't have an account? <Link to='/register' className='text-teal-500 hover:text-teal-700'>Signup</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;