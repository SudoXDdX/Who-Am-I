export function TerminalPrompt({ lines }: { lines: readonly string[] }) {
  return (
    <div className="terminal-window" aria-hidden="true">
      <div className="terminal-top-border" />
      <div className="terminal-dots">
        <span className="terminal-dot" style={{ background: "#e8635f" }} />
        <span className="terminal-dot" style={{ background: "#F59E0B" }} />
        <span className="terminal-dot" style={{ background: "#82B1FF" }} />
      </div>
      <div className="terminal-body">
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
