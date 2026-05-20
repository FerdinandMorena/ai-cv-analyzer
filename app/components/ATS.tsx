import { cn } from "~/lib/utils";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl w-full p-5 flex flex-col gap-3",
        score > 69
          ? "bg-gradient-to-b from-green-50 to-white border border-green-100"
          : score > 49
            ? "bg-gradient-to-b from-yellow-50 to-white border border-yellow-100"
            : "bg-gradient-to-b from-red-50 to-white border border-red-100",
      )}
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
    >
      <div className="flex flex-row gap-3 items-center">
        <img
          src={
            score > 69
              ? "/icons/ats-good.svg"
              : score > 49
                ? "/icons/ats-warning.svg"
                : "/icons/ats-bad.svg"
          }
          alt="ATS"
          className="w-8 h-8 shrink-0"
        />
        <p className="text-base font-bold text-navy-900">
          ATS Score &mdash; {score}/100
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-sm text-navy-800">
          How well does your resume pass Applicant Tracking Systems?
        </p>
        <p className="text-sm text-text-muted">
          Your resume was scanned like an employer would. Here's how it
          performed:
        </p>
        <ul className="flex flex-col gap-1.5 mt-1">
          {suggestions.map((suggestion, index) => (
            <li className="flex flex-row gap-2 items-start" key={index}>
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={suggestion.type}
                className="w-4 h-4 mt-0.5 shrink-0"
              />
              <p
                className={cn(
                  "text-sm",
                  suggestion.type === "good"
                    ? "text-green-700"
                    : "text-yellow-700",
                )}
              >
                {suggestion.tip}
              </p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-text-muted mt-1">
          Want a better score? Apply the improvement suggestions listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
