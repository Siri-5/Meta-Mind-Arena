"use client";
import React, { useState, useEffect } from "react";
// import Lottie from "lottie-react";
import happyAnimation from "./assets/happy.json";
import worriedAnimation from "./assets/hicks.json";
import dizzyAnimation from "./assets/dizzy.json";
import angryAnimation from "./assets/angry.json";
import failureAnimation from "./assets/huaaa.json";
import { FaClock } from "react-icons/fa";
import "./Quiz.css";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import dynamic from "next/dynamic"; // Import next/dynamic

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const sampleQuestions = [
  {
    text: "Which operator is used to take input from the user in C++?",
    options: ["cin", "cout", "printf", "scanf"],
    correct: 0,
  },
  {
    text: "Which keyword is used to declare a variable in C++?",
    options: ["var", "int", "declare", "define"],
    correct: 1,
  },
];

const Quiz = ({ questions = sampleQuestions, timeLimit = 180 }) => {
  const [userData, setUserData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(timeLimit);
  const [isActive, setIsActive] = useState(false);
  const [animation, setAnimation] = useState(happyAnimation);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setAnimation(failureAnimation);
            setIsActive(false);
            calculateScore();
            setQuizCompleted(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        const unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          }
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleAnswerSelect = (optionIndex) => {
    if (!isActive) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = async () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (
        selectedAnswers[index] !== undefined &&
        selectedAnswers[index] === question.correct
      ) {
        correct++;
      }
    });

    const finalScore = ((correct / questions.length) * 100).toFixed(2);
    setScore(finalScore);
    setAnimation(finalScore >= 70 ? happyAnimation : failureAnimation);

    if (userData) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const quiz1 = Math.max(userData.quiz1 || 0, finalScore);

      await setDoc(userRef, { quiz1 }, { merge: true });
    }
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestion] === undefined) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      calculateScore();
      setQuizCompleted(true);
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeout(() => {
      setTimer(timeLimit);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setQuizCompleted(false);
      setScore(0);
      setAnimation(happyAnimation);
      setReviewMode(false);
    }, 10);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="timer-animation-container">
        <div className="timer-container">
          <FaClock className="timer-icon" /> {Math.floor(timer / 60)}:
          {(timer % 60).toString().padStart(2, "0")}
        </div>
        <Lottie animationData={animation} className="animation" />
      </div>

      <div className="timer-controls">
        <button onClick={() => setIsActive(true)} disabled={isActive}>
          Start
        </button>
      </div>

      {!quizCompleted ? (
        <>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          <div className="question-box">
            <h2>{questions[currentQuestion].text}</h2>
          </div>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${selectedAnswers[currentQuestion] === index ? "selected" : ""}`}
                onClick={() => handleAnswerSelect(index)}
                style={{
                  pointerEvents: isActive ? "auto" : "none",
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                <span className="option-label">{String.fromCharCode(65 + index)}.</span> {option}
              </div>
            ))}
          </div>
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
          </button>
        </>
      ) : (
        <div className="score-container">
          <p>Your Score: {score}%</p>
          <button className="review-btn" onClick={() => setReviewMode(true)}>
            Review Answers
          </button>
        </div>
      )}

      {reviewMode && (
        <div className="review-container">
          <h2>Review Answers</h2>
          {questions.map((question, index) => (
            <div key={index} className="review-question">
              <p>{question.text}</p>
              <p className={selectedAnswers[index] === question.correct ? "correct-answer" : "selected-answer"}>
                Your Answer: {selectedAnswers[index] !== undefined ? question.options[selectedAnswers[index]] : "Not Answered"}
              </p>
              <p className="correct-answer" style={{ color: "green" }}>
                Correct Answer: {question.options[question.correct]}
              </p>
            </div>
          ))}
          <button className="review-btn" onClick={() => setReviewMode(false)}>Close Review</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
