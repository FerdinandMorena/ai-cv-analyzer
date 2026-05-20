import React from "react";
import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";

const getScoreColor = (score: number) => {
  if (score > 70) return "#059669";
  if (score > 49) return "#d97706";
  return "#dc2626";
};

const Category = ({ title, score }: { title: string; score: number }) => {
  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center">
          <h3 className="text-white text-sm font-semibold">{title}</h3>
          <ScoreBadge score={score} />
        </div>
        <p className="text-sm shrink-0">
          <span
            className="font-bold text-base"
            style={{ color: getScoreColor(score) }}
          >
            {score}
          </span>
          <span className="text-slate-400">/100</span>
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div
      className="w-full rounded-2xl animate-in fade-in duration-500"
      style={{
        background:
          "linear-gradient(135deg, rgba(30,41,59,0.92), rgba(15,23,42,0.95))",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "clamp(1rem, 3vw, 1.5rem)",
        boxShadow:
          "0 4px 32px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
        <div className="shrink-0">
          <ScoreGauge score={feedback.overallScore} />
        </div>
        <div className="flex flex-col gap-1 text-center lg:text-left">
          <h2
            className="text-white font-bold"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)" }}
          >
            Your CV Score
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Based on tone, content, structure, and skills analysis.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px mb-4"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />

      <div className="space-y-2">
        <Category
          title="Tone &amp; Style"
          score={feedback.toneAndStyle.score}
        />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};

export default Summary;
