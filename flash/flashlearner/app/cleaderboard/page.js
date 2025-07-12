"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import Navbar from '@/components/Navbar';


import "../globals.css";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    rank: null,
    score: null,
    quiz1: null,
    quiz2: null,
    completedCourses: [],
  });

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setCurrentUser(user.email);
    } else {
      console.warn("No user is currently logged in.");
    }

    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
          }))
          .filter((u) => u.name && u.email && u.score !== undefined)
          .sort((a, b) => b.score - a.score)
          .map((user, index) => ({
            ...user,
            rank: index + 1,
          }));

        setLeaderboardData(users);

        // Set current user's info
        if (user) {
          const found = users.find((u) => u.email === user.email);
          if (found) {
            setUserInfo({
              rank: found.rank ?? "N/A",
              score: found.score ?? "N/A",
              quiz1: found.quiz1 ?? "N/A",
              quiz2: found.quiz2 ?? "N/A",
              completedCourses: Array.isArray(found.completedCourses)
                ? found.completedCourses
                : [],
            });
          }
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
    <div>
        <Navbar/>
    </div>
    <div className="min-h-screen bg-black text-white p-8 flex justify-center items-center">
        
      {/* Wrapper for the two columns with percentage-based widths */}
      <div className="flex w-[100%] h-[100%] max-w-7xl space-x-8">
        {/* Left side - current user info (40%) */}
        <div className="w-2/5 p-6 bg-gray-800 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">📊 Your Stats</h2>
          {currentUser ? (
            <>
              {/* <p className="text-lg mb-2">
                Name: <span className="text-teal-400">{userInfo.name}</span>
                </p> */}
                <p >
                Email: <span className="text-teal-400">{currentUser}</span>
              </p><br></br>
              <p className="text-2xl font-bold mb-2">
                Rank: #{userInfo.rank ?? "N/A"}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="font-medium text-gray-300">Quiz-One</p>
                  <p className="text-lg font-bold">{userInfo.quiz1 ?? "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-300">Quiz-Two</p>
                  <p className="text-lg font-bold">{userInfo.quiz2 ?? "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-300">Courses Completed</p>
                  <p className="text-lg font-bold">
                    {userInfo.completedCourses.length}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-300">Total Score</p>
                  <p className="text-lg font-bold">{userInfo.score}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400">Not logged in</p>
          )}
        </div>

        {/* Right side - leaderboard (60%) */}
        <div className="w-3/5 p-6 bg-gray-900 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
          <div className="space-y-2">
            {leaderboardData.map(({ rank, name, email, score }) => (
              <div
                key={email}
                className={`flex items-center justify-between p-3 rounded-md ${
                  currentUser === email ? "bg-teal-800" : "bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                      rank === 1
                        ? "bg-yellow-500"
                        : rank === 2
                        ? "bg-teal-500"
                        : rank === 3
                        ? "bg-red-500"
                        : "bg-gray-700"
                    }`}
                  >
                    {rank}
                  </div>
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-gray-400">{email}</p>
                  </div>
                </div>
                <div className="text-xl font-bold">{score} ⭐</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LeaderboardPage;
