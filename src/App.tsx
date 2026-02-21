import { useCandidate } from "./hooks/useCandidate";
import { useJobs } from "./hooks/useJobs";
import { ErrorMessage } from "./components/ErrorMessage";
import { JobList } from "./components/JobList";
import { Spinner } from "./components/Spinner";
import "./App.css";

const CANDIDATE_EMAIL = "ivanlalvarez.22@gmail.com";

function App() {
  const { candidate, loading: candidateLoading, error: candidateError } = useCandidate(CANDIDATE_EMAIL);
  const { jobs, loading: jobsLoading, error: jobsError } = useJobs();

  const isLoading = candidateLoading || jobsLoading;
  const error = candidateError || jobsError;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Nimble Gravity</h1>
        <p className="app__subtitle">Open Positions</p>
      </header>

      <main className="app__content">
        {candidate && (
          <p className="app__welcome">
            Welcome, <strong>{candidate.firstName} {candidate.lastName}</strong>
          </p>
        )}

        {isLoading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && candidate && (
          <JobList jobs={jobs} candidate={candidate} />
        )}
      </main>

      <footer className="app__footer">
        <p className="app__footer-text">
          Hecho con <span className="app__heart">💛</span> por{" "}
          <a
            href="https://ivan-alvarez.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="app__footer-link"
          >
            Iván Alvarez
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
