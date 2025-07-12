import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import happyAnimation from "./assets/happy.json";  // Start
import worriedAnimation from "./assets/hicks.json"; // After 1 min
import dizzyAnimation from "./assets/dizzy.json";   // Last 10 sec
// import "./TimerPage.css"; // Import the updated CSS

const TimerPage = () => {
  const totalDuration = 120; // 2 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(totalDuration);
  const [isActive, setIsActive] = useState(false);
  const [animation, setAnimation] = useState(happyAnimation);

  // Sample 10 questions
  const questions = [
    {
      text: "Which function is used to print text in C?",
      options: ["console.log()", "printf()", "print()", "cout"],
    },
    {
      text: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "let", "const", "all of the above"],
    },
    {
      text: "Which language is used for styling web pages?",
      options: ["HTML", "JQuery", "CSS", "XML"],
    },
    {
      text: "Which is not a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Cassandra"],
    },
    {
      text: "Which is used to connect to a database?",
      options: ["PHP", "HTML", "JS", "All of the above"],
    },
    {
      text: "Which of the following is a NoSQL database?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"],
    },
    {
      text: "Which company developed the React library?",
      options: ["Google", "Facebook", "Twitter", "Microsoft"],
    },
    {
      text: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets",
      ],
    },
    {
      text: "Which symbol is used for comments in JavaScript?",
      options: ["//", "/* */", "#", "<!-- -->"],
    },
    {
      text: "What is the correct HTML element for inserting a line break?",
      options: ["<lb>", "<break>", "<br>", "<line>"],
    },
  ];

  // Timer logic + animation switching
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;

          // Change animation at different thresholds
          if (newTime === 60) {
            setAnimation(worriedAnimation);
          }
          if (newTime === 10) {
            setAnimation(dizzyAnimation);
          }
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setTimeLeft(totalDuration);
    setAnimation(happyAnimation);
    setIsActive(true);
  };

  return (
    <div className="timer-container">
      {/* Left Column: Timer & Animation */}
      <div className="timer-section">
        <h2 className="timer-text">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </h2>
        <Lottie animationData={animation} className="timer-animation" />
        <button className="timer-btn" onClick={handleStart}>
          Restart Timer
        </button>
      </div>

      {/* Right Column: Scrollable Questions */}
      <div className="question-section">
        <h2 className="section-title">Quiz Questions</h2>
        <div className="questions-scroll">
          {questions.map((q, idx) => (
            <div key={idx} className="question-item">
              <h3 className="question-text">{`${idx + 1}. ${q.text}`}</h3>
              <ul className="options-list">
                {q.options.map((option, index) => (
                  <li key={index} className="option">
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      id={`q${idx}-option${index}`}
                    />
                    <label htmlFor={`q${idx}-option${index}`}>{option}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerPage;