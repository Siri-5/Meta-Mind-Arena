import React from "react";
import { useNavigate } from "react-router-dom";
import featureimg2 from "./assets/feature2.png";
import featureimg1 from "./assets/feature1.jpg";
import featureimg3 from "./assets/feature3.png";
import featureimg4 from "./assets/feature4.png";
import featureimg5 from "./assets/feature5.png";
import featureimg6 from "./assets/feature6.png";
import "./App.css"; 

function Home() {
  const navigate = useNavigate();
  const feature1 = {
        title: 'Learning Odyssey',
        description:
          'Choose your learning path and explore a structured journey through aptitude, programming, and more.Unlock new levels by completing quizzes and track progress through structured content.',
        image: featureimg1,
      };
      const feature2 = {
        title: 'Battle of Minds',
        description:
          'Compete in real-time quizzes and contests to test your skills and climb the leaderboard',
        image: featureimg2,
      };
      const feature3 = {
        title: 'Streak Mastery',
        description:
          'Keep your learning streak alive and unlock rewards for consistent progress',
        image: featureimg3,
      };
      const feature4 = {
        title: 'VR Escape Arena',
        description:
          'Step into an immersive world where solving challenges unlocks new levels and experiences..',
        image: featureimg4,
      };
      const feature5 = {
        title: 'DevLog',
        description:
          'Stay informed with regular updates on features and improvements.',
        image: featureimg5,
      };
      const feature6 = {
        title: 'FlashLearn',
        description:
          'Generate flashcards based on a single prompt and review key concepts easily.',
        image: featureimg6,
      };
    
      return (
        <div className="container">
          {/* Hero Section */}
          <div className="hero">
            <h1 className="title">Meta Mind Arena</h1>
            <p className="subtitle">The Ultimate Learning Metaverse</p>
          </div>
    
          {/* Features Section */}
          <div className="features-container">
            <div className="feature-card1">
              <div className="feature-content">
                <div className="text-content1">
                  <h3 className="feature-title1">{feature1.title}</h3>
                  <p className="feature-desc1">{feature1.description}</p>
                </div>
                <div className="image-container1">
                  <img
                    src={feature1.image}
                    alt={feature1.title}
                    className="feature-image1"
                  />
                </div>
              </div>
            </div>
    
            <div className="feature-card2">
              <div className="feature-content">
                <div className="image-container2">
                  <img
                    src={feature2.image}
                    alt={feature2.title}
                    className="feature-image2"
                  />
                  <h3 className="feature-title2">{feature2.title}</h3>
                  <p className="feature-desc2">{feature2.description}</p>
                </div>
              </div>
            </div>
          </div>
    
          <div className="features-container">
            <div className="feature-card2">
              <div className="feature-content">
                <div className="image-container2">
                  <img
                    src={feature3.image}
                    alt={feature3.title}
                    className="feature-image2"
                  />
                  <h3 className="feature-title2">{feature3.title}</h3>
                  <p className="feature-desc2">{feature3.description}</p>
                </div>
              </div>
            </div>
    
            <div className="feature-card1">
              <div className="feature-content">
                <div className="text-content1">
                  <h3 className="feature-title1">{feature4.title}</h3>
                  <p className="feature-desc1">{feature4.description}</p>
                </div>
                <div className="image-container1">
                  <img
                    src={feature4.image}
                    alt={feature4.title}
                    className="feature-image1"
                  />
                </div>
              </div>
            </div>
          </div>
    
          <div className="features-container">
            <div className="feature-card1">
              <div className="feature-content">
                <div className="text-content1">
                  <h3 className="feature-title1">{feature5.title}</h3>
                  <p className="feature-desc1">{feature5.description}</p>
                </div>
                <div className="image-container1">
                  <img
                    src={feature5.image}
                    alt={feature5.title}
                    className="feature-image1"
                  />
                </div>
              </div>
            </div>
    
            <div className="feature-card2">
              <div className="feature-content">
                <div className="image-container2">
                  <img
                    src={feature6.image}
                    alt={feature6.title}
                    className="feature-image2"
                  />
                  <h3 className="feature-title2">{feature6.title}</h3>
                  <p className="feature-desc2">{feature6.description}</p>
                </div>
              </div>
            </div>
          </div>
    
       
          <div className="cta-section">
            
             <button className ="cta-btn"onClick={() => navigate("/timer")}>Go to Timer</button>
          </div>
          
          
        </div>
      );
    }


export default Home;

// import React from 'react';
// import './App.css';
// import featureimg2 from './assets/feature2.png'; // ✅ Correct Import
// import featureimg1 from './assets/feature1.jpeg';
// import featureimg3 from './assets/feature3.png';
// import featureimg4 from './assets/feature4.png';
// import featureimg5 from './assets/feature5.png';
// import featureimg6 from './assets/feature6.png';
// function App() {
//   

// export default App;