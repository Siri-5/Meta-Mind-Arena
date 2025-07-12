'use client'
import React, { useState } from "react";
import PdfUploader from "@/components/PdfUploader";
import "./page.css";

const GenerateFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);

  const generateFlashcardsFromText = (text) => {
    const sentences = text.split(". ");
    const generatedCards = sentences
      .slice(0, 10) // Limit to 10 flashcards
      .map((sentence, index) => ({
        question: `What is: ${sentence.split(" ")[0]}?`,
        answer: sentence,
      }));
    setFlashcards(generatedCards);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 p-6">
      <div className="container mx-auto max-w-4xl bg-white shadow-2xl rounded-2xl p-8 transition-all hover:shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-red-700 text-center">
          Generate Flashcards 📚
        </h1>

        {/* PDF Upload Feature */}
        <div className="mb-8 flex justify-center">
          <PdfUploader onPdfTextExtracted={generateFlashcardsFromText} />
        </div>

        {/* Flashcards Section */}
        <div className="mt-8">
          {flashcards.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((card, index) => (
                <div
                  key={index}
                  className="p-5 border-2 border-red-500 rounded-2xl shadow-lg bg-red-100 hover:bg-red-200 transition-all transform hover:scale-105"
                >
                  <p className="text-lg font-semibold text-red-800 mb-3">
                    <strong>Q:</strong> {card.question}
                  </p>
                  <p className="text-gray-700">
                    <strong>A:</strong> {card.answer}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 italic">
              No flashcards generated yet. Upload a PDF to generate them!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateFlashcards;
