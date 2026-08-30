export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-[var(--color-accent)]">{kicker}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
        {title}
      </h1>
    </div>
  );
}
