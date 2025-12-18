
import React from 'react';
import { Decision } from '../types';
import ConfidenceBadge from './ConfidenceBadge';

interface Props {
  decisions: Decision[];
  onSelect: (id: string) => void;
}

const Timeline: React.FC<Props> = ({ decisions, onSelect }) => {
  if (decisions.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-2xl">
        <p className="text-slate-500 font-medium">No decisions recorded yet.</p>
        <p className="text-slate-400 text-sm mt-1">Start by adding your first decision rationale.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Decision Timeline</h2>
          <p className="text-slate-500 text-sm mt-1">Chronological log of product trade-offs and rationale.</p>
        </div>
        <div className="text-sm text-slate-400 font-medium">
          {decisions.length} {decisions.length === 1 ? 'Decision' : 'Decisions'}
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

        <div className="space-y-12 relative">
          {decisions.map((decision) => (
            <div key={decision.id} className="group relative flex gap-8">
              {/* Dot */}
              <div className="flex-none w-12 h-12 rounded-full border-4 border-slate-50 bg-indigo-600 flex items-center justify-center text-white shadow-sm z-10 transition-transform group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Content Card */}
              <div 
                className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer"
                onClick={() => onSelect(decision.id)}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {decision.jiraId}
                    </span>
                    <ConfidenceBadge level={decision.confidence} />
                  </div>
                  <time className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {new Date(decision.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600">
                  {decision.problem}
                </h3>
                
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-500 italic">
                    By {decision.author}
                  </span>
                  <span className="text-indigo-600 font-semibold flex items-center gap-1">
                    View Rationale
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
