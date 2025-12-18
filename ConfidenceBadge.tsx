
import React from 'react';
import { Confidence } from '../types';

interface Props {
  level: Confidence;
}

const ConfidenceBadge: React.FC<Props> = ({ level }) => {
  const styles = {
    [Confidence.LOW]: 'bg-amber-50 text-amber-700 border-amber-200',
    [Confidence.MEDIUM]: 'bg-blue-50 text-blue-700 border-blue-200',
    [Confidence.HIGH]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[level]}`}>
      {level} Confidence
    </span>
  );
};

export default ConfidenceBadge;
