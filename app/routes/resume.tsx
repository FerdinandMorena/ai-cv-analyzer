import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "CVLens | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      setResumeUrl(URL.createObjectURL(pdfBlob));

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      setImageUrl(URL.createObjectURL(imageBlob));
      setFeedback(data.feedback);
    };

    loadResume();
  }, [id]);

  return (
    <main className="app-bg" style={{ paddingTop: 0 }}>
      {/* Sticky top nav */}
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5" />
          <span>Back to Homepage</span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        {/* Left — resume preview */}
        <section
          className="feedback-section h-screen sticky top-0 items-center justify-center overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {imageUrl && resumeUrl ? (
            <div className="animate-in fade-in duration-700 gradient-border h-[90%] w-fit max-w-full">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="Resume preview"
                  className="w-full h-full object-contain rounded-xl"
                  title="Click to open PDF"
                />
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <img
                src="/images/resume-scan-2.gif"
                alt="Loading…"
                className="w-32 sm:w-44"
              />
            </div>
          )}
        </section>

        {/* Right — feedback */}
        <section className="feedback-section overflow-y-auto">
          <p
            className="font-bold"
            style={{ fontSize: "1.25rem", color: "#ffffff" }}
          >
            Resume Review
          </p>
          {feedback ? (
            <div className="flex flex-col gap-6 animate-in fade-in duration-700">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <div className="flex items-center justify-center py-16">
              <img
                src="/images/resume-scan-2.gif"
                alt="Loading feedback…"
                className="w-32 sm:w-44"
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default resume;
