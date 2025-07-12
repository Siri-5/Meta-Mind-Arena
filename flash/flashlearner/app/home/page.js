"use client"; 

import React from "react";
import { useRouter } from "next/navigation"; // ✅ Use this for navigation
import { FaBookOpen, FaCode, FaUpload, FaVrCardboard } from "react-icons/fa";
import Navbar from '@/components/Navbar';
import  { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import '../globals.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null); 
  const [streakCount, setStreakCount] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
  
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData(userData);
          setStreakCount(userData.streakCount || 0);
        }
  
        const unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setStreakCount(snapshot.data().streakCount || 0);
            console.log("Updated Streak Count:", snapshot.data().streakCount);
          }
        });
  
        return () => unsubscribeSnapshot();
      } else {
        setUserData(null);
        setStreakCount(null);
      }
    });
  
    return () => unsubscribeAuth(); 
  }, []);
  

  return (
    <div>
      <Navbar />
      <div className="bg-[#0a192f] min-h-screen p-6 text-white font-mono flex flex-row justify-between">
        <div className="flex-1">
          <div className="bg-[#112240] text-[#64ffda] p-6 rounded-lg text-center font-bold text-xl border-2 border-[#c0c0c0] shadow-lg">
            Good evening, {userData ? userData.name : "Scholar"}!
            <p className="text-sm font-normal text-[#ccd6f6]">Ready to level up your knowledge today?</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 gap-6 flex-1">
              
              <div 
                className="relative bg-[#7209b7] text-white p-6 rounded-lg flex flex-col items-center border-4 border-[#c0c0c0] shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/apti")}
              >
                <FaBookOpen size={40} />
                <div className="text-2xl font-bold mt-2">Aptitude Path</div>
                <p className="text-sm mt-2 text-center text-[#ccd6f6]">Flashcards, module-based questions, and timed mock tests.</p>
                <button 
                  className="mt-4 bg-black text-[#f72585] px-4 py-2 rounded-lg font-semibold border-2 border-[#c0c0c0] hover:bg-[#c0c0c0] hover:text-black transition duration-300"
                >
                  Start Learning
                </button>
                <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-[#64ffda] rounded-lg pointer-events-none" />
              </div>


              <div 
                className="relative bg-[#0077b6] text-white p-6 rounded-lg flex flex-col items-center border-4 border-[#c0c0c0] shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/codingpage")}
              >
                <FaCode size={40} />
                <div className="text-2xl font-bold mt-2">Programming Path</div>
                <p className="text-sm mt-2 text-center text-[#ccd6f6]">Theory flashcards, coding questions, and timed tests.</p>
                <button 
                  className="mt-4 bg-black text-[#00b4d8] px-4 py-2 rounded-lg font-semibold border-2 border-[#c0c0c0] hover:bg-[#c0c0c0] hover:text-black transition duration-300"
                >
                  Start Learning
                </button>
                <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-[#64ffda] rounded-lg pointer-events-none" />
              </div>


              <div 
                className="relative bg-[#008000] text-white p-6 rounded-lg flex flex-col items-center border-4 border-[#c0c0c0] shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/dashboard")}
              >
                <FaUpload size={40} />
                <div className="text-2xl font-bold mt-2">Learning Space</div>
                <p className="text-sm mt-2 text-center text-[#ccd6f6]">Enter topic to generate flashcards and quizzes.</p>
                <button 
                  className="mt-4 bg-black text-[#00ff00] px-4 py-2 rounded-lg font-semibold border-2 border-[#c0c0c0] hover:bg-[#c0c0c0] hover:text-black transition duration-300"
                >
                  Start Learning
                </button>
                <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-[#64ffda] rounded-lg pointer-events-none" />
              </div>

              {/* Escape Rooms Section */}
              <div 
                className="relative bg-[#d00000] text-white p-6 rounded-lg flex flex-col items-center border-4 border-[#c0c0c0] shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => router.push("/QuestLobby")}
              >
                <FaVrCardboard size={40} />
                <div className="text-2xl font-bold mt-2">Escape Rooms</div>
                <p className="text-sm mt-2 text-center text-[#ccd6f6]">VR-based problem solving for an immersive experience.</p>
                <button 
                  className="mt-4 bg-black text-[#ffba08] px-4 py-2 rounded-lg font-semibold border-2 border-[#c0c0c0] hover:bg-[#c0c0c0] hover:text-black transition duration-300"
                >
                  Start Learning
                </button>
                <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-[#64ffda] rounded-lg pointer-events-none" />
              </div>

            </div>
          </div>
        </div>

        <div className="w-60 bg-[#112240] p-4 rounded-lg shadow-lg border-2 border-[#c0c0c0] ml-6">
          <div className="text-lg font-bold text-[#64ffda]">Your Learning Streak</div>
         
          {streakCount !== null && (
  <>
    <p className="text-orange-500 font-semibold mt-2">
      🔥 {userData.streakCount} day streak!
    </p>
    <p className="text-[#ccd6f6] text-sm">🏆 Best: {userData.bestStreak}</p>
    <p className="text-[#ccd6f6] text-sm mt-4">
      You've been learning for{" "}
      <span className="font-bold text-[#64ffda]">
        {userData.bestStreak} days
      </span>{" "}
      total!
    </p>
  </>
)}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

{/* <div className="mt-4 grid grid-cols-7 text-center text-[#64ffda]">
{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
  <div key={day} className="font-bold text-[#ccd6f6]">{day}</div>
))}
{[...Array(31).keys()].map((day) => (
  <div 
    key={day} 
    className={`p-2 rounded-full ${day + 1 === 31 ? "bg-[#64ffda] text-black" : ""}`}
  >
    {day + 1}
  </div>
))}
</div> */}

// import React from "react";
// import { useRouter } from "next/navigation"; // ✅ Import from 'next/navigation'
// import { FaBookOpen, FaCode, FaUpload, FaVrCardboard } from "react-icons/fa";

// const Dashboard = () => {
//   const router = useRouter(); // ✅ Initialize router

//   const sections = [
//     {
//       title: "Aptitude Path",
//       color: "bg-[#7209b7]",
//       textColor: "text-[#f72585]",
//       icon: <FaBookOpen size={40} />,
//       description: "Flashcards, module-based questions, and timed mock tests.",
//       path: "/learningpath",
//     },
//     {
//       title: "Programming Path",
//       color: "bg-[#0077b6]",
//       textColor: "text-[#00b4d8]",
//       icon: <FaCode size={40} />,
//       description: "Theory flashcards, coding questions, and timed tests.",
//       path: "/programming",
//     },
//     {
//       title: "Learning Space",
//       color: "bg-[#008000]",
//       textColor: "text-[#00ff00]",
//       icon: <FaUpload size={40} />,
//       description: "Upload PDFs to generate flashcards and quizzes.",
//       path: "/learning-space",
//     },
//     {
//       title: "Escape Rooms",
//       color: "bg-[#d00000]",
//       textColor: "text-[#ffba08]",
//       icon: <FaVrCardboard size={40} />,
//       description: "VR-based problem solving for an immersive experience.",
//       path: "/escape-rooms",
//     },
//   ];

//   return (
//     <div className="bg-[#0a192f] min-h-screen p-6 text-white font-mono flex flex-row justify-between">
//       <div className="flex-1">
//         <div className="bg-[#112240] text-[#64ffda] p-6 rounded-lg text-center font-bold text-xl border-2 border-[#c0c0c0] shadow-lg">
//           Good evening, Scholar!
//           <p className="text-sm font-normal text-[#ccd6f6]">Ready to level up your knowledge today?</p>
//         </div>
        
//         <div className="flex flex-wrap justify-center gap-6 mt-6 max-w-6xl mx-auto">
//           <div className="grid grid-cols-2 gap-6 flex-1">
//             {sections.map(({ title, color, textColor, icon, description, path }) => (
//               <div 
//                 key={title}
//                 className={`${color} text-white p-6 rounded-lg flex flex-col items-center border-4 border-[#c0c0c0] shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
//                 onClick={() => router.push(path)}
//               >  
//                 {icon}
//                 <div className="text-2xl font-bold mt-2">{title}</div>
//                 <p className="text-sm mt-2 text-center text-[#ccd6f6]">{description}</p>
//                 <button 
//                   className={`mt-4 bg-black ${textColor} px-4 py-2 rounded-lg font-semibold border-2 border-[#c0c0c0] hover:bg-[#c0c0c0] hover:text-black transition duration-300`}
//                 >
//                   Start Learning
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="w-60 bg-[#112240] p-4 rounded-lg shadow-lg border-2 border-[#c0c0c0] ml-6">
//         <div className="text-lg font-bold text-[#64ffda]">Your Learning Streak</div>
//         <p className="text-orange-500 font-semibold mt-2">🔥 3 day streak!</p>
//         <p className="text-[#ccd6f6] text-sm">🏆 Best: 6</p>
//         <div className="mt-4 grid grid-cols-7 text-center text-[#64ffda]">
//           {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//             <div key={day} className="font-bold text-[#ccd6f6]">{day}</div>
//           ))}
//           {[...Array(31).keys()].map((day) => (
//             <div key={day} className={`p-2 rounded-full ${day + 1 === 31 ? "bg-[#64ffda] text-black" : ""}`}>
//               {day + 1}
//             </div>
//           ))}
//         </div>
//         <p className="text-[#ccd6f6] text-sm mt-4">You've been learning for <span className="font-bold text-[#64ffda]">8 days</span> total!</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// 'use client';
// import React from 'react';
// import { useRouter } from 'next/navigation';
// // import './page.css';

// function FeatureSelectionPage() {
//   const router = useRouter();

//   // Navigate to Flashcards (redirects to /dashboard/page.js)
//   const handleFlashcardsClick = () => {
//     router.push('/dashboard');
//   };

//   // Navigate to Coding (you can set the route here when ready)
//   const handleCodingClick = () => {
//     // alert('Coding section is under development! 🚀');
//     router.push('/codingpage');
//   };

//   return (
//     <div className="feature-container">
//       <h1 className="feature-title">Choose Your Adventure!</h1>
//       <div className="button-container">
//         <button className="feature-btn" onClick={handleFlashcardsClick}>
//           Flashcards
//         </button>
//         <button className="feature-btn" onClick={handleCodingClick}>
//           Coding
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FeatureSelectionPage;
