import "./JobCard.css";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>Workers Required: {job.workersRequired}</h3>

      <p>📍 {job.location}</p>

      <p>📅 {job.date}</p>

      <h3>₹ {job.wage}</h3>
    </div>
  );
}

export default JobCard;