// pages/quest-lobby.js
'use client';
// pages/aptitude-path.js
import React, { useState } from 'react';
import Link from 'next/link'; // Use Next.js Link for routing
import { Book, BookOpen, Brain, Calculator, ChevronRight, Clock, ListChecks, Medal, BookText } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@headlessui/react';

const AptitudePath = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);

  const levels = [
    {
      id: 1,
      title: 'Fundamentals',
      description: 'Master the basics of aptitude testing',
      topics: [
        {
          id: 1,
          title: 'Number Systems',
          description: 'Learn about natural numbers, integers, rational numbers, and their properties',
          icon: <Calculator className="text-game-accent-cyan" />,
          difficulty: 'Beginner',
          estimatedTime: '30 mins',
          completed: false,
          locked: false,
        },
        {
          id: 2,
          title: 'Basic Arithmetic',
          description: 'Understand addition, subtraction, multiplication, division, and their applications',
          icon: <Calculator className="text-game-accent-cyan" />,
          difficulty: 'Beginner',
          estimatedTime: '45 mins',
          completed: false,
          locked: false,
        },
        {
          id: 3,
          title: 'Percentages',
          description: 'Master calculating percentages and their real-world applications',
          icon: <Calculator className="text-game-accent-cyan" />,
          difficulty: 'Beginner',
          estimatedTime: '30 mins',
          completed: false,
          locked: true,
        },
      ]
    },
    // Other levels remain the same...
  ];

  const openTopicDialog = (topic) => {
    setSelectedTopic(topic);
    setTopicDialogOpen(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-500';
      case 'Intermediate':
        return 'bg-blue-500/20 text-blue-500';
      case 'Advanced':
        return 'bg-purple-500/20 text-purple-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-dark-blue to-[#14121d] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/" passHref>
            <button className="mr-2">
              <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
              Back
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-game-accent-cyan">Aptitude Learning Path</h1>
        </div>
        
        <div className="space-y-8">
          {levels.map((level) => (
            <div key={level.id} className="bg-game-darker-blue rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="inline-flex items-center justify-center rounded-full bg-game-accent-cyan text-white w-8 h-8 mr-2">
                  {level.id}
                </span>
                {level.title}
              </h2>
              <p className="text-white/70 mb-6">{level.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {level.topics.map((topic) => (
                  <div 
                    key={topic.id}
                    className={`bg-game-darker-blue/50 border border-gray-700 hover:border-game-accent-cyan transition-colors ${topic.locked ? 'opacity-60' : ''}`}
                  >
                    <div className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center text-2xl text-game-accent-cyan mb-2">
                          {topic.icon}
                        </div>
                        <span className={getDifficultyColor(topic.difficulty)}>
                          {topic.difficulty}
                        </span>
                      </div>
                      <h3 className="text-white text-lg">{topic.title}</h3>
                      <p className="text-white/70">{topic.description}</p>
                    </div>
                    <div className="flex items-center text-sm text-white/60">
                      <Clock className="mr-2 h-4 w-4" />
                      {topic.estimatedTime}
                    </div>
                    <div className="mt-4">
                      <button 
                        className="w-full bg-blue-500 text-white py-2 rounded-lg"
                        disabled={topic.locked}
                        onClick={() => !topic.locked && openTopicDialog(topic)}
                      >
                        {topic.completed ? 'Review' : 'Start'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={topicDialogOpen} onClose={() => setTopicDialogOpen(false)}>
        <DialogContent className="bg-game-darker-blue border-gray-700 text-white max-w-2xl">
          {selectedTopic && (
            <>
              <DialogHeader>
                <div className="flex items-center mb-2">
                  {selectedTopic.icon}
                  <span className={getDifficultyColor(selectedTopic.difficulty)}>
                    {selectedTopic.difficulty}
                  </span>
                </div>
                <DialogTitle className="text-2xl">{selectedTopic.title}</DialogTitle>
                <DialogDescription className="text-white/70">
                  {selectedTopic.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="bg-game-dark-blue/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">What you'll learn:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-white/70">
                    <li>Core concepts and fundamental principles</li>
                    <li>Problem-solving techniques and shortcuts</li>
                    <li>Real-world applications and examples</li>
                    <li>Practice exercises with step-by-step solutions</li>
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-white/70">
                    <Clock className="mr-2 h-4 w-4" />
                    Estimated time: {selectedTopic.estimatedTime}
                  </div>
                  <button 
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => setTopicDialogOpen(false)}
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AptitudePath;

