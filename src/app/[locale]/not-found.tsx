import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <div className="page-content flex flex-col items-start gap-8">
      <div>
        <p className="section-kicker">404</p>
        <h1 className="section-title">
          Página não encontrada / Page not found
        </h1>
        <p className="mt-3 text-[var(--color-text-sec)]">
          Esse caminho não existe neste sistema de arquivos. · That path doesn&apos;t exist on
          this filesystem.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/pt/" className="project-card-link">
          voltar para /pt/
        </Link>
        <Link href="/en/" className="project-card-link">
          back to /en/
        </Link>
      </div>
    </div>
  );
}
