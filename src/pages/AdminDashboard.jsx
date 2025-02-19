// FILEPATH: d:/student-voting_system/front-end/src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LoadingAnimation = () => {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };

  const circleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <motion.div
        className="flex space-x-2"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="w-4 h-4 bg-blue-600 rounded-full"
            variants={circleVariants}
            transition={circleTransition}
          />
        ))}
      </motion.div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );
};

const AdminPanel = () => {
  const [students, setStudents] = useState([]);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch students and votes from Firebase
  useEffect(() => {
    const studentsRef = firebase.database().ref('students');
    studentsRef.once('value', (snapshot) => {
      const studentData = [];
      snapshot.forEach((childSnapshot) => {
        studentData.push(childSnapshot.val());
      });
      setStudents(studentData);
    });

    const votesRef = firebase.database().ref('votes');
    votesRef.once('value', (snapshot) => {
      const voteData = {};
      snapshot.forEach((positionSnapshot) => {
        const position = positionSnapshot.key;
        const positionVotes = {};
        positionSnapshot.forEach((voteSnapshot) => {
          const vote = voteSnapshot.val();
          if (positionVotes[vote.candidateName]) {
            positionVotes[vote.candidateName] += 1; // Increment vote count
          } else {
            positionVotes[vote.candidateName] = 1;
          }
        });
        voteData[position] = positionVotes;
      });
      setVotes(voteData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  const renderPositionVotes = (position) => {
    const candidates = Object.keys(votes[position] || {});
    const voteCounts = candidates.map((candidate) => votes[position][candidate]);

    const data = {
      labels: candidates,
      datasets: [
        {
          label: 'Votes',
          data: voteCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };

    return (
      <div key={position} className="mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h4 className="text-lg font-semibold text-gray-800">{position}</h4>
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="px-4 py-2 text-left">Candidate Name</th>
                <th className="px-4 py-2 text-left">Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidateName, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{candidateName}</td>
                  <td className="px-4 py-2">{votes[position][candidateName]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Bar data={data} options={options} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-900">Admin Panel</h2>

        {/* Display Registered Students */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900">Registered Students</h3>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="px-4 py-2 text-left">Student Name</th>
                  <th className="px-4 py-2 text-left">Student ID</th>
                  <th className="px-4 py-2 text-left">Grade</th>
                  <th className="px-4 py-2 text-left">Section</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{student.studentName}</td>
                    <td className="px-4 py-2">{student.studentId}</td>
                    <td className="px-4 py-2">{student.studentGrade}</td>
                    <td className="px-4 py-2">{student.studentSection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Display Voting Results */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900">Voting Results</h3>
          {Object.keys(votes).map((position) => renderPositionVotes(position))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;