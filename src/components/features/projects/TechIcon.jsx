/**
 * Tech icon mapping for project technologies
 */
const techIcons = {
  React: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1.05-.84 1.89-1.87 1.89-1.03 0-1.87-.84-1.87-1.89 0-1.05.84-1.89 1.87-1.89M19.54 2.23c.82.82.82 2.13 0 2.95-2.18-1.12-4.8-1.78-7.54-1.78s-5.35.66-7.54 1.78c-.82-.82-.82-2.13 0-2.95C5.09.92 6.5.5 8 .5c.54 0 1.08.05 1.6.16 1.36-.67 2.92-1.04 4.4-1.04 1.48 0 3.04.37 4.4 1.04.52-.11 1.06-.16 1.6-.16 1.5 0 2.91.42 4.14 1.23M21.89 12c0 1.64-.36 3.2-.99 4.58-1.46 3.18-4.58 5.33-8.09 5.33-3.41 0-6.48-2.09-7.97-5.16C2.62 15.05 2 13.61 2 12s.62-3.05 1.73-4.58C5.42 4.24 8.49 2.12 12 2.12c2.13 0 4.15.65 5.86 1.86 1.45-1.29 2.74-2.86 3.79-4.6.55 1.28 1.24 2.5 2.04 3.62z" />
    </svg>
  ),
  Node: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
    </svg>
  ),
  Tailwind: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.01,4.42c-2.11,0 -3.66,1.42 -4.12,3.71c0.82,-1.08 1.79,-1.49 2.91,-1.22c0.63,0.16 1.08,0.64 1.57,1.17c0.79,0.9 1.71,1.95 3.71,1.95c2.11,0 3.66,-1.42 4.12,-3.71c-0.82,1.08 -1.79,1.49 -2.91,1.22c-0.63,-0.16 -1.08,-0.64 -1.57,-1.17c-0.79,-0.9 -1.71,-1.95 -3.71,-1.95ZM8.01,14.42c-2.11,0 -3.66,1.42 -4.12,3.71c0.82,-1.08 1.79,-1.49 2.91,-1.22c0.63,0.16 1.08,0.64 1.57,1.17c0.79,0.9 1.71,1.95 3.71,1.95c2.11,0 3.66,-1.42 4.12,-3.71c-0.82,1.08 -1.79,1.49 -2.91,1.22c-0.63,-0.16 -1.08,-0.64 -1.57,-1.17c-0.79,-0.9 -1.71,-1.95 -3.71,-1.95Z" />
    </svg>
  ),
  Vite: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 6v12l10 4 10-4V6l-10-4zm0 2.18l6.36 1.64-6.36 1.64-6.36-1.64 6.36-1.64zm0 12.36l-8-3.2v-6.36l8 3.2 8-3.2v6.36l-8 3.2z" />
    </svg>
  ),
  TypeScript: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125z" />
      <path d="M12.18 4.74h2.053v8.615h-2.053zm5.592 8.615h2.052V13.3c0-1.624.744-2.603 2.08-2.603 1.203 0 1.860.88 1.860 2.603v8.615h2.053v-9.246c0-2.786-1.670-4.165-3.913-4.165-1.747 0-3.023.744-3.38 2.08h-.115V8.74h-1.977v13.649z" />
    </svg>
  ),
  Postgres: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m-5-9h10v2H7z" />
    </svg>
  ),
  OpenAPI: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13h4v2h-4zm0 6h4v2h-4zm0 6h4v2h-4z" />
    </svg>
  ),
  Storybook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-4h2v18h-2z" />
    </svg>
  ),
  A11y: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 10c-2.21 0-4 1.79-4 4v7h2v-7c0-1.1.9-2 2-2s2 .9 2 2v7h2v-7c0-2.21-1.79-4-4-4z" />
    </svg>
  ),
  Motion: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 4l8 4v8l-8 4-8-4v-8l8-4m0 2l-6 3v6l6 3 6-3v-6l-6-3z" />
    </svg>
  ),
  "React Native": (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1.05-.84 1.89-1.87 1.89-1.03 0-1.87-.84-1.87-1.89 0-1.05.84-1.89 1.87-1.89M19.54 2.23c.82.82.82 2.13 0 2.95-2.18-1.12-4.8-1.78-7.54-1.78s-5.35.66-7.54 1.78c-.82-.82-.82-2.13 0-2.95C5.09.92 6.5.5 8 .5c.54 0 1.08.05 1.6.16 1.36-.67 2.92-1.04 4.4-1.04 1.48 0 3.04.37 4.4 1.04.52-.11 1.06-.16 1.6-.16 1.5 0 2.91.42 4.14 1.23z" />
    </svg>
  ),
  Redux: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-14c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z" />
    </svg>
  ),
  CI: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
    </svg>
  ),
};

export function TechIcon({ tech }) {
  const icon = techIcons[tech];
  
  if (!icon) {
    return (
      <div className="w-5 h-5 rounded-full bg-accent/30 flex items-center justify-center text-xs font-bold text-accent-glow">
        {tech.charAt(0)}
      </div>
    );
  }

  return (
    <div className="w-5 h-5 text-accent-glow hover:text-accent transition-colors">
      {icon}
    </div>
  );
}

export function TechStack({ tags }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 hover:border-accent transition-colors group"
          title={tag}
        >
          <TechIcon tech={tag} />
          <span className="text-xs font-medium text-zinc-300 group-hover:text-accent-glow transition-colors">
            {tag}
          </span>
        </div>
      ))}
    </div>
  );
}
