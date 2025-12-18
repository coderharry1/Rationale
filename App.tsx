
import React, { useState, useEffect } from 'react';
import { Decision, View, Confidence } from './types';
import { INITIAL_DECISIONS } from './constants';
import Timeline from './components/Timeline';
import DecisionForm from './components/DecisionForm';
import DecisionDetail from './components/DecisionDetail';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [view, setView] = useState<View>('timeline');
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('rationale_decisions');
    if (saved) {
      setDecisions(JSON.parse(saved));
    } else {
      setDecisions(INITIAL_DECISIONS);
    }
  }, []);

  useEffect(() => {
    if (decisions.length > 0) {
      localStorage.setItem('rationale_decisions', JSON.stringify(decisions));
    }
  }, [decisions]);

  const handleAddDecision = (newDecision: Omit<Decision, 'id' | 'createdAt' | 'author'>) => {
    const decision: Decision = {
      ...newDecision,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      author: 'Current User', // Placeholder for simplicity
    };
    setDecisions([decision, ...decisions]);
    setView('timeline');
  };

  const handleUpdateDecision = (updatedDecision: Decision) => {
    setDecisions(decisions.map(d => d.id === updatedDecision.id ? updatedDecision : d));
  };

  const selectedDecision = decisions.find(d => d.id === selectedDecisionId);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('timeline')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold italic">R</div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Rationale</h1>
          </div>
          
          <div className="flex gap-4">
            {view !== 'create' && (
              <button
                onClick={() => setView('create')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Record Decision
              </button>
            )}
            {view !== 'timeline' && (
              <button
                onClick={() => setView('timeline')}
                className="text-slate-600 hover:text-slate-900 px-3 py-2 font-medium"
              >
                Back to Timeline
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        {view === 'timeline' && (
          <Timeline 
            decisions={decisions} 
            onSelect={(id) => {
              setSelectedDecisionId(id);
              setView('detail');
            }}
          />
        )}
        
        {view === 'create' && (
          <DecisionForm 
            onSubmit={handleAddDecision} 
            onCancel={() => setView('timeline')}
          />
        )}

        {view === 'detail' && selectedDecision && (
          <DecisionDetail 
            decision={selectedDecision} 
            onBack={() => setView('timeline')}
            onUpdate={handleUpdateDecision}
          />
        )}
      </main>

      <ChatBot decisions={decisions} />

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            Rationale &bull; Async Decision Repository &bull; Complementary to Jira
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
