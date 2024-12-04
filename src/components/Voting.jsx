import React from 'react';
import { motion } from 'framer-motion';

const Voting = ({ position, candidates, onVote }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Vote for {position}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.isArray(candidates) && candidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={`https://picsum.photos/200?random=${Math.random()}`}
                alt={candidate.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{candidate.name}</h3>
              <motion.button
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onVote(candidate)}
              >
                Vote
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Voting;
