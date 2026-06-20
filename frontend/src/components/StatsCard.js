import "./StatsCard.css";

function StatsCard({ title, value, color }) {
  return (
    <div
      className="stats-card"
      style={{
        background: color
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

export default StatsCard;