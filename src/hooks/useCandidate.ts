import { useEffect, useState } from "react";
import { getCandidateByEmail } from "../services/api";
import type { Candidate } from "../types";

interface UseCandidateReturn {
  candidate: Candidate | null;
  loading: boolean;
  error: string | null;
}

export function useCandidate(email: string): UseCandidateReturn {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCandidate() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCandidateByEmail(email);
        if (!cancelled) setCandidate(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch candidate data");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCandidate();
    return () => { cancelled = true; };
  }, [email]);

  return { candidate, loading, error };
}
