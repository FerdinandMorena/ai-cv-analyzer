import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordian";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-full",
        score > 69
          ? "bg-badge-green"
          : score > 39
            ? "bg-badge-yellow"
            : "bg-badge-red",
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-3.5"
      />
      <p
        className={cn(
          "text-xs font-medium",
          score > 69
            ? "text-badge-green-text"
            : score > 39
              ? "text-badge-yellow-text"
              : "text-badge-red-text",
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-3 items-center py-1.5">
      <p className="text-base font-semibold text-navy-900">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-3 items-center w-full pb-2">
      {/* Quick summary chips */}
      <div className="bg-slate-50 w-full rounded-xl px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt={tip.type}
              className="size-4 shrink-0"
            />
            <p className="text-sm text-text-muted">{tip.tip}</p>
          </div>
        ))}
      </div>

      {/* Detailed cards */}
      <div className="flex flex-col gap-2.5 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-1.5 rounded-xl p-3.5",
              tip.type === "good"
                ? "bg-green-50 border border-green-100 text-green-700"
                : "bg-amber-50 border border-amber-100 text-amber-700",
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={tip.type}
                className="size-4 shrink-0"
              />
              <p className="text-sm font-semibold">{tip.tip}</p>
            </div>
            <p className="text-sm leading-relaxed pl-6">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div
      className="flex flex-col gap-1 w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(148,163,184,0.15)",
        boxShadow: "0 2px 16px rgba(59,130,246,0.06)",
      }}
    >
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone &amp; Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
