export default function BasiqLogo({ className = "", size = "default" }: { className?: string; size?: "default" | "small" }) {
  const textSize = size === "small" ? "text-xl" : "text-2xl";
  return (
    <span className={`relative inline-flex items-start font-bold tracking-tight ${textSize} ${className}`}>
      <span className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        basiq
      </span>
      <svg
        className={size === "small" ? "ml-[1px] mt-[-2px] h-[14px] w-[14px]" : "ml-[2px] mt-[-3px] h-[18px] w-[18px]"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 6L14 12L8 18"
          stroke="#4ADE80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 6L20 12L14 18"
          stroke="#4ADE80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
