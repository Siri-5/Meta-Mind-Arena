'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { levelData } from './data/levelData';
import { courseData } from './data/courseData';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../../../firebase'; // Import Firestore & Auth
import { onAuthStateChanged } from 'firebase/auth';

import '../../globals.css';
import styles from '../level.module.css';

const LevelOne = () => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  const [completedCourses, setCompletedCourses] = useState([]);
  const [userId, setUserId] = useState(null); // Track user

  const level = levelData.find(level => level.id === 1);
  const levelCourses = courseData.filter(course => course.levelId === 1);

  // Get user ID from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchCompletedCourses(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch completed courses from Firestore
  const fetchCompletedCourses = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setCompletedCourses(docSnap.data().completedCourses || []);
      }
    } catch (error) {
      console.error("Error fetching completed courses:", error);
    }
  };

  useEffect(() => {
    if (levelCourses.length > 0 && !selectedCourse) {
      setSelectedCourse(levelCourses[0]);
    }
  }, [levelCourses, selectedCourse]);

  if (!level || !selectedCourse) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  // ✅ Mark course as complete & update Firestore
  const markCourseComplete = async (courseId) => {
    if (!completedCourses.includes(courseId) && userId) {
      try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          completedCourses: arrayUnion(courseId)
        });
        setCompletedCourses([...completedCourses, courseId]); // Update UI
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
  };

  const allCoursesCompleted = levelCourses.every(course => completedCourses.includes(course.id));

  const handleStartQuiz = () => {
    router.push("clevel1/c1/quiz");
  };

  return (
    <div className={styles.container}>
      <div className={styles.levelHeader}>
        <Link href="/" className={styles.backLink}>&#8592; Back to Learning Path</Link>
        <div className={styles.levelInfo}>
          <span className={`${styles.levelIndicator} ${styles[level.difficultyClass]}`}>
            {level.difficulty}
          </span>
          <h1 className={styles.levelPageTitle}>Level {level.id}: {level.title}</h1>
        </div>
        <p className={styles.levelPageDescription}>{level.description}</p>
      </div>

      <div className={styles.levelContent}>
        <div className={styles.coursesSidebar}>
          <h3 className={styles.sidebarTitle}>Courses</h3>
          <div className={styles.courseList}>
            {levelCourses.map((course) => (
              <div 
                key={course.id}
                className={`${styles.courseItem} ${selectedCourse.id === course.id ? styles.active : ''} ${completedCourses.includes(course.id) ? styles.completed : ''}`}
                onClick={() => setSelectedCourse(course)}
              >
                <span className={styles.courseTitle}>{course.title}</span>
                {completedCourses.includes(course.id) && (
                  <span className={styles.completedIndicator}>✓</span>
                )}
              </div>
            ))}
          </div>

          <div className={styles.levelProgress}>
            <div className={styles.progressLabel}>
              <span>Level Progress</span>
              <span>{completedCourses.length}/{levelCourses.length}</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${(completedCourses.length / levelCourses.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <button 
            className={`${styles.btn} ${allCoursesCompleted ? styles.btnPrimary : `${styles.btnSecondary} ${styles.btnDisabled}`}`}
            onClick={handleStartQuiz}
            disabled={!allCoursesCompleted}
          >
            {allCoursesCompleted ? 'Take Level Quiz' : 'Complete All Courses First'}
          </button>
        </div>

        <div className={styles.courseContent}>
          <div className={styles.courseHeader}>
            <h2 className={styles.courseContentTitle}>{selectedCourse.title}</h2>
            <div className={styles.courseTabs}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'content' ? styles.active : ''}`}
                onClick={() => setActiveTab('content')}
              >
                Content
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'examples' ? styles.active : ''}`}
                onClick={() => setActiveTab('examples')}
              >
                Examples
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'exercises' ? styles.active : ''}`}
                onClick={() => setActiveTab('exercises')}
              >
                Exercises
              </button>
            </div>
          </div>

          <div className={styles.courseBody}>
            {activeTab === 'content' && (
              <div className={styles.contentTab}>
                <div dangerouslySetInnerHTML={{ __html: selectedCourse.content }} />
              </div>
            )}

            {activeTab === 'examples' && (
              <div className={styles.examplesTab}>
                {selectedCourse.examples.map((example, index) => (
                  <div key={index} className={styles.exampleItem}>
                    <h4>{example.title}</h4>
                    <p>{example.description}</p>
                    <pre>{example.code}</pre>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'exercises' && (
              <div className={styles.exercisesTab}>
                {selectedCourse.exercises.map((exercise, index) => (
                  <div key={index} className={styles.exerciseItem}>
                    <h4>{exercise.title}</h4>
                    <p>{exercise.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => markCourseComplete(selectedCourse.id)}
            disabled={completedCourses.includes(selectedCourse.id)}
          >
            {completedCourses.includes(selectedCourse.id) ? 'Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelOne;

// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { levelData } from './data/levelData';
// import { courseData } from './data/courseData';
// // import "./level.css";

// import '../../globals.css';
// import styles from '../level.module.css';

// const LevelOne = () => {
//   const router = useRouter();
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [activeTab, setActiveTab] = useState('content');
//   const [completedCourses, setCompletedCourses] = useState([]);
  
//   const level = levelData.find(level => level.id === 1);
//   const levelCourses = courseData.filter(course => course.levelId === 1);
  
//   useEffect(() => {
//     if (levelCourses.length > 0 && !selectedCourse) {
//       setSelectedCourse(levelCourses[0]);
//     }
//   }, [levelCourses, selectedCourse]);

//   if (!level || !selectedCourse) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loading}>Loading...</div>
//       </div>
//     );
//   }

//   const markCourseComplete = (courseId) => {
//     if (!completedCourses.includes(courseId)) {
//       setCompletedCourses([...completedCourses, courseId]);
//     }
//   };
  
//   const allCoursesCompleted = levelCourses.every(course => completedCourses.includes(course.id));

//   const handleStartQuiz = () => {
//     router.push("/clevel1/level1/quiz");
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.levelHeader}>
//         <Link href="/" className={styles.backLink}>&#8592; Back to Learning Path</Link>
//         <div className={styles.levelInfo}>
//           <span className={`${styles.levelIndicator} ${styles[level.difficultyClass]}`}>
//             {level.difficulty}
//           </span>
//           <h1 className={styles.levelPageTitle}>Level {level.id}: {level.title}</h1>
//         </div>
//         <p className={styles.levelPageDescription}>{level.description}</p>
//       </div>
      
//       <div className={styles.levelContent}>
//         <div className={styles.coursesSidebar}>
//           <h3 className={styles.sidebarTitle}>Courses</h3>
//           <div className={styles.courseList}>
//             {levelCourses.map((course) => (
//               <div 
//                 key={course.id}
//                 className={`${styles.courseItem} ${selectedCourse.id === course.id ? styles.active : ''} ${completedCourses.includes(course.id) ? styles.completed : ''}`}
//                 onClick={() => setSelectedCourse(course)}
//               >
//                 <span className={styles.courseTitle}>{course.title}</span>
//                 {completedCourses.includes(course.id) && (
//                   <span className={styles.completedIndicator}>✓</span>
//                 )}
//               </div>
//             ))}
//           </div>
          
//           <div className={styles.levelProgress}>
//             <div className={styles.progressLabel}>
//               <span>Level Progress</span>
//               <span>{completedCourses.length}/{levelCourses.length}</span>
//             </div>
//             <div className={styles.progressBar}>
//               <div 
//                 className={styles.progressFill}
//                 style={{ width: `${(completedCourses.length / levelCourses.length) * 100}%` }}
//               ></div>
//             </div>
//           </div>
          
//           <button 
//             className={`${styles.btn} ${allCoursesCompleted ? styles.btnPrimary : `${styles.btnSecondary} ${styles.btnDisabled}`}`}
//             onClick={handleStartQuiz}
//             disabled={!allCoursesCompleted}
//           >
//             {allCoursesCompleted ? 'Take Level Quiz' : 'Complete All Courses First'}
//           </button>
//         </div>
        
//         <div className={styles.courseContent}>
//           <div className={styles.courseHeader}>
//             <h2 className={styles.courseContentTitle}>{selectedCourse.title}</h2>
//             <div className={styles.courseTabs}>
//               <button 
//                 className={`${styles.tabBtn} ${activeTab === 'content' ? styles.active : ''}`}
//                 onClick={() => setActiveTab('content')}
//               >
//                 Content
//               </button>
//               <button 
//                 className={`${styles.tabBtn} ${activeTab === 'examples' ? styles.active : ''}`}
//                 onClick={() => setActiveTab('examples')}
//               >
//                 Examples
//               </button>
//               <button 
//                 className={`${styles.tabBtn} ${activeTab === 'exercises' ? styles.active : ''}`}
//                 onClick={() => setActiveTab('exercises')}
//               >
//                 Exercises
//               </button>
//             </div>
//           </div>
          
//           <div className={styles.courseBody}>
//             {activeTab === 'content' && (
//               <div className={styles.contentTab}>
//                 <div dangerouslySetInnerHTML={{ __html: selectedCourse.content }} />
//               </div>
//             )}
            
//             {activeTab === 'examples' && (
//               <div className={styles.examplesTab}>
//                 {selectedCourse.examples.map((example, index) => (
//                   <div key={index} className={styles.exampleItem}>
//                     <h4>{example.title}</h4>
//                     <p>{example.description}</p>
//                     <pre>{example.code}</pre>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {activeTab === 'exercises' && (
//               <div className={styles.exercisesTab}>
//                 {selectedCourse.exercises.map((exercise, index) => (
//                   <div key={index} className={styles.exerciseItem}>
//                     <h4>{exercise.title}</h4>
//                     <p>{exercise.description}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
          
//           <button 
//             className={`${styles.btn} ${styles.btnPrimary}`}
//             onClick={() => markCourseComplete(selectedCourse.id)}
//             disabled={completedCourses.includes(selectedCourse.id)}
//           >
//             {completedCourses.includes(selectedCourse.id) ? 'Completed' : 'Mark as Complete'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LevelOne;
