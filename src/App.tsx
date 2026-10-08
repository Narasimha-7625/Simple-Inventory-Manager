import React, { useState } from 'react';
import { InventoryManager } from './components/InventoryManager';
import { TestRunner } from './components/TestRunner';
import { CodeExplorer } from './components/CodeExplorer';
import { TheoryGuide } from './components/TheoryGuide';
import { VivaQuiz } from './components/VivaQuiz';
import { Package, PlayCircle, Code2, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'app' | 'test' | 'code' | 'theory' | 'quiz'>('app');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-3.5 gap-3">
            {/* Logo and Context */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white shadow-sm">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-base sm:text-lg text-white tracking-tight">
                    Simple Inventory Manager
                  </h1>
                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded border border-blue-400/30">
                    Spring Boot 3
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Tutorial 4 • Full Stack Web Development (Unit IV Scope)
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs font-medium">
              <button
                onClick={() => setActiveTab('app')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'app'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                Live App & Flow
              </button>

              <button
                onClick={() => setActiveTab('test')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'test'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <PlayCircle className="w-3.5 h-3.5" />
                JUnit 5 Tests
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'code'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Code & Maven ZIP
              </button>

              <button
                onClick={() => setActiveTab('theory')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'theory'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Unit-IV Guide (11 Topics)
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === 'quiz'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Viva Flashcards
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'app' && <InventoryManager />}
        {activeTab === 'test' && <TestRunner />}
        {activeTab === 'code' && <CodeExplorer />}
        {activeTab === 'theory' && <TheoryGuide />}
        {activeTab === 'quiz' && <VivaQuiz />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            Tutorial 4: Simple Spring Boot Inventory Manager (Unit-IV Curriculum)
          </p>
          <p>
            Pure Three-Tier Architecture: Presentation Layer (Controller & Static Web) ➔ Service Layer (Validation) ➔ Domain Layer (POJO Model + In-Memory Store)
          </p>
          <p className="text-[11px] text-slate-400">
            Strictly Unit IV: No JPA, Hibernate, Microservices, Docker, or Cloud.
          </p>
        </div>
      </footer>
    </div>
  );
}
