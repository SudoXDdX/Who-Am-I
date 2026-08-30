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
  story?: ProjectStory;
  securityNote?: boolean;
  pending?: boolean;
}

export const projects: Project[] = [
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
  {
    slug: "ghostsu",
    title: "ghostSu",
    summary: {
      pt: "Exploração de ferramentas para Android com foco em root e customização de sistema.",
      en: "Exploration of Android tooling focused on root access and system customization.",
    },
    status: "idea",
    role: { pt: "Pesquisa e experimentação", en: "Research and experimentation" },
    period: { pt: "Em andamento", en: "Ongoing" },
    technologies: ["Android", "KernelSU"],
    pending: true,
  },
  {
    slug: "ghostlock",
    title: "GhostLock",
    summary: {
      pt: "Pesquisa e port em estágio inicial, ligado ao trabalho de customização e segurança em Android.",
      en: "Early-stage research and porting work, related to Android customization and security work.",
    },
    status: "idea",
    role: { pt: "Pesquisa e port", en: "Research and porting" },
    period: { pt: "Em andamento", en: "Ongoing" },
    technologies: ["Android"],
    pending: true,
  },
  {
    slug: "m3q",
    title: "m3q",
    summary: {
      pt: "Pesquisa e port em estágio inicial, ainda sem escopo público definido.",
      en: "Early-stage research and porting work, without a defined public scope yet.",
    },
    status: "idea",
    role: { pt: "Pesquisa e port", en: "Research and porting" },
    period: { pt: "Em andamento", en: "Ongoing" },
    technologies: [],
    pending: true,
  },
  {
    slug: "convertit",
    title: "ConvertIt",
    summary: {
      pt: "Ferramenta em estágio inicial de desenvolvimento — detalhes de escopo e tecnologia ainda a definir.",
      en: "A tool in early development — scope and technology details still to be defined.",
    },
    status: "idea",
    role: { pt: "Desenvolvimento", en: "Development" },
    period: { pt: "Em andamento", en: "Ongoing" },
    technologies: [],
    pending: true,
  },
  {
    slug: "jalepos",
    title: "JalepOS",
    summary: {
      pt: "Extensão conceitual da marca JALEP explorando ideias de sistema/branding — ainda uma exploração, não um sistema operacional completo.",
      en: "A conceptual extension of the JALEP brand exploring system/branding ideas — still an exploration, not a complete operating system.",
    },
    status: "idea",
    role: { pt: "Conceito e branding", en: "Concept and branding" },
    period: { pt: "Em andamento", en: "Ongoing" },
    technologies: [],
    pending: true,
  },
];

export function getProjects(_locale: Locale) {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
