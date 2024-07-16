import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-red-500">Oops!</h1>
      <p className="text-lg lg:text-xl mb-8 text-gray-300">Something went wrong. Please try again later.</p>
      <Link to="/" className="text-blue-500 hover:underline">Go to Homepage</Link>
    </div>
  );
};

export default ErrorPage;
