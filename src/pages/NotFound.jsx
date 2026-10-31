import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page">
      <h1 className="page-title">Page not found</h1>
      <p className="page-subtitle">That page doesn't exist.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </main>
  );
}

export default NotFound;