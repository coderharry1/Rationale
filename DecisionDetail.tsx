
import React, { useState } from 'react';
import { Decision } from '../types';
import ConfidenceBadge from './ConfidenceBadge';
import DecisionForm from './DecisionForm';

interface Props {
  decision: Decision;
  onBack: () => void;
  onUpdate: (decision: Decision) => void;
}

const DecisionDetail: React.FC<Props> = ({ decision, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedData: Decision) => {
    onUpdate(updatedData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <DecisionForm 
        initialData={decision}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        submitLabel="Save Changes"
        title="Edit Decision"
        subtitle="Refine the rationale or update the outcome."
      />
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="mono text-sm font-bold bg-slate-900 text-white px-3 py-1 rounded">
            {decision.jiraId}
          </div>
          <ConfidenceBadge level={decision.confidence} />
        </div>
        <div className="flex items-center gap-6">
          <div className="text-slate-400 text-sm font-medium">
            Logged on {new Date(decision.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-colors border border-indigo-100 hover:border-indigo-300 bg-indigo-50 px-3 py-1.5 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-900 mb-12 leading-tight">
        {decision.problem}
      </h2>

      <div className="space-y-12">
        <section>
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Options Considered</h3>
          <div className="prose prose-slate max-w-none whitespace-pre-wrap bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-700">
            {decision.options || 'None documented.'}
          </div>
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Trade-offs & Rationale</h3>
          <div className="prose prose-indigo max-w-none whitespace-pre-wrap bg-indigo-50 p-6 rounded-xl border border-indigo-200 text-indigo-900 font-medium leading-relaxed">
            {decision.tradeoffs || 'None documented.'}
          </div>
        </section>

        <section className="border-t border-slate-200 pt-10">
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Final Decision</h3>
          <div className="text-2xl font-bold text-slate-900 bg-white border-2 border-slate-900 p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)]">
            {decision.finalDecision}
          </div>
        </section>
      </div>

      <div className="mt-16 flex justify-center">
        <button
          onClick={onBack}
          className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Timeline
        </button>
      </div>
    </article>
  );
};

export default DecisionDetail;
