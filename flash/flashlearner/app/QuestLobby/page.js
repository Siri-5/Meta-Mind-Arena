"use client"; // Required for client-side rendering in Next.js

import React from "react";
import { useRouter } from "next/navigation"; // App Router import

const CreateRoomPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <h1 className="text-5xl font-bold text-blue-400 drop-shadow-md mb-4">Create Your Room</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Set up your own escape room challenge. Choose the theme, players, and more.
      </p>

      {/* Create Room Button */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-3">Create Room</h2>
        <p className="text-gray-400 mb-4">
          Create your escape room, select a challenge, and invite your friends to join.
        </p>
        <button
          onClick={() => router.push("/CreateRoom")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Start Creating
        </button>
      </div>
    </div>
  );
};

export default CreateRoomPage;

// "use client"; // Required for client-side rendering in Next.js

// import React from "react";
// import { useRouter } from "next/navigation"; // App Router import

// const QuestLobby = () => {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
//       {/* Stars Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(50)].map((_, i) => (
//           <div 
//             key={i}
//             className="absolute rounded-full bg-white" 
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               width: `${Math.random() * 3 + 1}px`,
//               height: `${Math.random() * 3 + 1}px`,
//               opacity: Math.random() * 0.7 + 0.3
//             }}
//           />
//         ))}
//       </div>

//       <h1 className="text-5xl font-bold text-green-400 drop-shadow-md mb-4">Escape Room</h1>
//       <p className="text-lg text-gray-300 mb-8 text-center">
//         A multiplayer escape room challenge for adventurers
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
//         {/* Create Room Card */}
//         <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
//           <h2 className="text-2xl font-semibold mb-3">Create Room</h2>
//           <p className="text-gray-400 mb-4">
//             Create your own escape room and invite friends. Choose a theme, set the challenge type, and establish the number of players.
//           </p>
//           <button 
//             onClick={() => router.push("/CreateRoom")}
//             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
//           >
//             Create Room
//           </button>
//         </div>

//         {/* Join Room Card */}
//         <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
//           <h2 className="text-2xl font-semibold mb-3">Join Room</h2>
//           <p className="text-gray-400 mb-4">
//             Join an existing escape room using a room code. Team up with friends to solve puzzles and escape together.
//           </p>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
//             Join Room
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 max-w-5xl">
//         <FeatureCard title="Aptitude Challenges" description="Test your logical and mathematical skills with challenging puzzles." />
//         <FeatureCard title="Coding Puzzles" description="Solve coding challenges to unlock hints and progress through levels." />
//         <FeatureCard title="Multiple Themes" description="Explore different thematic escape rooms with unique challenges." />
//         <FeatureCard title="Compete & Collaborate" description="Race against friends or work together to solve the puzzles!" />
//       </div>
//     </div>
//   );
// };

// const FeatureCard = ({ title, description }) => {
//   return (
//     <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       <p className="text-gray-400 text-sm">{description}</p>
//     </div>
//   );
// };

// export default QuestLobby;
