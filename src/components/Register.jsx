    // FILEPATH: /d:/student-voting_system/front-end/src/components/Register.jsx

    import React from 'react';
    import { motion } from 'framer-motion';

    const Register = ({ studentData, setStudentData, onRegister, switchToLogin }) => {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setStudentData((prev) => ({ ...prev, [id]: value }));
    };

    const inputFields = [
        { id: 'studentName', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
        { id: 'studentGrade', label: 'Grade', type: 'text', placeholder: 'Enter your grade' },
        { id: 'studentSection', label: 'Section', type: 'text', placeholder: 'Enter your section' },
        { id: 'studentId', label: 'Student ID', type: 'text', placeholder: 'Enter your student ID' },
    ];

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto"
        >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Register</h2>
        <form onSubmit={(e) => { e.preventDefault(); onRegister(studentData); }}>
            {inputFields.map((field) => (
            <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                </label>
                <input
                type={field.type}
                id={field.id}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder={field.placeholder}
                value={studentData[field.id]}
                onChange={handleChange}
                required
                />
            </div>
            ))}
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 mt-6"
            >
            Register
            </motion.button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
            onClick={switchToLogin}
            className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300"
            >
            Login here
            </button>
        </p>
        </motion.div>
    );
    };

    export default Register;
