'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Updated for Next.js App Router
import { levelData } from './c1/data/levelData';
import { courseData } from './c1/data/courseData';
import './level.module.css';

const LevelOne = () => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const level = levelData.find(level => level.id === 1);
  const levelCourses = courseData.filter(course => course.levelId === 1);

  useEffect(() => {
    if (levelCourses.length > 0 && !selectedCourse) {
      setSelectedCourse(levelCourses[0]);
    }
  }, [levelCourses, selectedCourse]);

  if (!level || !selectedCourse) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  const markCourseComplete = (courseId) => {
    if (!completedCourses.includes(courseId)) {
      setCompletedCourses([...completedCourses, courseId]);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <Link href="/" className="text-blue-500">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-4">Level {level.id}: {level.title}</h1>
      <p className="mb-4">{level.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl mb-3">Courses</h2>
          {levelCourses.map(course => (
            <div 
              key={course.id}
              className={`p-2 mb-2 cursor-pointer rounded ${selectedCourse.id === course.id ? 'bg-blue-200' : 'bg-gray-100'}`}
              onClick={() => setSelectedCourse(course)}
            >
              {course.title}
            </div>
          ))}
        </div>

        <div className="col-span-2 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-2">{selectedCourse.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: selectedCourse.content }} />
          <button 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => markCourseComplete(selectedCourse.id)}
          >
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelOne;
