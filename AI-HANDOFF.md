# AI Handoff — Who-Am-I Portfolio

> **Ler este arquivo ANTES de qualquer mudança no repo.**

---

## 1. Projeto

| Campo | Valor |
|---|---|
| **Nome** | Who-Am-I |
| **Tipo** | Portfolio pessoal (Next.js static export) |
| **Dono** | SudoXDdX (GitHub: `SudoXDdX`) |
| **URL** | `https://suxd-dev.github.io/Who-Am-I/` |
| **Deploy** | GitHub Pages via Actions (`build` + `deploy` jobs separados) |
| **Branch** | `main` |

## 2. Stack Técnica

- **Framework**: Next.js (static export, `output: "export"`)
- **Estilo**: Tailwind CSS + CSS custom properties (tokens M3)
- **Fontes**: Inter (corpo), JetBrains Mono (code)
- **Ícones**: Lucide React
- **Linguagem**: TypeScript + React
- **Banco de dados**: Nenhum (estático)
- **i18n**: pt-BR + en-US (arquivos JSON em `src/lib/i18n/`)

## 3. Estrutura de Arquivos

```
Who-Am-I/
├── .github/workflows/deploy.yml   # CI/CD — NÃO MEXER sem motivo
├── public/                         # Ícones, imagens, manifest.json
├── src/
│   ├── app/
│   │   ├── globals.css            # CSS global — tokens, animações, componentes
│   │   ├── layout.tsx              # Root layout (i18n, tema, scroll progress)
│   │   └── page.tsx                # Página principal
│   ├── components/
│   │   ├── NeonCard.tsx            # Card principal com gradiente border
│   │   ├── Ripple.tsx              # Efeito ripple (radial-gradient)
│   │   ├── ProjectCard.tsx         # Card de projeto
│   │   ├── Nav.tsx                 # Navegação + tema + lang picker
│   │   ├── ScrollToTop.tsx         # Botão scroll-to-top
│   │   └── ...                     # Outros componentes
│   └── lib/
│       ├── i18n/                   # Traduções (pt-BR, en-US)
│       └── ...                     # Utilitários
├── next.config.ts                  # basePath: process.env.NEXT_PUBLIC_BASE_PATH
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── AGENTS.md                       # Auto-gerado pelo Next.js
├── CLAUDE.md                       # Referencia AGENTS.md
└── AI-HANDOFF.md                   # ESTE ARQUIVO
```

## 4. Deploy (NÃO MEXER)

O `.github/workflows/deploy.yml` usa a arquitetura correta:
- **Job `build`**: checkout → setup node → npm ci → configure-pages → build → upload artifact
- **Job `deploy`**: `environment: github-pages` + `actions/deploy-pages@v4`

O `build_type` do GitHub Pages está configurado como `workflow` (não legacy).
O `NEXT_PUBLIC_BASE_PATH` é injetado pelo `actions/configure-pages@v5`.
O `next.config.ts` usa `basePath: process.env.NEXT_PUBLIC_BASE_PATH || ""`.

## 5. Material Web Features

O site implementa features do Material Design 3 **via CSS puro** (sem `@material/web`):
- **Dual-shadow elevation**: `box-shadow` com key shadow (30%) + ambient shadow (15%)
- **State layers**: `::after` pseudo-element com opacity (hover 8%, focus 12%, pressed 12%)
- **Radial-gradient ripple**: Efeito ripple suave com `radial-gradient` + `max(calc(100% - 70px), 65%)`
- **Focus ring pulse**: Animação pulsante no `:focus-visible`
- **Shape tokens**: `--md-sys-shape-corner-*` para border-radius
- **5 esquemas de cores**: Blue, Pink, Green, Purple, Amber (dark + light)

### Regra de Pseudo-elementos (IMPORTANTE)

Cada elemento só tem **um `::before` e um `::after`**. Nos componentes:
- `box-shadow` para elevation (sem pseudo)
- `::before` para gradiente border (z-index: 2)
- `::after` para state layer (z-index: 1)

**Nunca usar pseudo-elementos conflitantes!**

## 6. Responsividade / Mobile
- Esconder custom cursor em touch: `@media (hover: none) and (pointer: coarse)`
- Scroll-to-top: `bottom: 1.5rem` (não 5.5rem, não há mais music player)
- Hamburger menu no mobile (3 linhas icon)

## 7. Git / Commits

- **User**: `SudoXDdX` <overtonightisgoat@gmail.com>
- **Commits**: Conventional commits (`feat:`, `fix:`, `chore:`, `style:`)
- **Branch**: `main` apenas
- **Push**: Direto para `main` (sem PR)

## 8. Cores / Temas

Os esquemas de cores são definidos em `globals.css` como `[data-color="blue"]`, etc.
Cada esquema define: `--color-primary`, `--color-primary-hover`, `--color-bg`, `--color-surface`, etc.
Dark/light é toggleado via `data-theme="dark"` / `data-theme="light"` no `<html>`.

## 9. O Que NÃO Fazer

- ❌ Não instalar `@material/web` neste repo (Material é via CSS puro)
- ❌ Não mexer no `.github/workflows/deploy.yml` sem necessidade
- ❌ Não apagar o `AI-HANDOFF.md`
- ❌ Não usar `window` ou `document` em server components
- ❌ Não quebrar o `basePath` do `next.config.ts`
- ❌ Não adicionar dependências pesadas sem motivo
- ❌ Não remover o i18n (o site é bilíngue)

## 10. Antes de Qualquer Mudança

1. ✅ Ler este arquivo completo
2. ✅ `git pull` para garantir que está atualizado
3. ✅ `npm install && npm run build` para verificar que nada quebrou
4. ✅ Testar visualmente (pelo menos checar o build)
5. ✅ Fazer commit com conventional commit
6. ✅ `git push origin main`
7. ✅ Verificar o deploy em `https://suxd-dev.github.io/Who-Am-I/`
