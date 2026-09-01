import type { Locale } from "@/lib/i18n";

export const dictionary = {
  pt: {
    meta: {
      siteName: "whoami // SuXD",
      titleSuffix: "SuXD",
      description:
        "Um arquivo técnico pessoal: quem é SuXD, o que ele construiu e como chegou até aqui.",
    },
    nav: {
      home: "início",
      about: "sobre",
      timeline: "trajetória",
      projects: "projetos",
      stack: "stack",
      lab: "lab",
      rices: "rices",
      contact: "contato",
      langLabel: "EN",
      langSwitchAria: "Mudar para inglês",
      skipToContent: "Pular para o conteúdo",
    },
    footer: {
      built: "Construído com Next.js, TypeScript e Tailwind CSS.",
      source: "código-fonte",
      lastUpdated: "última atualização",
    },
    home: {
      kicker: "whoami?",
      title: "SuXD",
      lede: "Uma trajetória técnica moldada por curiosidade, experimentação e a necessidade de entender o que está acontecendo por baixo do capô.",
      cta: "Explorar",
      sections: {
        aboutTitle: "Quem é SuXD",
        aboutBody:
          "Autodidata, curioso por sistemas e movido pela vontade de entender como as coisas realmente funcionam — do Android ao kernel Linux.",
        aboutCta: "Ler a história completa",
        timelineTitle: "Como cheguei até aqui",
        timelineBody:
          "De customização de Android a pesquisa de segurança em kernel: uma linha do tempo de curiosidade em ação.",
        timelineCta: "Ver a trajetória",
        projectsTitle: "O que já construí",
        projectsBody:
          "Projetos escolares, ports, pesquisa e experimentos — cada um com seu próprio contexto e status real.",
        projectsCta: "Ver projetos",
        labTitle: "O laboratório",
        labBody:
          "Um caderno de experimentos: o que eu tentei, o que aconteceu e o que aprendi.",
        labCta: "Entrar no lab",
      },
      prompt: [
        "$ whoami",
        "SuXD",
        "$ cat interesses.txt",
        "sistemas, Linux, Android, segurança, design, construção",
      ],
    },
    about: {
      kicker: "sobre",
      title: "Quem é SuXD",
      intro:
        "SuXD é a identidade pública de um estudante e pesquisador técnico autodidata. Não é um personagem — é como o trabalho é assinado.",
      body: [
        "Tudo começou com curiosidade: por que o celular faz isso? O que tem por trás dessa tela? Essa curiosidade virou o hábito de abrir, desmontar, quebrar e remontar — primeiro em software Android, depois em sistemas Linux inteiros, e hoje também em kernel e segurança.",
        "O caminho não foi formal. Não veio de um curso estruturado, veio de ler documentação, ler código-fonte, errar bastante e perguntar 'por que isso não funcionou' até a resposta fazer sentido. Esse processo — tentativa, erro, entendimento — é o fio condutor de tudo que aparece neste site.",
        "Hoje o trabalho técnico se divide em algumas frentes: personalização e pesquisa em Android (bootloaders, ROMs, kernels), experimentos com Linux no dia a dia (CachyOS, Hyprland, Bedrock Linux), pesquisa de segurança em sistemas móveis através de programas oficiais de bug bounty, e projetos de design e vídeo que nada têm a ver com terminal — como o projeto escolar JALEP.",
        "Este site não existe para inflar um currículo. Existe para responder, com honestidade, a uma pergunta simples: quem é SuXD, e o que ele já construiu.",
      ],
      valuesTitle: "O que guia o trabalho",
      values: [
        {
          title: "Curiosidade antes de credencial",
          body: "O interesse em entender um sistema vem antes de qualquer certificado ou título.",
        },
        {
          title: "Aprender fazendo",
          body: "A maior parte do conhecimento técnico aqui veio de projetos reais, não de teoria isolada.",
        },
        {
          title: "Honestidade sobre o status",
          body: "Um protótipo é chamado de protótipo. Uma pesquisa em andamento não vira 'produto pronto'.",
        },
        {
          title: "Engenharia e design juntos",
          body: "Código e estética não são áreas separadas — um projeto bom cuida dos dois.",
        },
      ],
    },
    timeline: {
      kicker: "trajetória",
      title: "Como cheguei até aqui",
      intro:
        "Uma linha do tempo de evolução, não apenas uma lista de datas. Quando uma data não é confiável, ela é descrita de forma aproximada.",
    },
    projects: {
      kicker: "projetos",
      title: "O que já construí",
      intro:
        "Cada projeto aqui tem seu status real: ideia, protótipo, pesquisa em andamento ou entregue. Nada é inflado para parecer mais do que é.",
      statusLabels: {
        idea: "Ideia / exploração",
        prototype: "Protótipo",
        research: "Pesquisa em andamento",
        active: "Em desenvolvimento ativo",
        delivered: "Entregue",
        parked: "Pausado",
      },
      readMore: "Ver detalhes",
      backToProjects: "Voltar para projetos",
      contextLabel: "Contexto",
      problemLabel: "Problema",
      explorationLabel: "Exploração",
      buildLabel: "Construção",
      resultLabel: "Resultado",
      roleLabel: "Papel",
      periodLabel: "Período",
      techLabel: "Tecnologias",
      statusLabel: "Status",
      lessonsLabel: "O que aprendi",
    },
    stack: {
      kicker: "stack",
      title: "Ferramentas e sistemas",
      intro:
        "Organizado por domínio. Só está listado aqui o que realmente foi usado em projetos reais — nada de lista de tecnologias da moda.",
    },
    lab: {
      kicker: "lab",
      title: "O laboratório",
      intro:
        "Um caderno de experimentos técnicos: nem todos viram projeto, e está tudo bem. O objetivo aqui é registrar tentativa, resultado e aprendizado.",
      objectiveLabel: "Objetivo",
      whatHappenedLabel: "O que aconteceu",
      resultLabel: "Resultado",
      lessonLabel: "Aprendizado",
    },
    security: {
      note: "Pesquisa de segurança é apresentada em nível conceitual — sem payloads, offsets ou instruções de exploração. O objetivo é mostrar o que foi investigado e aprendido, não ensinar a reproduzir.",
    },
    notFound: {
      title: "Página não encontrada",
      body: "Esse caminho não existe neste sistema de arquivos.",
      cta: "Voltar para o início",
    },
    rices: {
      kicker: "rices",
      title: "Rices & Configs",
      intro: "Screenshots e configurações do meu setup. Em breve.",
      comingSoon: "Em breve — enviarei fotos do meu rice e vou adicionar aqui.",
    },
    contact: {
      kicker: "contato",
      title: "Entre em contato",
      intro: "GitHub é o melhor lugar para conversar sobre projetos, colaborações ou reportar algo. Para contato direto, use o email.",
      githubLabel: "GitHub",
      githubDesc: "Código-fonte, issues e pull requests.",
      emailLabel: "Email",
      emailDesc: "Para contato direto, colaborações ou qualquer conversa.",
    },
  },
  en: {
    meta: {
      siteName: "whoami // SuXD",
      titleSuffix: "SuXD",
      description:
        "A personal technical archive: who SuXD is, what he has built, and how he got here.",
    },
    nav: {
      home: "home",
      about: "about",
      timeline: "timeline",
      projects: "projects",
      stack: "stack",
      lab: "lab",
      rices: "rices",
      contact: "contact",
      langLabel: "PT",
      langSwitchAria: "Switch to Portuguese",
      skipToContent: "Skip to content",
    },
    footer: {
      built: "Built with Next.js, TypeScript and Tailwind CSS.",
      source: "source code",
      lastUpdated: "last updated",
    },
    home: {
      kicker: "whoami?",
      title: "SuXD",
      lede: "A technical journey shaped by curiosity, experimentation and the need to understand what is happening underneath.",
      cta: "Explore",
      sections: {
        aboutTitle: "Who is SuXD",
        aboutBody:
          "Self-taught, curious about systems, driven to understand how things actually work — from Android to the Linux kernel.",
        aboutCta: "Read the full story",
        timelineTitle: "How I got here",
        timelineBody:
          "From Android customization to kernel security research: a timeline of curiosity in motion.",
        timelineCta: "See the timeline",
        projectsTitle: "What I've built",
        projectsBody:
          "School projects, ports, research and experiments — each with its own context and real status.",
        projectsCta: "See projects",
        labTitle: "The lab",
        labBody:
          "A notebook of experiments: what I tried, what happened, and what I learned.",
        labCta: "Enter the lab",
      },
      prompt: [
        "$ whoami",
        "SuXD",
        "$ cat interests.txt",
        "systems, Linux, Android, security, design, building",
      ],
    },
    about: {
      kicker: "about",
      title: "Who is SuXD",
      intro:
        "SuXD is the public identity of a self-taught student and technical researcher. It's not a character — it's how the work is signed.",
      body: [
        "It started with curiosity: why does the phone do that? What's behind this screen? That curiosity became a habit of opening things up, taking them apart, breaking them, and putting them back together — first in Android software, then in full Linux systems, and now in kernel work and security as well.",
        "The path wasn't formal. It didn't come from a structured course — it came from reading documentation, reading source code, failing a lot, and asking 'why didn't that work' until the answer made sense. That process — trial, error, understanding — is the thread that runs through everything on this site.",
        "Today the technical work splits into a few threads: Android customization and research (bootloaders, ROMs, kernels), everyday Linux experimentation (CachyOS, Hyprland, Bedrock Linux), mobile security research through official bug bounty programs, and design and video projects that have nothing to do with a terminal — like the school project JALEP.",
        "This site doesn't exist to inflate a resume. It exists to honestly answer a simple question: who is SuXD, and what has he actually built.",
      ],
      valuesTitle: "What guides the work",
      values: [
        {
          title: "Curiosity before credentials",
          body: "The interest in understanding a system comes before any certificate or title.",
        },
        {
          title: "Learning by building",
          body: "Most of the technical knowledge here came from real projects, not isolated theory.",
        },
        {
          title: "Honesty about status",
          body: "A prototype is called a prototype. Research in progress doesn't become a 'finished product'.",
        },
        {
          title: "Engineering and design together",
          body: "Code and aesthetics aren't separate areas — a good project takes care of both.",
        },
      ],
    },
    timeline: {
      kicker: "timeline",
      title: "How I got here",
      intro:
        "A timeline of evolution, not just a list of dates. When a date isn't reliable, it's described loosely rather than invented.",
    },
    projects: {
      kicker: "projects",
      title: "What I've built",
      intro:
        "Every project here carries its real status: idea, prototype, ongoing research, or delivered. Nothing is inflated to look bigger than it is.",
      statusLabels: {
        idea: "Idea / exploration",
        prototype: "Prototype",
        research: "Ongoing research",
        active: "Actively in progress",
        delivered: "Delivered",
        parked: "Parked",
      },
      readMore: "View details",
      backToProjects: "Back to projects",
      contextLabel: "Context",
      problemLabel: "Problem",
      explorationLabel: "Exploration",
      buildLabel: "Build",
      resultLabel: "Result",
      roleLabel: "Role",
      periodLabel: "Period",
      techLabel: "Technologies",
      statusLabel: "Status",
      lessonsLabel: "What I learned",
    },
    stack: {
      kicker: "stack",
      title: "Tools and systems",
      intro:
        "Organized by domain. Only what has actually been used in real projects is listed here — no trending-technology filler.",
    },
    lab: {
      kicker: "lab",
      title: "The lab",
      intro:
        "A notebook of technical experiments: not everything becomes a project, and that's fine. The point here is to record the attempt, the result, and the lesson.",
      objectiveLabel: "Objective",
      whatHappenedLabel: "What happened",
      resultLabel: "Result",
      lessonLabel: "Lesson",
    },
    security: {
      note: "Security research is presented at a conceptual level — no payloads, offsets, or exploitation instructions. The goal is to show what was investigated and learned, not to teach reproduction.",
    },
    notFound: {
      title: "Page not found",
      body: "That path doesn't exist on this filesystem.",
      cta: "Back to home",
    },
    rices: {
      kicker: "rices",
      title: "Rices & Configs",
      intro: "Screenshots and configurations of my setup. Coming soon.",
      comingSoon: "Coming soon — I'll send screenshots of my rice and add them here.",
    },
    contact: {
      kicker: "contact",
      title: "Get in touch",
      intro: "GitHub is the best place to reach out about projects, collaborations, or to report anything. For direct contact, use email.",
      githubLabel: "GitHub",
      githubDesc: "Source code, issues and pull requests.",
      emailLabel: "Email",
      emailDesc: "For direct contact, collaborations, or just a chat.",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale];
}
