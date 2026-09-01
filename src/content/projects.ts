import type { Locale } from "@/lib/i18n";

export type ProjectStatus =
  | "idea"
  | "prototype"
  | "research"
  | "active"
  | "delivered"
  | "parked";

export interface ProjectStory {
  context: { pt: string; en: string };
  problem: { pt: string; en: string };
  exploration: { pt: string; en: string };
  build: { pt: string; en: string };
  result: { pt: string; en: string };
  lessons: { pt: string; en: string };
}

export interface Project {
  slug: string;
  title: string;
  summary: { pt: string; en: string };
  status: ProjectStatus;
  role: { pt: string; en: string };
  period: { pt: string; en: string };
  technologies: string[];
  github?: string;
  story?: ProjectStory;
  securityNote?: boolean;
  pending?: boolean;
}

export const projects: Project[] = [
  {
    slug: "root-my-galaxy",
    title: "Root-My-Galaxy (SM-a576b)",
    summary: {
      pt: "Fork do app Root-My-Galaxy portado para dar suporte ao Galaxy A57 5G (SM-A576B). App Android em Kotlin/Jetpack Compose que automatiza o processo de root via KernelSU usando o exploit CVE-2026-43499 (Ghost Lock), com detecção automática de dispositivo, download verificado de payloads e interface Material Expressive 3.",
      en: "Fork of the Root-My-Galaxy app ported to support the Galaxy A57 5G (SM-A576B). Android app in Kotlin/Jetpack Compose that automates KernelSU rooting via the CVE-2026-43499 (Ghost Lock) exploit, with automatic device detection, verified payload downloads and a Material Expressive 3 interface.",
    },
    status: "active",
    role: {
      pt: "Port, adaptação do app e do pipeline de build para o A57 5G",
      en: "Port, app adaptation and build pipeline for the A57 5G",
    },
    period: { pt: "2026 – presente", en: "2026 – present" },
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3 (Expressive)",
      "materialkolor",
      "KernelSU",
      "Android NDK (C)",
      "Shizuku",
      "GitHub Actions",
    ],
    github: "https://github.com/SudoXDdX/Root-My-Galaxy-SM-a576b",
    story: {
      context: {
        pt: "O Root-My-Galaxy é um app open-source que facilita o root com KernelSU em Galaxys Samsung usando o exploit CVE-2026-43499 (Ghost Lock). O projeto original cobre S23/S24/S25 e alguns A-series, mas o Galaxy A57 5G (SM-A576B) com kernel 6.12.38 não tinha suporte nenhum — nem no app, nem nos payloads.",
        en: "Root-My-Galaxy is an open-source app that makes KernelSU rooting easy on Samsung Galaxys using the CVE-2026-43499 (Ghost Lock) exploit. The original project covers S23/S24/S25 and some A-series devices, but the Galaxy A57 5G (SM-A576B) on kernel 6.12.38 had zero support — neither in the app nor in the payloads.",
      },
      problem: {
        pt: "O A57 usa um kernel diferente (6.12.38 vs 6.6.x ou 5.15.x dos outros devices), precisando de um módulo KernelSU compilado especificamente pra esse kernel, um exploit adaptado, e o app precisava reconhecer o modelo e apontar pro repositório de payloads correto (o meu fork). Além disso, o desenvolvimento foi feito em grande parte no próprio A57, via Termux e PC — sem emulador.",
        en: "The A57 uses a different kernel (6.12.38 vs 6.6.x or 5.15.x on other devices), requiring a KernelSU module compiled specifically for that kernel, an adapted exploit, and the app needed to recognize the model and point to the correct payloads repo (my fork). On top of that, development was mostly done on the A57 itself, via Termux and PC — no emulator.",
      },
      exploration: {
        pt: "Comecei estudando como o app original resolve devices: o SupportManifest parseia um targets-v3.json com perfis de dispositivo, versões de kernel suportadas, e URLs de download pinadas por commit SHA. Cada device precisa de um exploit .so e um binário ksud compilados pro kernel específico. A questão era: compilar o KernelSU pro 6.12.38 do A57, gerar o exploit correto, e fazer o app reconhecer tudo isso.",
        en: "I started by studying how the original app resolves devices: the SupportManifest parses a targets-v3.json with device profiles, supported kernel versions, and download URLs pinned by commit SHA. Each device needs an exploit .so and a ksud binary compiled for the specific kernel. The question was: compile KernelSU for the A57's 6.12.38, generate the correct exploit, and make the app recognize all of it.",
      },
      build: {
        pt: "O fork do app foi adaptado para apontar pro meu repositório de payloads (com profiles do A57 e outros devices). O payload repo usa um schema versionado (v3) com verificação de tamanho por artefato e pin de commit. O KernelSU foi compilado com um patch custom que desabilita RKP/DEFEX no kernel Samsung via KDP. O app usa MaterialExpressiveTheme com MotionScheme.expressive(), geração de paleta via materialkolor (PaletteStyle.TonalSpot, SPEC_2025), e suporte a 11 idiomas. A interface tem步骤 visuais de instalação (verificação → download → exploit → KernelSU) com haptic feedback e auto-scroll de log.",
        en: "The app fork was adapted to point to my payloads repository (with A57 profiles and other devices). The payload repo uses a versioned schema (v3) with per-artifact size verification and commit pinning. KernelSU was compiled with a custom patch that disables RKP/DEFEX on the Samsung kernel via KDP. The app uses MaterialExpressiveTheme with MotionScheme.expressive(), palette generation via materialkolor (PaletteStyle.TonalSpot, SPEC_2025), and support for 11 languages. The UI has visual installation steps (check → download → exploit → KernelSU) with haptic feedback and auto-scrolling log.",
      },
      result: {
        pt: "O app reconhece o A57 5G automaticamente, baixa os payloads verificados do meu repo, e aplica o exploit. O root via KernelSU funciona na RAM — reboot remove, mas é só rodar de novo. O repo de payloads cobre 10 dispositivos além do A57, incluindo S25 série, Z Fold 7, S24 série e A56/A36.",
        en: "The app recognizes the A57 5G automatically, downloads verified payloads from my repo, and applies the exploit. The KernelSU root works in RAM — a reboot removes it, but you just run it again. The payloads repo covers 10 devices beyond the A57, including the S25 series, Z Fold 7, S24 series and A56/A36.",
      },
      lessons: {
        pt: "Trabalhar dentro das limitações do próprio dispositivo que você está portando te força a entender o sistema de forma muito mais íntima. Cada erro de compilação, cada crash do exploit, cada mismatch de versão ensina algo que um emulador jamais ensinaria. E pinar artefatos por commit SHA não é paranoia — é o mínimo pra garantir que quem baixa recebe exatamente o que foi testado.",
        en: "Working within the limitations of the device you're porting to forces you to understand the system much more intimately. Every compilation error, every exploit crash, every version mismatch teaches you something an emulator never would. And pinning artifacts by commit SHA isn't paranoia — it's the minimum to guarantee that whoever downloads gets exactly what was tested.",
      },
    },
  },
  {
    slug: "root-my-galaxy-payloads",
    title: "Root-My-Galaxy-Payloads (SM-a576b)",
    summary: {
      pt: "Repositório de payloads para o Root-My-Galaxy: módulos KernelSU pré-compilados, exploits binários e um sistema de manifesto versionado com verificação de integridade. Suporta 11 dispositivos Samsung incluindo o Galaxy A57 5G portado do zero.",
      en: "Payload repository for Root-My-Galaxy: pre-compiled KernelSU modules, binary exploits and a versioned manifest system with integrity verification. Supports 11 Samsung devices including the Galaxy A57 5G ported from scratch.",
    },
    status: "active",
    role: {
      pt: "Compilação de KernelSU, build de exploits, manutenção do manifesto de targets",
      en: "KernelSU compilation, exploit builds, targets manifest maintenance",
    },
    period: { pt: "2026 – presente", en: "2026 – present" },
    technologies: [
      "KernelSU",
      "Linux Kernel (6.12 / 6.6 / 6.1 / 5.15)",
      "Samsung KDP",
      "RKP / DEFEX",
      "C / NDK",
      "Makefile",
      "Python (audit tooling)",
    ],
    github: "https://github.com/SudoXDdX/Root-My-Galaxy-Payloads-SM-a576b",
    story: {
      context: {
        pt: "O repo de payloads é a peça central que o app consome: ele hospeda os binários compilados (exploit .so + ksud) e um manifesto JSON (targets-v3.json) que o app usa pra descobrir qual payload baixar pra cada device. Sem esse repo, o app é só uma interface vazia.",
        en: "The payloads repo is the central piece the app consumes: it hosts the compiled binaries (exploit .so + ksud) and a JSON manifest (targets-v3.json) that the app uses to discover which payload to download for each device. Without this repo, the app is just an empty interface.",
      },
      problem: {
        pt: "Cada dispositivo Samsung tem um kernel diferente, e o KernelSU precisa ser compilado especificamente pra cada versão. O A57 5G roda kernel 6.12.38 — mais novo que os outros devices suportados — então não existia módulo pronto. Além disso, kernels Samsung têm proteções extras (RKP, DEFEX, KDP) que precisam ser lidadas no patch do KernelSU.",
        en: "Each Samsung device has a different kernel, and KernelSU needs to be compiled specifically for each version. The A57 5G runs kernel 6.12.38 — newer than the other supported devices — so no pre-built module existed. On top of that, Samsung kernels have extra protections (RKP, DEFEX, KDP) that need to be handled in the KernelSU patch.",
      },
      exploration: {
        pt: "Estudei como o KernelSU é empacotado como módulo kernel (.ko) com um patch que modifica a inicialização do kernel pra injetar o su. O repo original usa um Makefile e patches .patch que aplicam as modificações necessárias. Para o A57, precisei adaptar o patch pra kernel 6.12, lidar com mudanças na API do kernel entre versões, e compilar o ksud (o userspace daemon do KernelSU) pra ARM64.",
        en: "I studied how KernelSU is packaged as a kernel module (.ko) with a patch that modifies kernel initialization to inject su support. The original repo uses a Makefile and .patch files that apply the necessary modifications. For the A57, I needed to adapt the patch for kernel 6.12, handle API changes between kernel versions, and compile ksud (KernelSU's userspace daemon) for ARM64.",
      },
      build: {
        pt: "O manifesto targets-v3.json usa um schema versionado com perfil por device: modelo, versões de kernel suportadas, URLs de download (pinadas por commit SHA), e tamanho esperado de cada artefato. O app usa isso pra verificar integridade antes de instalar. Ferramentas em Python (extract_target_symvers.py, audit_module_against_target.py) auxiliam na extração de símbolos e auditoria dos módulos compilados. O patch KernelSU customizado desabilita RKP e DEFEX via KDP, permitindo que o su funcione. Os payloads são organizados por deviceId com subpastas pro exploit e kernelsu.",
        en: "The targets-v3.json manifest uses a versioned schema with per-device profiles: model, supported kernel versions, download URLs (pinned by commit SHA), and expected artifact sizes. The app uses this to verify integrity before installing. Python tools (extract_target_symvers.py, audit_module_against_target.py) assist in symbol extraction and compiled module auditing. The custom KernelSU patch disables RKP and DEFEX via KDP, allowing su to function. Payloads are organized by deviceId with subfolders for the exploit and kernelsu.",
      },
      result: {
        pt: "11 dispositivos suportados com payloads verificados: Galaxy S25 série (S931/S936/S937/S938), Z Fold 7 (F966), S24 Ultra (S928), S24+ (S926), S24 (S921), A56 5G (A566), A36 5G (A366), S23 Ultra (S918) e A57 5G (A576) — este último portado do zero. Cada payload tem tamanho verificado e URL pinada por commit.",
        en: "11 supported devices with verified payloads: Galaxy S25 series (S931/S936/S937/S938), Z Fold 7 (F966), S24 Ultra (S928), S24+ (S926), S24 (S921), A56 5G (A566), A36 5G (A366), S23 Ultra (S918) and A57 5G (A576) — the last one ported from scratch. Each payload has verified size and commit-pinned URL.",
      },
      lessons: {
        pt: "Um sistema de integridade não precisa ser complexo — pinar por commit SHA + verificar tamanho de arquivo já elimina a maioria dos vetores de ataque num cenário de distribuição via GitHub raw. E a diferença entre kernel 6.6 e 6.12 é suficiente pra quebrar compilação; versionar o patch separadamente por faixa de kernel é essencial.",
        en: "An integrity system doesn't need to be complex — pinning by commit SHA + verifying file size already eliminates most attack vectors in a GitHub raw distribution scenario. And the difference between kernel 6.6 and 6.12 is enough to break compilation; versioning the patch separately per kernel range is essential.",
      },
    },
  },
  {
    slug: "jalep",
    title: "JALEP",
    summary: {
      pt: "Assistência técnica fictícia criada para um projeto escolar, transformada em exercício real de branding, modelagem 3D e produção de vídeo.",
      en: "A fictional tech-assistance brand created for a school project, turned into a real exercise in branding, 3D modeling and video production.",
    },
    status: "delivered",
    role: {
      pt: "Design, identidade visual, modelagem 3D e edição de vídeo",
      en: "Design, visual identity, 3D modeling and video editing",
    },
    period: { pt: "2026", en: "2026" },
    technologies: ["Blender", "Eevee", "OBS Studio", "Kdenlive", "HTML/CSS"],
    story: {
      context: {
        pt: "Um trabalho escolar em equipe pedia a criação de uma marca fictícia de assistência técnica, com identidade visual e apresentação para a turma.",
        en: "A group school assignment asked for a fictional tech-assistance brand, with visual identity and a presentation for the class.",
      },
      problem: {
        pt: "A equipe tinha pouco tempo e uma bancada física de baixo valor agregado — construir um protótipo físico consumiria tempo sem entregar impacto proporcional.",
        en: "The team had limited time and a physical workbench prop with low added value — building a physical prototype would burn time without a proportional payoff.",
      },
      exploration: {
        pt: "A estratégia mudou de rota: em vez de investir em fabricação física, o foco passou a ser um vídeo de apresentação bem produzido, com uma porta 3D modelada no Blender como peça central.",
        en: "The strategy pivoted: instead of investing in physical fabrication, the focus became a well-produced presentation video, with a 3D door modeled in Blender as the centerpiece.",
      },
      build: {
        pt: "O trabalho incluiu modelagem em Blender (com renderização em Eevee por causa do prazo), iluminação em três pontos para um visual de loja moderna, um logo com gradiente azul→ciano, e um pipeline de captura e edição de vídeo (OBS Studio via PipeWire + Kdenlive) para montar um vídeo de 60 a 90 segundos.",
        en: "The work included Blender modeling (rendered in Eevee due to the deadline), three-point lighting for a modern storefront look, a blue-to-cyan gradient logo, and a capture-and-edit video pipeline (OBS Studio via PipeWire + Kdenlive) to put together a 60–90 second video.",
      },
      result: {
        pt: "A apresentação foi entregue à turma, competindo com outros projetos de grupo. A entrega priorizou o que realmente comunicava a ideia, em vez de tentar abraçar tudo.",
        en: "The presentation was delivered to the class, competing against other group projects. The delivery prioritized what actually communicated the idea, instead of trying to do everything.",
      },
      lessons: {
        pt: "Escopo é uma decisão de design tão importante quanto qualquer escolha estética. Saber cortar (bancada física) para proteger o que importa (o vídeo) foi a decisão mais valiosa do projeto.",
        en: "Scope is a design decision as important as any aesthetic choice. Knowing what to cut (the physical prop) to protect what mattered (the video) was the most valuable decision in the project.",
      },
    },
  },
  {
    slug: "mobile-memory-safety-research",
    title: "Mobile Kernel Memory-Safety Research",
    summary: {
      pt: "Análise de código de sistema em busca de falhas de segurança de memória em dispositivos móveis, com reporte responsável através de um programa oficial de bug bounty.",
      en: "Analysis of system code looking for memory-safety issues on mobile devices, with responsible disclosure through an official bug bounty program.",
    },
    status: "research",
    role: {
      pt: "Pesquisa independente e relatório técnico",
      en: "Independent research and technical reporting",
    },
    period: { pt: "2026", en: "2026" },
    technologies: ["C", "Análise estática", "Android kernel"],
    securityNote: true,
    story: {
      context: {
        pt: "Parte da pesquisa em kernel envolveu revisar código de gerenciamento de memória em componentes específicos de fabricantes de dispositivos Android.",
        en: "Part of the kernel research involved reviewing memory-management code in device-manufacturer-specific components on Android.",
      },
      problem: {
        pt: "Código de baixo nível que manipula memória sem a devida sincronização é uma fonte clássica de bugs de segurança — o desafio era encontrar um caso real, não teórico.",
        en: "Low-level code that manipulates memory without proper synchronization is a classic source of security bugs — the challenge was finding a real, not theoretical, case.",
      },
      exploration: {
        pt: "A investigação envolveu ler o caminho de código com atenção a condições de corrida entre operações concorrentes, comparando com os padrões de bloqueio usados em chamadas semelhantes no mesmo módulo.",
        en: "The investigation involved carefully reading the code path for race conditions between concurrent operations, comparing it against the locking patterns used in similar calls in the same module.",
      },
      build: {
        pt: "A falha identificada foi documentada em um relatório técnico e enviada através do canal oficial do programa de segurança do fabricante, seguindo as regras de divulgação responsável.",
        en: "The identified issue was documented in a technical report and submitted through the manufacturer's official security program channel, following responsible disclosure rules.",
      },
      result: {
        pt: "O relatório está em avaliação pela equipe de segurança do fabricante. Por estar sob acordo de divulgação responsável até a publicação de uma correção, detalhes técnicos específicos (código, arquivos, provas de conceito) não são publicados aqui.",
        en: "The report is under review by the manufacturer's security team. Because it is under a responsible-disclosure agreement until a fix ships, specific technical details (code, files, proofs of concept) are not published here.",
      },
      lessons: {
        pt: "Escrever um relatório de segurança claro o suficiente para ser reproduzido por outra pessoa é uma habilidade separada de encontrar o bug — e talvez tão importante quanto.",
        en: "Writing a security report clear enough for someone else to reproduce is a separate skill from finding the bug — and arguably just as important.",
      },
    },
  },
];

export function getProjects(_locale: Locale) {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
