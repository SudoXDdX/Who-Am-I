import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-bg)] px-6 text-[var(--color-text)]">
      <p className="font-mono text-sm text-[var(--color-accent)]">404</p>
      <h1 className="text-2xl font-semibold">Página não encontrada / Page not found</h1>
      <div className="flex gap-4 font-mono text-sm">
        <Link href="/pt/" className="text-[var(--color-accent)] underline underline-offset-4">
          /pt/
        </Link>
        <Link href="/en/" className="text-[var(--color-accent)] underline underline-offset-4">
          /en/
        </Link>
      </div>
    </div>
  );
}
