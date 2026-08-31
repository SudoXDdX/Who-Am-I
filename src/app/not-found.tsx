import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-bg)] px-6">
      <p className="section-kicker">404</p>
      <h1 className="section-title">Página não encontrada / Page not found</h1>
      <div className="flex gap-4">
        <Link href="/pt/" className="project-card-link">
          /pt/
        </Link>
        <Link href="/en/" className="project-card-link">
          /en/
        </Link>
      </div>
    </div>
  );
}
