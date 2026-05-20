import React, { useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const upload = () => {
  const { fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (f: File | null) => setFile(f);

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading your CV…");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image…");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText("Error: Failed to convert PDF to image");

    setStatusText("Uploading the image…");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload the image");

    setStatusText("Preparing data…");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing your resume with AI…");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );
    if (!feedback) return setStatusText("Error: Failed to analyze the resume");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete! Redirecting…");
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) return setStatusText("Please upload your CV before submitting.");
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="app-bg pt-4">
      <div className="sticky top-0 z-20 px-4 sm:px-6 py-3">
        <Navbar />
      </div>
      <section className="main-section">
        <div className="page-heading py-4">
          <h1>Smart feedback for your dream job!</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="scan"
                className="w-full max-w-xs mt-2"
              />
            </>
          ) : (
            <h2>Drop your CV for an ATS score and improvement tips</h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 mt-4 w-full text-left"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  placeholder="Company Name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="Job Title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  className="resize-none"
                  name="job-description"
                  id="job-description"
                  placeholder="Job Description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload CV</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              {statusText && (
                <p className="text-red-400 text-sm">{statusText}</p>
              )}

              <button className="primary-button w-full" type="submit">
                Analyze CV
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
