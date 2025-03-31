export default function RezonLogo() {
  return (
    <svg
      className="w-10 h-10 mr-2" // Increased size for better visibility
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle with subtle gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2C8C99" />
          <stop offset="100%" stopColor="#931621" />
        </linearGradient>
      </defs>

      {/* Outer circle with gradient */}
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="url(#logoGradient)"
        stroke="white"
        strokeWidth="1.5"
      />

      {/* Central dot with animation-ready styling */}
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="white"
        className="group-hover:scale-110 transition-transform duration-300"
      />

      {/* Clock markers - more refined */}
      {[0, 3, 6, 9].map((marker) => (
        <line
          key={marker}
          x1="12"
          y1="1"
          x2="12"
          y2="3"
          transform={`rotate(${marker * 30} 12 12)`}
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      {/* Play triangle - more prominent */}
      <path
        d="M10 12L15 9V15L10 12Z"
        fill="white"
        className="group-hover:fill-[#FFD700] transition-colors duration-300"
      />

      {/* Optional: Add a subtle glow effect */}
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="transparent"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="4"
        className="pointer-events-none"
      />
    </svg>
  );
}
