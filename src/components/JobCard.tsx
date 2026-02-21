import { useState } from "react";
import { applyToJob } from "../services/api";
import type { Candidate, Job } from "../types";
import "./JobCard.css";

interface JobCardProps {
  job: Job;
  candidate: Candidate;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function JobCard({ job, candidate }: JobCardProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!repoUrl.trim()) {
      setStatus("error");
      setErrorMessage("Please enter a valid GitHub repository URL.");
      return;
    }

    try {
      setStatus("loading");
      setErrorMessage("");

      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl.trim(),
      });

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit application.");
    }
  };

  return (
    <article className="job-card">
      <h3 className="job-card__title">{job.title}</h3>
      <p className="job-card__id">ID: {job.id}</p>

      <div className="job-card__form">
        <input
          type="url"
          className="job-card__input"
          placeholder="https://github.com/your-user/your-repo"
          value={repoUrl}
          onChange={(e) => {
            setRepoUrl(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading" || status === "success"}
        />
        <button
          className={`job-card__button ${status === "success" ? "job-card__button--success" : ""}`}
          onClick={handleSubmit}
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" && "Submitting..."}
          {status === "success" && "✓ Submitted"}
          {(status === "idle" || status === "error") && "Submit"}
        </button>
      </div>

      {status === "error" && (
        <p className="job-card__error" role="alert">{errorMessage}</p>
      )}
      {status === "success" && (
        <p className="job-card__success">Application submitted successfully!</p>
      )}
    </article>
  );
}
