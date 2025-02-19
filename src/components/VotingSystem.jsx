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
  measurementId: "G-4LZNWDSM6F",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const VotingSystem = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  const [studentData, setStudentData] = useState({
    studentName: '',
    studentGrade: '',
    studentSection: '',
    studentId: '',
    loginStudentId: '',
  });

  const positions = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Auditor',
    'Business Manager',
    'PRO-Internal',
    'PRO-External',
  ];

  const candidatesData = {
    President: [
      { id: 1, name: 'Gab riel Nash Niere', advocacy: 'Improving Education' },
      { id: 2, name: 'Prince Charlean Tapere', advocacy: 'Promoting Equality' },
      { id: 3, name: 'Jerico Lopez', advocacy: 'Sustainability First' },
    ],
    'Vice President': [
      { id: 1, name: 'Prince Estrada', advocacy: 'Community Engagement' },
      { id: 2, name: 'Adrian Aclon Escodero', advocacy: 'Youth Development' },
      { id: 3, name: 'Claude Jillian Deiparine', advocacy: 'Inclusive Growth' },
    ],
    Secretary: [
      { id: 1, name: 'Christaire Jay Jadraque', advocacy: 'Transparency in Governance' },
      { id: 2, name: 'Sean Manuel Velez', advocacy: 'Strengthening Communication' },
      { id: 3, name: 'Ed Ivan Repalam', advocacy: 'Organizational Efficiency' },
    ],
    Treasurer: [
      { id: 1, name: 'Shan Angelo Lopez', advocacy: 'Financial Transparency' },
      { id: 2, name: 'Macmac Matuguina', advocacy: 'Budget Optimization' },
      { id: 3, name: 'Kiel Bacaday', advocacy: 'Effective Fundraising' },
    ],
    Auditor: [
      { id: 1, name: 'Allen Rolona', advocacy: 'Integrity and Accountability' },
      { id: 2, name: 'Rey Mateus Juegos', advocacy: 'Accurate Auditing' },
      { id: 3, name: 'Dastine Emerson Hinacay', advocacy: 'Monitoring Resources' },
    ],
    'Business Manager': [
      { id: 1, name: 'Rhovic James Labra', advocacy: 'Innovative Business Solutions' },
      { id: 2, name: 'Kobe Salaver', advocacy: 'Resource Management' },
      { id: 3, name: 'Elmer Jedan Albarado', advocacy: 'Entrepreneurial Growth' },
    ],
    'PRO-Internal': [
      { id: 1, name: 'Joseph Lauron', advocacy: 'Enhancing Internal Communication' },
      { id: 2, name: 'Zack Galao', advocacy: 'Improving Relations' },
      { id: 3, name: 'Dustin Jay Datuharon', advocacy: 'Transparent Messaging' },
    ],
    'PRO-External': [
      { id: 1, name: 'Nico Noquin', advocacy: 'Strengthening Partnerships' },
      { id: 2, name: 'Jericho Semblante', advocacy: 'Community Outreach' },
      { id: 3, name: 'Krish Khinobi Bayalan', advocacy: 'Promoting Engagement' },
    ],
  };

  const switchToRegister = () => {
    setIsRegister(true);
    setIsLogin(false);
  };
  

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
          setStudentData(childSnapshot.val());
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
      candidateName: selectedCandidate.name,
      advocacy: selectedCandidate.advocacy,
      studentInfo: {
        name: studentInfo.studentName,
        grade: studentInfo.studentGrade,
        section: studentInfo.studentSection,
      },
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    const userVoteRef = firebase.database().ref(`userVotes/${studentData.studentId}`);
    userVoteRef.once('value', (snapshot) => {
      if (snapshot.exists() && snapshot.val()[position]) {
        alert('You have already voted for this position.');
        return;
      }

      firebase.database().ref(`votes/${position}`).push(voteData);
      console.log(`Voted for ${selectedCandidate.name} as ${position}`);

      userVoteRef.update({ [position]: true });

      if (currentPositionIndex < positions.length - 1) {
        setCurrentPositionIndex(currentPositionIndex + 1);
      } else {
        alert('Voting Complete');
        setIsVoting(false);
      }
    });
  };

  const currentCandidates = candidatesData[positions[currentPositionIndex]] || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center py-12 px-20 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-[500px] space-y-5  bg-white p-3 rounded-xl shadow-2xl">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Student Voting System</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {isRegister && (
            <Registration
              studentData={studentData}
              setStudentData={setStudentData}
              onRegister={handleRegister}
              switchToLogin={() => {
                setIsRegister(false);
                setIsLogin(true);
              }}
            />
          )}

          {isLogin && (
            <Login
              loginStudentId={studentData.loginStudentId}
              setStudentData={setStudentData}
              onLogin={handleLogin}
              switchToRegister={() => {
                setIsLogin(false);
                setIsRegister(true);
              }}
            />
          )}

          {isVoting && (
            <Voting
              position={positions[currentPositionIndex]}
              candidates={currentCandidates}
              onVote={handleVote}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VotingSystem;
