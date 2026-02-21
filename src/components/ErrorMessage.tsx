import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <span className="error-icon">⚠</span>
      <p>{message}</p>
    </div>
  );
}
