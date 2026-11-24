export default function Heart({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2A7B5" />
          <stop offset="100%" stopColor="#e88a9c" />
        </linearGradient>
      </defs>
      <path fill="url(#heartGrad)" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.5 4.5c2 0 3.5 1.1 4.5 2.6l1 1.4 1-1.4c1-1.5 2.5-2.6 4.5-2.6 3.8 0 5.6 3.9 4.1 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}
