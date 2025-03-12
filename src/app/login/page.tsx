import React from 'react';  

const LoginPage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1>Login</h1>
            <input type="text" placeholder='Email' className='border-2 border-gray-300 rounded-md p-2' />
            <input type='password' placeholder='Password' className='border-2 border-gray-300 rounded-md p-2' /> 
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Login</button>
        </div>
    )
}

export default LoginPage; 