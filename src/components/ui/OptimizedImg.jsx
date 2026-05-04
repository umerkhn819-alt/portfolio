import { useMemo, useState } from "react";

/**
 * When optimizedBasePath is set: tries `.avif`, then `.webp`, then original `src` on decode error.
 * In dev and production the first candidate is AVIF (same order).
 * @param {object} props
 * @param {string} props.src — final fallback (e.g. /profile.jpeg)
 * @param {string} [props.optimizedBasePath] — without extension, e.g. /optimized/profile-1200
 * @param {string} props.alt
 * @param {string} [props.className]
 * @param {import('react').CSSProperties} [props.style]
 * @param {"lazy"|"eager"} [props.loading]
 * @param {"async"|"auto"|"sync"} [props.decoding]
 * @param {"high"|"low"|"auto"} [props.fetchPriority]
 * @param {string} [props.sizes]
 * @param {number} [props.width]
 * @param {number} [props.height]
 * @param {boolean} [props.draggable]
 * @param {import('react').ImgHTMLAttributes<HTMLImageElement>["onLoad"]} [props.onLoad]
 */
export function OptimizedImg({
  src,
  optimizedBasePath,
  alt,
  className,
  style,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  sizes,
  width,
  height,
  draggable,
  onLoad,
}) {
  const candidates = useMemo(() => {
    if (!optimizedBasePath) return [src];
    return [`${optimizedBasePath}.avif`, `${optimizedBasePath}.webp`, src];
  }, [optimizedBasePath, src]);

  const [index, setIndex] = useState(0);

  const safeIndex = Math.min(index, candidates.length - 1);
  const currentSrc = candidates[safeIndex];

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      sizes={sizes}
      width={width}
      height={height}
      draggable={draggable}
      onLoad={onLoad}
      onError={() => {
        setIndex((i) => (i < candidates.length - 1 ? i + 1 : i));
      }}
    />
  );
}
