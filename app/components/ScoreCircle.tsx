const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 38;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  const ringColor =
    score > 70 ? "#10b981" : score > 49 ? "#f59e0b" : "#ef4444";
  const textColor =
    score > 70 ? "#10b981" : score > 49 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-16 h-16">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 76 76"
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx="38"
          cy="38"
          r={normalizedRadius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
          fill="transparent"
        />
        {/* Progress ring */}
        <circle
          cx="38"
          cy="38"
          r={normalizedRadius}
          stroke={ringColor}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-xs" style={{ color: textColor }}>
          {score}
        </span>
        <span className="text-[9px] text-blue-300 leading-none">/100</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
