import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // Importing Realtime Database module
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

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const CandidateListPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch candidates data from Firebase
  useEffect(() => {
    const candidatesRef = firebase.database().ref('candidates'); // Path to fetch candidates
    candidatesRef.once('value', (snapshot) => {
      const candidateData = [];
      snapshot.forEach((childSnapshot) => {
        candidateData.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setCandidates(candidateData);
      setLoading(false); // Set loading to false after fetching data
    });
  }, []);

  if (loading) {
    return <div>Loading candidates...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Candidates List</h2>
        <div className="mt-8">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="px-4 py-2 text-left">Candidate Name</th>
                  <th className="px-4 py-2 text-left">Position</th>
                  <th className="px-4 py-2 text-left">Advocacy</th>
                  <th className="px-4 py-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b">
                    <td className="px-4 py-2">{candidate.name}</td>
                    <td className="px-4 py-2">{candidate.position}</td>
                    <td className="px-4 py-2">{candidate.advocacy}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/candidate/${candidate.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateListPage;
