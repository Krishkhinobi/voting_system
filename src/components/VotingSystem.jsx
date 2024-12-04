  import React, { useState } from 'react';
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/database';
  import { motion, AnimatePresence } from 'framer-motion';
  import Registration from './Register';
  import Login from './Login';
  import Voting from './Voting';
  import { Link } from 'react-router-dom';

  const firebaseConfig = {
    apiKey: "AIzaSyCZYIotsVJ9FAVyfrSRGHutnVX_4RLFojs",
    authDomain: "votingsystem-e0571.firebaseapp.com",
    databaseURL: "https://votingsystem-e0571-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "votingsystem-e0571",
    storageBucket: "votingsystem-e0571.appspot.com",
    messagingSenderId: "243212177617",
    appId: "1:243212177617:web:caee6c0741bfbdf38135f0",
    measurementId: "G-4LZNWDSM6F"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const VotingSystem = () => {
    const [isRegister, setIsRegister] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    const [studentData, setStudentData] = useState({
      studentName: '',
      studentGrade: '',
      studentSection: '',
      studentId: '',
      loginStudentId: '',
    });

    const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
    const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor', 'Business Manager', 'PRO-Internal', 'PRO-External'];
    const candidates = ['Candidate 1', 'Candidate 2', 'Candidate 3']; // Modify these dynamically based on your Firebase data

    const handleRegister = (newUser) => {
      firebase.database().ref('students').push({
        studentId: newUser.studentId,
        studentName: newUser.studentName,
        studentGrade: newUser.studentGrade,
        studentSection: newUser.studentSection,
      });
      alert('Student Registered');
      setIsRegister(false);
      setIsLogin(true);
    };

    const handleLogin = (loginId) => {
      const userRef = firebase.database().ref('students');
      userRef.once('value', (snapshot) => {
        let found = false;
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().studentId === loginId) {
            found = true;
            setStudentData(childSnapshot.val()); // Store student data
          }
        });
        if (found) {
          alert('Login Successful');
          setIsRegister(false);
          setIsLogin(false);
          setIsVoting(true);
        } else {
          alert('Student ID not found');
        }
      });
    };

    const handleVote = (selectedCandidate) => {
      const position = positions[currentPositionIndex];
      const studentInfo = studentData;

      const voteData = {
        candidateName: selectedCandidate,
        studentInfo: {
          name: studentInfo.studentName,
          grade: studentInfo.studentGrade,
          section: studentInfo.studentSection,
        },
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      };

      // Check if the user has already voted for this position
      const userVoteRef = firebase.database().ref(`userVotes/${studentData.studentId}`);
      userVoteRef.once('value', (snapshot) => {
        if (snapshot.exists() && snapshot.val()[position]) {
          // User has already voted for this position
          alert('You have already voted for this position.');
          return;
        }

        // Save the vote under the specific position
        firebase.database().ref(`votes/${position}`).push(voteData);
        console.log(`Voted for ${selectedCandidate} as ${position}`);

        // Mark this position as voted
        userVoteRef.update({ [position]: true });

        if (currentPositionIndex < positions.length - 1) {
          setCurrentPositionIndex(currentPositionIndex + 1); // Move to the next position
        } else {
          alert('Voting Complete');
          setIsVoting(false); // End the voting process
        }
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Student Voting System
            </h2>
            <Link 
              to='/admin' 
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Admin
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {isRegister && (
              <motion.div
                key="register"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Registration
                  studentData={studentData}
                  setStudentData={setStudentData}
                  onRegister={handleRegister}
                  switchToLogin={() => {
                    setIsRegister(false);
                    setIsLogin(true);
                  }}
                />
              </motion.div>
            )}

            {isLogin && (
              <motion.div
                key="login"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Login
                  loginStudentId={studentData.loginStudentId}
                  setStudentData={setStudentData}
                  onLogin={handleLogin}
                />
              </motion.div>
            )}

            {isVoting && (
              <motion.div
                key="voting"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Voting
                  position={positions[currentPositionIndex]}
                  candidates={candidates}
                  onVote={handleVote}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hide Register and Login buttons during Voting */}
          {!isVoting && (
            <div className="mt-6 flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setIsRegister(true);
                  setIsLogin(false);
                }}
              >
                Register
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => {
                  setIsRegister(false);
                  setIsLogin(true);
                }}
              >
                Login
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  export default VotingSystem;
