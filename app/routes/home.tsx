import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CVLens" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("auth?next=/");
  }, [auth.isAuthenticated, next]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const allResumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = allResumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="app-bg pt-4">
      <div className="sticky top-0 z-20 px-4 sm:px-6 py-3">
        <Navbar />
      </div>
      <section className="main-section">
        <div className="page-heading py-6">
          <h1>Track Your Applications &amp; CV Ratings</h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src="/images/resume-scan-2.gif"
              className="w-36 sm:w-44"
              alt="Loading..."
            />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center mt-8">
            <Link to="/upload" className="primary-button w-fit">
              Upload Your Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
