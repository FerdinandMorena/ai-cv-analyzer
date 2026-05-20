import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor: string;
  let label: string;

  if (score > 70) {
    badgeColor = "bg-emerald-100 text-emerald-700";
    label = "Strong";
  } else if (score > 49) {
    badgeColor = "bg-amber-100 text-amber-700";
    label = "Good Start";
  } else {
    badgeColor = "bg-red-100 text-red-600";
    label = "Needs Work";
  }

  return (
    <div className={`px-2 py-0.5 rounded-full ${badgeColor}`}>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};

export default ScoreBadge;
