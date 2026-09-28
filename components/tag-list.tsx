export function TagList({ tags }: { tags: readonly string[] }) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-bg-elevated px-2.5 py-1 font-mono text-xs text-fg-muted transition-colors group-hover:bg-bg"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
