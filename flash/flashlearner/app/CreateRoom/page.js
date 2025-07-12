"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const themes = [
  {
    id: "space-station",
    title: "Space Station",
    description: "Floating in orbit. There might be an impostor among us.",
    image: "https://source.unsplash.com/600x400/?space,station",
    color: "from-blue-900 to-indigo-900"
  },
  {
    id: "haunted-mansion",
    title: "Haunted Mansion",
    description: "A decrepit old house, with eerie mysteries in every room.",
    image: "https://source.unsplash.com/600x400/?haunted,mansion",
    color: "from-purple-900 to-violet-900"
  },
  {
    id: "corporate-office",
    title: "Corporate Office",
    description: "Dark. Watch your back.",
    image: "https://source.unsplash.com/600x400/?office,corporate",
    color: "from-gray-900 to-black"
  }
];

export default function CreateLobby() {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [selectedMode, setSelectedMode] = useState("aptitude");
  const [hostName, setHostName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomDetails = {
      hostName,
      roomName,
      roomSize,
      selectedTheme: themes[selectedTheme],
      selectedMode
    };
    console.log("Room Created:", roomDetails);
    // Add further logic to save the room details to the server or a database.
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0f23] overflow-hidden flex flex-col items-center justify-start text-white py-10">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-6">Create Room</h1>

      {/* Host Name */}
      <div className="mt-4 w-96">
        <label className="block text-left text-gray-300">Host Name</label>
        <input
          type="text"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
          placeholder="Enter host name"
          className="w-full p-2 mt-1 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Room Name */}
      <div className="mt-4 w-96">
        <label className="block text-left text-gray-300">Room Name</label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="w-full p-2 mt-1 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Room Size */}
      <div className="mt-4 w-96">
        <label className="block text-left text-gray-300">Room Size</label>
        <input
          type="number"
          value={roomSize}
          onChange={(e) => setRoomSize(e.target.value)}
          placeholder="Enter room size"
          className="w-full p-2 mt-1 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Theme Selector */}
      <div className="mt-6 w-96 text-left relative">
        <p className="text-gray-300 mb-2">Select Room Theme</p>
        <div className="relative flex items-center">
          <button onClick={scrollLeft} className="absolute left-[-30px] bg-gray-900/50 hover:bg-gray-900/70 text-white rounded-full p-2">
            <ChevronLeft size={18} />
          </button>
          <div ref={scrollContainerRef} className="flex space-x-4 py-2 px-8 snap-x snap-mandatory overflow-hidden">
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                className={`flex-shrink-0 w-60 rounded-lg border-2 cursor-pointer snap-center transition-all transform overflow-hidden bg-gradient-to-br shadow-md backdrop-blur-sm ${theme.color} ${selectedTheme === index ? "border-game-accent scale-105 box-glow" : "border-transparent opacity-70 hover:opacity-100"}`}
                onClick={() => setSelectedTheme(index)}
              >
                <div className="w-full h-32 relative">
                  <img src={theme.image} alt={theme.title} className="object-cover w-full h-full rounded-t-lg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-3 flex flex-col">
                  <h3 className="font-bold text-sm">{theme.title}</h3>
                  <p className="text-xs mt-1 text-white/80 line-clamp-3">{theme.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={scrollRight} className="absolute right-[-30px] bg-gray-900/50 hover:bg-gray-900/70 text-white rounded-full p-2">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="mt-6 w-96 text-left">
        <p className="text-gray-300 mb-2">Select Mode</p>
        <div className="flex space-x-4">
          <button onClick={() => setSelectedMode("aptitude")} className={`px-4 py-2 rounded-lg transition ${selectedMode === "aptitude" ? "bg-green-400 text-black" : "bg-gray-800 text-gray-300"}`}>
            Aptitude
          </button>
          <button onClick={() => setSelectedMode("coding")} className={`px-4 py-2 rounded-lg transition ${selectedMode === "coding" ? "bg-green-400 text-black" : "bg-gray-800 text-gray-300"}`}>
            Coding
          </button>
        </div>
      </div>

      {/* Create Room Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 w-96 text-lg font-semibold text-black bg-green-400 rounded-md hover:bg-green-500 transition"
      >
        Create Room
      </button>
    </div>
  );
}

// "use client";

// import React, { useRef, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const themes = [
//   {
//     id: "space-station",
//     title: "Space Station",
//     description: "Floating in orbit. There might be an impostor among us.",
//     image: "https://source.unsplash.com/600x400/?space,station",
//     color: "from-blue-900 to-indigo-900"
//   },
//   {
//     id: "haunted-mansion",
//     title: "Haunted Mansion",
//     description: "A decrepit old house, with eerie mysteries in every room.",
//     image: "https://source.unsplash.com/600x400/?haunted,mansion",
//     color: "from-purple-900 to-violet-900"
//   },
//   {
//     id: "corporate-office",
//     title: "Corporate Office",
//     description: "Dark. Watch your back.",
//     image: "https://source.unsplash.com/600x400/?office,corporate",
//     color: "from-gray-900 to-black"
//   }
// ];

// export default function CreateLobby() {
//   const [selectedTheme, setSelectedTheme] = useState(0);
//   const [selectedMode, setSelectedMode] = useState("aptitude");
//   const [hostName, setHostName] = useState("");
//   const [roomName, setRoomName] = useState("");
//   const [roomSize, setRoomSize] = useState("");
//   const scrollContainerRef = useRef(null);

//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const roomDetails = {
//       hostName,
//       roomName,
//       roomSize,
//       selectedTheme: themes[selectedTheme],
//       selectedMode
//     };
//     console.log("Room Created:", roomDetails);
//     // Add further logic to save the room details to the server or a database.
//   };

//   return (
//     <div className="relative min-h-screen w-full bg-[#0a0f23] overflow-hidden flex flex-col items-center justify-start text-white py-10">
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
//       <h1 className="text-3xl font-bold mb-6">Create Room</h1>

//       {/* Host Name */}
//       <div className="mt-4 w-96">
//         <label className="block text-left text-gray-300">Host Name</label>
//         <input
//           type="text"
//           value={hostName}
//           onChange={(e) => setHostName(e.target.value)}
//           placeholder="Enter host name"
//           className="w-full p-2 mt-1 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//       </div>

//       {/* Room Name */}
//       <div className="mt-4 w-96">
//         <label className="block text-left text-gray-300">Room Name</label>
//         <input
//           type="text"
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           placeholder="Enter room name"
//           className="w-full p-2 mt-1 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//       </div>

//       {/* Room Size */}
//       <div className="mt-4 w-96">
//         <label className="block text-left text-gray-300">Room Size</label>
//         <input
//           type="number"
//           value={roomSize}
//           onChange={(e) => setRoomSize(e.target.value)}
//           placeholder="Enter room size"
//           className="w-full p-2 mt-1 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//       </div>

//       {/* Theme Selector */}
//       <div className="mt-6 w-96 text-left relative">
//         <p className="text-gray-300 mb-2">Select Room Theme</p>
//         <div className="relative flex items-center">
//           <button onClick={scrollLeft} className="absolute left-[-30px] bg-gray-900/50 hover:bg-gray-900/70 text-white rounded-full p-2">
//             <ChevronLeft size={18} />
//           </button>
//           <div ref={scrollContainerRef} className="flex space-x-4 py-2 px-8 snap-x snap-mandatory overflow-hidden">
//             {themes.map((theme, index) => (
//               <div
//                 key={theme.id}
//                 className={`flex-shrink-0 w-60 rounded-lg border-2 cursor-pointer snap-center transition-all transform overflow-hidden bg-gradient-to-br shadow-md backdrop-blur-sm ${theme.color} ${selectedTheme === index ? "border-game-accent scale-105 box-glow" : "border-transparent opacity-70 hover:opacity-100"}`}
//                 onClick={() => setSelectedTheme(index)}
//               >
//                 <div className="w-full h-32 relative">
//                   <img src={theme.image} alt={theme.title} className="object-cover w-full h-full rounded-t-lg" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                 </div>
//                 <div className="p-3 flex flex-col">
//                   <h3 className="font-bold text-sm">{theme.title}</h3>
//                   <p className="text-xs mt-1 text-white/80 line-clamp-3">{theme.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button onClick={scrollRight} className="absolute right-[-30px] bg-gray-900/50 hover:bg-gray-900/70 text-white rounded-full p-2">
//             <ChevronRight size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Mode Selector */}
//       <div className="mt-6 w-96 text-left">
//         <p className="text-gray-300 mb-2">Select Mode</p>
//         <div className="flex space-x-4">
//           <button onClick={() => setSelectedMode("aptitude")} className={`px-4 py-2 rounded-lg transition ${selectedMode === "aptitude" ? "bg-green-400 text-black" : "bg-gray-800 text-gray-300"}`}>
//             Aptitude
//           </button>
//           <button onClick={() => setSelectedMode("coding")} className={`px-4 py-2 rounded-lg transition ${selectedMode === "coding" ? "bg-green-400 text-black" : "bg-gray-800 text-gray-300"}`}>
//             Coding
//           </button>
//         </div>
//       </div>

//       {/* Create Room Button */}
//       <button
//         onClick={handleSubmit}
//         className="mt-6 px-6 py-3 w-96 text-lg font-semibold text-black bg-green-400 rounded-md hover:bg-green-500 transition"
//       >
//         Create Room
//       </button>
//     </div>
//   );
// }

// 'use client';

// import React, { useRef, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const themes = [
//   {
//     id: "space-station",
//     title: "Space Station",
//     description: "Floating in orbit. There might be an impostor among us.",
//     image: "https://source.unsplash.com/600x400/?space,station",
//     color: "from-blue-900 to-indigo-900"
//   },
//   {
//     id: "haunted-mansion",
//     title: "Haunted Mansion",
//     description: "A decrepit old house, with eerie mysteries in every room.",
//     image: "https://source.unsplash.com/600x400/?haunted,mansion",
//     color: "from-purple-900 to-violet-900"
//   },
//   {
//     id: "corporate-office",
//     title: "Corporate Office",
//     description: "Dark. Watch your back.",
//     image: "https://source.unsplash.com/600x400/?office,corporate",
//     color: "from-gray-900 to-black"
//   }
// ];

// export default function CreateLobby() {
//   const [selectedTheme, setSelectedTheme] = useState(0);
//   const [selectedMode, setSelectedMode] = useState("aptitude");
//   const scrollContainerRef = useRef(null);

//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full bg-[#0a0f23] overflow-hidden flex flex-col items-center justify-start text-white py-10">
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
//       <h1 className="text-3xl font-bold mb-6">Create Room</h1>
      
//       {/* Host Name */}
//       <div className="mt-4 w-96">
//         <label className="block text-left text-gray-300">Host Name</label>
//         <input
//           type="text"
//           placeholder="Enter host name"
//           className="w-full p-2 mt-1 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//       </div>

//       {/* Room Name */}
//       <div className="mt-4 w-96">
//         <label className="block text-left text-gray-300">Room Name</label>
//         <input
//           type="text"
//           placeholder="Enter room name"
//           className="w-full p-2 mt-1 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//       </div>

//       {/* Room Size */}
//       <div className="mt-4 w-96">
//         <label className="block text-left text-gray-300">Room Size</label>
//         <input
//           type="number"
//           placeholder="Enter room size"
//           className="w-full p-2 mt-1 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//       </div>

//       {/* Theme Selector */}
//       <div className="mt-6 w-96 text-left relative">
//         <p className="text-gray-300 mb-2">Select Room Theme</p>
//         <div className="relative flex items-center">
//           <button onClick={scrollLeft} className="absolute left-[-30px] bg-gray-900/50 hover:bg-gray-900/70 text-white rounded-full p-2">
//             <ChevronLeft size={18} />
//           </button>
//           <div ref={scrollContainerRef} className="flex space-x-4 py-2 px-8 snap-x snap-mandatory overflow-hidden">
//             {themes.map((theme, index) => (
//               <div
//                 key={theme.id}
//                 className={`flex-shrink-0 w-60 rounded-lg border-2 cursor-pointer snap-center transition-all transform overflow-hidden bg-gradient-to-br shadow-md backdrop-blur-sm ${theme.color} ${selectedTheme === index ? "border-game-accent scale-105 box-glow" : "border-transparent opacity-70 hover:opacity-100"}`}
//                 onClick={() => setSelectedTheme(index)}
//               >
//                 <div className="w-full h-32 relative">
//                   <img src={theme.image} alt={theme.title} className="object-cover w-full h-full rounded-t-lg" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                 </div>
//                 <div className="p-3 flex flex-col">
//                   <h3 className="font-bold text-sm">{theme.title}</h3>
//                   <p className="text-xs mt-1 text-white/80 line-clamp-3">{theme.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button onClick={scrollRight} className="absolute right-[-30px] bg-gray-900/50 hover:bg-gray-900/70 text-white rounded-full p-2">
//             <ChevronRight size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Mode Selector */}
//       <div className="mt-6 w-96 text-left">
//         <p className="text-gray-300 mb-2">Select Mode</p>
//         <div className="flex space-x-4">
//           <button onClick={() => setSelectedMode("aptitude")} className={`px-4 py-2 rounded-lg transition ${selectedMode === "aptitude" ? "bg-green-400 text-black" : "bg-gray-800 text-gray-300"}`}>
//             Aptitude
//           </button>
//           <button onClick={() => setSelectedMode("coding")} className={`px-4 py-2 rounded-lg transition ${selectedMode === "coding" ? "bg-green-400 text-black" : "bg-gray-800 text-gray-300"}`}>
//             Coding
//           </button>
//         </div>
//       </div>

//       {/* Create Room Button */}
//       <button className="mt-6 px-6 py-3 w-96 text-lg font-semibold text-black bg-green-400 rounded-md hover:bg-green-500 transition">
//         Create Room
//       </button>
//     </div>
//   );
// }