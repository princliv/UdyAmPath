import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * SkeletonCard — Reusable skeleton loading wrapper
 * Shows placeholder skeleton while data loads, with section-tinted colors
 *
 * Props:
 *   - width: String | Number (default: '100%') — skeleton width
 *   - height: String | Number (default: 200) — skeleton height
 *   - count: Number (default: 1) — number of skeleton lines to show
 *   - borderRadius: String | Number (default: 'var(--radius-lg)') — corner radius
 *   - baseColor: String (default: '#f3f3f3') — base skeleton color
 *   - highlightColor: String (default: '#e0e0e0') — highlight/shimmer color
 *   - className: Optional additional className
 */

const SkeletonCard = ({
  width = '100%',
  height = 200,
  count = 1,
  borderRadius = 16,
  baseColor = '#f3f3f3',
  highlightColor = '#e0e0e0',
  className = '',
}) => {
  const containerStyle = {
    width,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    overflow: 'hidden',
  };

  return (
    <div className={`skeleton-card ${className}`} style={containerStyle}>
      <Skeleton
        height={height}
        count={count}
        baseColor={baseColor}
        highlightColor={highlightColor}
        borderRadius={borderRadius}
        style={{
          marginBottom: '8px',
        }}
      />
    </div>
  );
};

export default SkeletonCard;
