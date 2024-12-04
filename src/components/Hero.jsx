import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 lg:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Student Council Online Voting System
          </h1>
          <p className="text-xl mb-8">
            Make your voice heard! Vote for your student representatives and shape the future of our school.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300 ease-in-out">
              <Link to="/home">Vote Now</Link>
            </button>
            <button className="bg-transparent border-2 border-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300 ease-in-out">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;