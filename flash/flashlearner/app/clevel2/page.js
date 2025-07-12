"use client";
import { useRouter } from "next/navigation";

const levels = [
  { title: "Things to Know in C++/Java/Python or any language", total: 4, path: "/clevel1/c1" },
  { title: "Build-up Logical Thinking", total: 6, path: "/clevel1/c2" },
  { title: "Learn STL/Java-Collections ", total: 8, path: "/arrays" },
  { title: "Know Basic Maths", total: 6, path: "/binary-search" },
  { title: "Learn Basic Recursion", total: 5, path: "/strings" },
  { title: "Learn Basic Hashing", total: 8, path: "/linkedlist" },
  // { title: "Recursion [PatternWise]", total: 25, path: "/recursion" },
  // { title: "Bit Manipulation [Concepts & Problems]", total: 18, path: "/bit-manipulation" }
];

export default function Levels() {
  const router = useRouter();

  return (
    <div className="bg-[#0d0d19] text-white min-h-screen p-6 font-mono">
      <div className="max-w-2xl mx-auto">
        {levels.map((level, index) => (
          <div
            key={index}
            className="mb-4 bg-[#1a1a2e] p-4 rounded-lg cursor-pointer hover:bg-[#252542] transition"
            onClick={() => router.push(level.path)}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">Step {index + 1}: {level.title}</span>
              <span className="bg-[#3d2a54] px-2 py-1 rounded">{`${level.total}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}