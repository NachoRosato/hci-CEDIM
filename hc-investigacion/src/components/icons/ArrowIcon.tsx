export default function ArrowIcon({ direction = 'left', size = 20 }: { direction?: 'left' | 'right'; size?: number }) {
  const rotate = direction === 'left' ? 0 : 180;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

