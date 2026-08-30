import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-8 px-6 py-24">
      <div>
        <p className="font-mono text-sm text-[var(--color-accent)]">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--color-text)]">
          Página não encontrada / Page not found
        </h1>
        <p className="mt-3 text-[var(--color-text-muted)]">
          Esse caminho não existe neste sistema de arquivos. · That path doesn&apos;t exist on
          this filesystem.
        </p>
      </div>
      <div className="flex gap-4 font-mono text-sm">
        <Link href="/pt/" className="text-[var(--color-accent)] underline underline-offset-4">
          voltar para /pt/
        </Link>
        <Link href="/en/" className="text-[var(--color-accent)] underline underline-offset-4">
          back to /en/
        </Link>
      </div>
    </div>
  );
}
