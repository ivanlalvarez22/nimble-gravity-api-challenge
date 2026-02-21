import { useEffect, useState } from "react";
import { getJobsList } from "../services/api";
import type { Job } from "../types";

interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

export function useJobs(): UseJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchJobs() {
      try {
        setLoading(true);
        setError(null);
        const data = await getJobsList();
        if (!cancelled) setJobs(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch jobs");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchJobs();
    return () => { cancelled = true; };
  }, []);

  return { jobs, loading, error };
}
