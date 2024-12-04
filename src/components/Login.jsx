// FILEPATH: /d:/student-voting_system/front-end/src/components/Login.jsx

import React from 'react';
import { motion } from 'framer-motion';

const Login = ({ loginStudentId, setStudentData, onLogin }) => {
  const handleChange = (e) => {
    setStudentData((prev) => ({ ...prev, loginStudentId: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-center text-indigo-600 mb-6"
      >
        Student Login
      </motion.h2>
      <form onSubmit={(e) => { e.preventDefault(); onLogin(loginStudentId); }}>
        <div className="mb-6">
          <label htmlFor="loginStudentId" className="block text-sm font-medium text-gray-700 mb-2">
            Student ID
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            type="text"
            id="loginStudentId"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter your Student ID"
            value={loginStudentId}
            onChange={handleChange}
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300 text-lg font-semibold"
        >
          Login
        </motion.button>
      </form>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm text-gray-600"
      >
        Don't have an account?{' '}
        <button
          onClick={() => {/* Add your switchToRegister function here */}}
          className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300"
        >
          Register here
        </button>
      </motion.p>
    </motion.div>
  );
};

export default Login;
