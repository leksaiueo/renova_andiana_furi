import { useState } from "react";
import LandingPage from "./components//LandingPage.tsx";

const questions = [
  "Sayang suka aku gak?",
  "Boong suka aku gak?",
  "Beneran suka aku gak?",
  "Plis tekan iya dong!",
  "Kesempatan terakhir, suka aku gak?",
  "Harus suka aku, kan aku maksa!?",
];

const questionImages = [
  "/assets/meme/love.jpg",
  "/assets/meme/kaget.png",
  "/assets/meme/suki.jpg",
  "/assets/meme/nangid.webp",
  "/assets/meme/buatkamu.jpg",
  "/assets/meme/beluga.jpeg",
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [passed, setPassed] = useState(false);

  const handleYes = () => {
    setPassed(true);
  };

  const handleNo = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  if (passed) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
        <img
          src={questionImages[currentQuestionIndex]}
          alt="Question Image"
          className="w-32 h-32 mx-auto mb-4 rounded-lg object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {questions[currentQuestionIndex]}
        </h1>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleYes}
            className="bg-pink-500 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-600 transition-colors"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-400 transition-colors"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
