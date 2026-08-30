export function TerminalPrompt({ lines }: { lines: readonly string[] }) {
  return (
    <div
      className="w-full max-w-md rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-black/40"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8635f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8b75a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6ee7d8]" />
      </div>
      <div className="space-y-1.5 px-4 py-4 font-mono text-sm">
        {lines.map((line, index) => {
          const isCommand = line.startsWith("$");
          return (
            <p
              key={index}
              className="opacity-0 [animation-fill-mode:forwards] [animation-name:terminal-line] [animation-duration:0.3s]"
              style={{ animationDelay: `${index * 0.35 + 0.2}s` }}
            >
              <span className={isCommand ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)]"}>
                {line}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
