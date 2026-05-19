import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor: string;
  let label: string;

  if (score > 70) {
    badgeColor = "bg-green-100 text-green-600";
    label = "Strong";
  } else if (score > 49) {
    badgeColor = "bg-yellow-100 text-yellow-600";
    label = "Good Start";
  } else {
    badgeColor = "bg-red-100 text-red-600";
    label = "Needs Work";
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
};

export default ScoreBadge;
