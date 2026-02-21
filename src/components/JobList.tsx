import type { Candidate, Job } from "../types";
import { JobCard } from "./JobCard";
import "./JobList.css";

interface JobListProps {
  jobs: Job[];
  candidate: Candidate;
}

export function JobList({ jobs, candidate }: JobListProps) {
  if (jobs.length === 0) {
    return <p className="job-list__empty">No open positions available at the moment.</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
}
