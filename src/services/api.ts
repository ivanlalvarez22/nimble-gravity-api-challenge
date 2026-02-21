import type { ApplyToJobPayload, ApplyToJobResponse, Candidate, Job } from "../types";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `Error ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function getCandidateByEmail(email: string): Promise<Candidate> {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
  );
  return handleResponse<Candidate>(response);
}

export async function getJobsList(): Promise<Job[]> {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
  return handleResponse<Job[]>(response);
}

export async function applyToJob(payload: ApplyToJobPayload): Promise<ApplyToJobResponse> {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<ApplyToJobResponse>(response);
}
