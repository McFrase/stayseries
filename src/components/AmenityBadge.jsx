export default function AmenityBadge({ icon, label }) {
  return (
    <span className="amenity-badge">
      {icon ? <span className="amenity-badge__icon" aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </span>
  );
}

