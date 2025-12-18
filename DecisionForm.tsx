
import React, { useState, useMemo } from 'react';
import { Confidence, Decision } from '../types';

interface Props {
  onSubmit: (decision: any) => void;
  onCancel: () => void;
  initialData?: Decision;
  submitLabel?: string;
  title?: string;
  subtitle?: string;
}

const DecisionForm: React.FC<Props> = ({ 
  onSubmit, 
  onCancel, 
  initialData, 
  submitLabel = "Save Decision",
  title = "Record Decision",
  subtitle = "Document the \"Why\" to prevent circular discussions later."
}) => {
  const initialFormState = useMemo(() => ({
    jiraId: initialData?.jiraId || '',
    problem: initialData?.problem || '',
    options: initialData?.options || '',
    tradeoffs: initialData?.tradeoffs || '',
    finalDecision: initialData?.finalDecision || '',
    confidence: initialData?.confidence || Confidence.MEDIUM,
  }), [initialData]);

  const [formData, setFormData] = useState(initialFormState);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormState);
  }, [formData, initialFormState]);

  const handleCancelClick = () => {
    if (isDirty) {
      setShowConfirmCancel(true);
    } else {
      onCancel();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jiraId || !formData.problem || !formData.finalDecision) {
      alert('Please fill in the required fields: Jira ID, Problem, and Final Decision.');
      return;
    }
    onSubmit(initialData ? { ...initialData, ...formData } : formData);
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      {showConfirmCancel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Discard changes?</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">You have unsaved changes. Are you sure you want to leave? Your progress will be lost.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={onCancel}
                className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
              >
                Discard
              </button>
              <button 
                onClick={() => setShowConfirmCancel(false)}
                className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">{title}</h2>
        <p className="text-slate-500 mt-2">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Jira Issue ID <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="e.g. PROD-123"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none mono text-sm"
              value={formData.jiraId}
              onChange={e => setFormData({ ...formData, jiraId: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Confidence Level</label>
            <select
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              value={formData.confidence}
              onChange={e => setFormData({ ...formData, confidence: e.target.value as Confidence })}
            >
              <option value={Confidence.LOW}>Low Confidence</option>
              <option value={Confidence.MEDIUM}>Medium Confidence</option>
              <option value={Confidence.HIGH}>High Confidence</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">The Problem <span className="text-red-500">*</span></label>
          <textarea
            placeholder="What exact challenge were we trying to solve?"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-[100px]"
            value={formData.problem}
            onChange={e => setFormData({ ...formData, problem: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Options Considered</label>
          <textarea
            placeholder="List the 2-3 main paths explored..."
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-[120px]"
            value={formData.options}
            onChange={e => setFormData({ ...formData, options: e.target.value })}
          />
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <label className="block text-sm font-bold text-indigo-900 mb-2">Trade-offs & Rationale</label>
          <p className="text-xs text-indigo-700 mb-3 italic">Crucial: Why did we pick one over the other? What did we sacrifice?</p>
          <textarea
            placeholder="e.g. Choosing Speed over Scalability because..."
            className="w-full px-4 py-3 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px]"
            value={formData.tradeoffs}
            onChange={e => setFormData({ ...formData, tradeoffs: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Final Decision <span className="text-red-500">*</span></label>
          <textarea
            placeholder="Summarize the final call clearly."
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
            value={formData.finalDecision}
            onChange={e => setFormData({ ...formData, finalDecision: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-4 pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-indigo-200"
          >
            {submitLabel}
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="px-6 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DecisionForm;
