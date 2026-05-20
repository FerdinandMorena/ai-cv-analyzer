import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResumes = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResumes();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-500"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-1 min-w-0">
          {companyName && (
            <p className="text-sm font-bold text-white break-words leading-tight">
              {companyName}
            </p>
          )}
          {jobTitle && (
            <p className="text-xs break-words text-blue-300 leading-snug">
              {jobTitle}
            </p>
          )}
          {!companyName && !jobTitle && (
            <p className="text-sm font-bold text-white">Resume</p>
          )}
        </div>
        <div className="shrink-0 ml-2">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border flex-1 overflow-hidden">
          <img
            src={resumeUrl}
            alt={`${companyName ?? "Resume"} preview`}
            className="w-full h-48 sm:h-52 object-cover object-top rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
