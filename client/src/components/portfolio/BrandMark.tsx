type BrandMarkProps = { className?: string };

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="21" fill="currentColor" />
      <path
        d="M22 42V22.5c0-2.6 3.8-3.4 4.9-.7l5.6 14.4c.7 1.8 3 2.2 4.5.8l5.8-5.7c2.3-2.2 6.1-.6 6.1 2.6V42"
        stroke="#FFF9F3"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="46.5" cy="46.5" r="3" fill="#DCC092" />
    </svg>
  );
}
