'use client';
import React, { useEffect, useState } from 'react';
import './page.css';
// import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const featureimg2 = '/assets/feature2.jpg';
const featureimg1 = '/assets/feature1.png';
const featureimg3 = '/assets/streak.png';
const featureimg4 = '/assets/escape room.jpg';
const featureimg5 = '/assets/coding.png';
const featureimg6 = '/assets/flashcard.png';
function App() {
  const router = useRouter();
  
  const [isSignedIn, setIsSignedIn] = useState(false);// Check user authentication

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        // router.push('/home'); // Redirect if signed in
      } else {
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Handle Get Started button click
  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/home"); // Redirect to dashboard if signed in
    } else {
      router.push("/sign-up"); // Redirect to sign-up if not signed in
    }
  };

  // Animated text logic
  const textToAnimate = "Taake a Glimpse at What’s Inside!";
  const [animatedText, setAnimatedText] = useState('');
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < textToAnimate.length) {
        setAnimatedText((prev) => prev + textToAnimate.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Typing speed

    return () => clearInterval(interval);
  }, []);

  // Feature data for each section
  const feature1 = {
    title: 'Learning Paths',
    description:
      'Unlock new levels by completing quizzes and track progress through structured content.',
    image: featureimg2,
  };
  const feature2 = {
    title: 'Contests & Quizzes',
    description:
      'Participate in weekly contests and topic-based quizzes to test your knowledge.',
    image: featureimg1,
  };
  const feature3 = {
    title: 'Streak',
    description:
      'Maintain daily streaks to stay motivated and track consistent progress.',
    image: featureimg3,
  };
  const feature4 = {
    title: 'Escape Rooms',
    description:
      'Solve interactive challenges in a gamified escape room environment.',
    image: featureimg4,
  };
  const feature5 = {
    title: 'Dev Updates',
    description:
      'Stay informed with regular updates on features and improvements.',
    image: featureimg5,
  };
  const feature6 = {
    title: 'Flash Cards',
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

      {/* Animated Text Section */}
      <div className="abt" id="animated-text">
        <p>{animatedText}</p>
        <p>
          <br />
        </p>
      </div>

      {/* Feature Cards - Section 1 */}
      <div className="features-container">
        <div className={`feature-card1`}>
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

        <div className={`feature-card2`}>
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

      {/* Feature Cards - Section 2 */}
      <div className="features-container">
        <div className={`feature-card2`}>
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

        <div className={`feature-card1`}>
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

      {/* Feature Cards - Section 3 */}
      <div className="features-container">
        <div className={`feature-card1`}>
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

        <div className={`feature-card2`}>
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

      {/* CTA Section */}
      <div className="cta-section">
        <button className="cta-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}


export default App;

