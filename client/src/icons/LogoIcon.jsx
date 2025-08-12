const LogoIcon = () => (
   <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Horizontal bar on top */}
    <rect x="10" y="10" width="100" height="12" fill="#0b0b8b" />

    {/* Upward triangle below the bar */}
    <path
      d="M30 20 L60 65 L90 20 Z"
      fill="#0b0b8b"
    />

    {/* Vertical downward bar */}
    <rect x="55" y="65" width="10" height="35" fill="#0b0b8b" />

    {/* Circle below the vertical bar */}
    <circle cx="60" cy="105" r="15" fill="#0b0b8b" />
  </svg>
);

export default LogoIcon;