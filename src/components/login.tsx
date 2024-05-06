import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const maxRetries: number = 6;
    let retries: number = 0;

    while (retries <= maxRetries) {
      try {
        const response = await axios.post('https://dummy.restapiexample.com/api/v1/create', data);
        console.log(`Response for ID ${data.email}:`, response.data);
        return;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log(`Too many requests. Retrying in ${2 ** retries * 1000} milliseconds...`);
          await new Promise((resolve) => setTimeout(resolve, 2 ** retries * 1000));
          retries++;
        } else {
          console.error(error);
        }
      }
    }

    console.error('Max retries exceeded. Unable to process request.');
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">Name:</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            aria-label="Name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name &&
            <span className="text-red-500">{errors.name.message}</span>
          }
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            aria-label="Email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email &&
            <span className="text-red-500">{errors.email.message}</span>
          }
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold">Password:</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            aria-label="Password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.password &&
            <span className="text-red-500">{errors.password.message}</span>
          }
        </div>

        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">Don't have an account?
        <Link to="/register" className="text-indigo-500 hover:underline">Register Here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
