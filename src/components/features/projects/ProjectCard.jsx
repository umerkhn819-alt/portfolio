import { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "../../../animations/gsapSetup";
import { projectOptimizedStem480 } from "../../../lib/optimizedPaths";
import { OptimizedImg } from "../../ui/OptimizedImg";
import { TechStack } from "./TechIcon";

const statusConfig = {
  completed: { label: "Completed", color: "bg-green-500/20 text-green-300 border-green-500/30" },
  "in-progress": { label: "In Progress", color: "bg-white/10 text-white/80 border-white/20" },
  "coming-soon": { label: "Coming Soon", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
};

export const ProjectCard = memo(function ProjectCard({
  id,
  title,
  description,
  tags,
  href,
  image,
  status = "completed",
}) {
  const rootRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const el = rootRef.current;
    if (!el) return;

    const onEnter = () => {
      gsap.to(el, {
        scale: 1.05,
        rotateZ: 1.2,
        y: -8,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 24px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.12)",
        transformPerspective: 1000,
        overwrite: "auto",
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.1,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, {
        scale: 1,
        rotateZ: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 10px 25px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
        overwrite: "auto",
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const statusInfo = statusConfig[status] || statusConfig.completed;
  const isComingSoon = status === "coming-soon";

  return (
    <article
      ref={rootRef}
      data-project-card
      className="group relative overflow-hidden rounded-2xl border border-gray-300 bg-gray-100 shadow-lg shadow-gray-400/20 backdrop-blur-sm transition-all duration-300 will-change-transform hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-surface-raised/50 dark:shadow-black/20 dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)]"
    >
      {/* Background glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-24 rotate-12 bg-gradient-to-br from-white/10 via-transparent to-white/[0.03] blur-2xl" />
      </div>

      <div className="relative flex h-full flex-col overflow-hidden">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-surface-overlay/50">
          {image && !isComingSoon ? (
            <>
              <div ref={imageRef} className="h-full w-full overflow-hidden will-change-transform">
                <OptimizedImg
                  src={image}
                  optimizedBasePath={projectOptimizedStem480(image) ?? undefined}
                  alt={title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, 400px"
                  width={720}
                  height={480}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-surface-raised via-transparent to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 dark:from-white/[0.08] dark:to-white/[0.03]">
              {isComingSoon && (
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wide">Coming Soon</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="relative flex flex-1 flex-col p-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display flex-1 text-lg font-semibold text-gray-900 transition-colors group-hover:text-gray-950 dark:text-white dark:group-hover:text-white">
              {title}
            </h3>
            <div className={`text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap ml-3 ${statusInfo.color}`}>
              {statusInfo.label}
            </div>
          </div>

          {/* Description */}
          <p className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-zinc-400 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors mb-4">
            {description}
          </p>

          {/* Tech Stack with Icons */}
          <div className="flex-1 flex flex-col justify-end">
            {!isComingSoon && (
              <div className="mb-4">
                <TechStack tags={tags} />
              </div>
            )}

            {/* View Details Link */}
            {!isComingSoon && (
              <a
                href={href}
                className="group/link inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                View details
                <span className="transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden>
                  →
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});

