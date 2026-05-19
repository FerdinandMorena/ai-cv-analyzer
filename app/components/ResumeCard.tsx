import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { auth, fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResumes = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResumes();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-1.5 min-w-0">
          {companyName && (
            <h2 className="text-black! font-bold break-words leading-tight">
              {companyName}
            </h2>
          )}
          {
            <h3 className="text-base break-words text-gray-500 leading-snug">
              {jobTitle}
            </h3>
          }
          {!companyName && !jobTitle && (
            <h2 className="text-black! font-bold">Resume</h2>
          )}
        </div>
        <div className="shrink-0 ml-2">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border flex-1">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt={`${companyName} resume`}
              className="w-full h-[300px] object-cover object-top rounded-xl"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
