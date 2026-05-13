import React from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-1.5 min-w-0">
          <h2 className="text-black! font-bold break-words leading-tight">
            {companyName}
          </h2>
          <h3 className="text-base break-words text-gray-500 leading-snug">
            {jobTitle}
          </h3>
        </div>
        <div className="shrink-0 ml-2">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      <div className="gradient-border flex-1">
        <div className="w-full h-full">
          <img
            src={imagePath}
            alt={`${companyName} resume`}
            className="w-full h-[300px] object-cover object-top rounded-xl"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
