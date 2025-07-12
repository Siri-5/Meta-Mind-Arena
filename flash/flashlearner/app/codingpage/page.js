"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import "./page.css";

const LearningPath = () => {
  const [selectedLevel, setSelectedLevel] = useState("Level 1");
  const router = useRouter(); 
  const progressData = {
    "Level 1": { stars: 3, hours: 0, completed: true },
    "Level 2": { stars: 2, hours: 2, completed: true },
    "Level 3": { stars: 1, hours: 4, completed: true },
    "Level 4": { stars: 0, hours: 6, completed: true },
    "Level 5": { stars: 0, hours: 8, completed: true },
    "Level 6": { stars: 0, hours: 10, completed: false },
    "Level 7": { stars: 0, hours: 12, completed: false },
    "Level 8": { stars: 0, hours: 14, completed: false },
    "Level 9": { stars: 0, hours: 16, completed: false },
    "Level 10": { stars: 0, hours: 18, completed: false },
    "Level 11": { stars: 0, hours: 20, completed: false },
    "Level 12": { stars: 0, hours: 22, completed: false },
  };

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    if (level === "Level 1") {
      router.push('/clevels/level1'); 
    }
    if (level === "Level 2") {
      router.push('/clevels/level2'); 
    }

  };

  return (
    <div className="learning-container">
      {/* Learning Path Section */}
      <div className="path-section">
        <h2 className="minecraft-title">DSA Learning Path</h2>
        <div className="vertical-path">
          {/* Each Level Block */}
          <div
            className={`path-node ${selectedLevel === "Level 1" ? "active" : ""} levela`}
            onClick={() => router.push('/clevel1')}
            style={{ top: `0px` }}
          >
            Learn the Basics
            <div className="title-tooltip">Learn the Basics</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 2" ? "active" : ""} levelb`}
            onClick={() => handleLevelClick("/clevel2")}
            style={{ top: `80px` }}
          >
            Level 2
            <div className="title-tooltip">Level 2: Explore deeper into Minecraft</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 3" ? "active" : ""} levelc`}
            onClick={() => handleLevelClick("Level 3")}
            style={{ top: `160px` }}
          >
            Level 3
            <div className="title-tooltip">Level 3: Build amazing structures</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 4" ? "active" : ""} leveld`}
            onClick={() => handleLevelClick("Level 4")}
            style={{ top: `240px` }}
          >
            Level 4
            <div className="title-tooltip">Level 4: Master advanced building</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 5" ? "active" : ""} leveld`}
            onClick={() => handleLevelClick("Level 5")}
            style={{ top: `340px` }}
          >
            Level 5
            <div className="title-tooltip">Level 5: Learn to craft tools</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 6" ? "active" : ""} levelc`}
            onClick={() => handleLevelClick("Level 6")}
            style={{ top: `420px` }}
          >
            Level 6
            <div className="title-tooltip">Level 6: Discover survival strategies</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 7" ? "active" : ""} levelb`}
            onClick={() => handleLevelClick("Level 7")}
            style={{ top: `500px` }}
          >
            Level 7
            <div className="title-tooltip">Level 7: Master combat mechanics</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 8" ? "active" : ""} levela`}
            onClick={() => handleLevelClick("Level 8")}
            style={{ top: `580px` }}
          >
            Level 8
            <div className="title-tooltip">Level 8: Build your first farm</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 9" ? "active" : ""} levela`}
            onClick={() => handleLevelClick("Level 9")}
            style={{ top: `680px` }}
          >
            Level 9
            <div className="title-tooltip">Level 9: Master potion brewing</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 10" ? "active" : ""} levelb`}
            onClick={() => handleLevelClick("Level 10")}
            style={{ top: `740px` }}
          >
            Level 10
            <div className="title-tooltip">Level 10: Learn to enchant items</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 11" ? "active" : ""} levelc`}
            onClick={() => handleLevelClick("Level 11")}
            style={{ top: `820px` }}
          >
            Level 11
            <div className="title-tooltip">Level 11: Advanced combat training</div>
          </div>

          <div
            className={`path-node ${selectedLevel === "Level 12" ? "active" : ""} leveld`}
            onClick={() => handleLevelClick("Level 12")}
            style={{ top: `900px` }}
          >
            Level 12
            <div className="title-tooltip">Level 12: Become a Minecraft master</div>
          </div>
        </div>
      </div>

      {/* Fixed Progress Box */}
      {/* <div className="progress-box">
        <h3>Course Progress</h3>
        <p>
          <strong>Levels Completed:</strong>{" "}
          {Object.values(progressData).filter((l) => l.completed).length} / 12
        </p>
        <p>
          <strong>Total Stars Earned:</strong>{" "}
          {Object.values(progressData).reduce((acc, l) => acc + l.stars, 0)}
        </p>
        <p>
          <strong>Total Hours Completed:</strong>{" "}
          {Object.values(progressData).reduce((acc, l) => acc + l.hours, 0)}
        </p>
      </div> */}

      <div className="leaderboard-container">
  <div
    className="leaderboard-button"
    onClick={() => router.push("/cleaderboard")}
  >
    🏆 View Leaderboard
  </div>
</div>
    </div>
    
  );
};

export default LearningPath;
