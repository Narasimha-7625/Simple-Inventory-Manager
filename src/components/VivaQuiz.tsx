import React, { useState } from 'react';
import { VIVA_QUESTIONS } from '../data/tutorialTheory';
import { Award, ChevronRight, ChevronLeft, Eye, RotateCcw, Check, Sparkles } from 'lucide-react';

export const VivaQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  const currentQ = VIVA_QUESTIONS[currentIndex];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % VIVA_QUESTIONS.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + VIVA_QUESTIONS.length) % VIVA_QUESTIONS.length);
  };

  const toggleMastered = (id: number) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isMastered = masteredIds.includes(currentQ.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
        <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
          Interactive Viva Flashcards
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-2">Unit IV Viva Revision Mode</h2>
        <p className="text-xs text-slate-500 mt-1">
          Test your conceptual understanding before your lab viva or examination.
        </p>

        {/* Progress bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Question {currentIndex + 1} of {VIVA_QUESTIONS.length}</span>
          <span>Mastered: {masteredIds.length} / {VIVA_QUESTIONS.length}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / VIVA_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-8 min-h-[320px] flex flex-col justify-between transition-all">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
            <span className="font-semibold text-blue-600 uppercase tracking-wider">
              {currentQ.unitTopic}
            </span>
            <span className="font-mono">Card #{currentQ.id}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h3>

          {showAnswer ? (
            <div className="mt-6 pt-5 border-t border-slate-100 text-sm text-slate-700 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <p className="font-semibold text-blue-900 text-xs uppercase tracking-wider mb-1">
                Model Answer:
              </p>
              <p>{currentQ.answer}</p>
            </div>
          ) : (
            <div className="mt-12 text-center text-xs text-slate-400">
              Think about your answer, then click below to verify.
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => toggleMastered(currentQ.id)}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isMastered
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              {isMastered ? 'Marked Mastered' : 'Mark as Mastered'}
            </button>

            <button
              onClick={handlePrev}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
              title="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              title="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
