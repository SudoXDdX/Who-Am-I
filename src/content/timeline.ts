import type { Locale } from "@/lib/i18n";

export interface TimelineEntry {
  id: string;
  period: { pt: string; en: string };
  title: { pt: string; en: string };
  body: { pt: string; en: string };
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: "curiosity",
    period: { pt: "O início", en: "The start" },
    title: { pt: "Curiosidade pelo que está por baixo", en: "Curiosity about what's underneath" },
    body: {
      pt: "Tudo começou com perguntas simples sobre o próprio celular: por que ele funciona assim, o que dá pra mudar, o que acontece se eu mexer aqui. Nada de curso ou plano — só vontade de abrir a caixa.",
      en: "It started with simple questions about my own phone: why does it work this way, what can be changed, what happens if I touch this. No course or plan — just wanting to open the box.",
    },
  },
  {
    id: "android-customization",
    period: { pt: "Primeira fase", en: "First phase" },
    title: { pt: "Customização de Android", en: "Android customization" },
    body: {
      pt: "Launchers, ícones, temas, ADB — o primeiro contato real com a ideia de que um sistema Android pode ser moldado, não só usado. Foi aqui que 'usuário' começou a virar 'quem entende como funciona'.",
      en: "Launchers, icon packs, themes, ADB — the first real contact with the idea that an Android system can be shaped, not just used. This is where 'user' started turning into 'someone who understands how it works'.",
    },
  },
  {
    id: "root-roms",
    period: { pt: "Aprofundando", en: "Going deeper" },
    title: { pt: "Root, bootloaders e ROMs customizadas", en: "Root, bootloaders and custom ROMs" },
    body: {
      pt: "Desbloqueio de bootloader, flashing, ROMs como Evolution-X, e ferramentas como Magisk e depois KernelSU. Errar aqui custava caro (um dispositivo mal flasheado é um dispositivo brickado), e foi exatamente esse risco que ensinou a ler documentação com atenção antes de agir.",
      en: "Bootloader unlocking, flashing, ROMs like Evolution-X, and tools like Magisk and later KernelSU. Mistakes here were costly (a badly flashed device is a bricked device), and that exact risk is what taught careful reading of documentation before acting.",
    },
  },
  {
    id: "linux",
    period: { pt: "Expansão", en: "Expansion" },
    title: { pt: "Linux no dia a dia", en: "Linux as a daily driver" },
    body: {
      pt: "A curiosidade por sistemas migrou do bolso para o desktop. Distribuições, gerenciadores de janela, e eventualmente uma configuração diária em CachyOS com Hyprland — incluindo a experiência de migrar de um ambiente pré-configurado (KDE Plasma) para uma configuração feita à mão, resolvendo conflitos manualmente no processo.",
      en: "The curiosity about systems moved from the pocket to the desktop. Distributions, window managers, and eventually a daily setup on CachyOS with Hyprland — including the experience of migrating away from a pre-configured environment (KDE Plasma) to a hand-built config, resolving conflicts manually along the way.",
    },
  },
  {
    id: "systems",
    period: { pt: "Sistemas", en: "Systems" },
    title: { pt: "Entendendo sistemas de verdade", en: "Understanding systems for real" },
    body: {
      pt: "Bedrock Linux, ambientes híbridos, ferramentas de linha de comando, scripting em Bash — a fase em que 'usar Linux' virou 'entender como as peças do sistema operacional se encaixam'.",
      en: "Bedrock Linux, hybrid environments, command-line tooling, Bash scripting — the phase where 'using Linux' turned into 'understanding how the operating system's pieces fit together'.",
    },
  },
  {
    id: "programming",
    period: { pt: "Programação", en: "Programming" },
    title: { pt: "De usuário a construtor", en: "From user to builder" },
    body: {
      pt: "Python para automação e análise, C para entender sistemas de baixo nível, além de JavaScript/TypeScript para projetos web. Programar deixou de ser uma habilidade isolada e virou a ferramenta para testar hipóteses sobre como os sistemas funcionam.",
      en: "Python for automation and analysis, C to understand low-level systems, plus JavaScript/TypeScript for web projects. Programming stopped being an isolated skill and became the tool for testing hypotheses about how systems work.",
    },
  },
  {
    id: "kernel",
    period: { pt: "Kernel", en: "Kernel" },
    title: { pt: "Pesquisa em kernel Linux/Android", en: "Linux/Android kernel research" },
    body: {
      pt: "Compilação de kernel, defconfigs, ferramentas de depuração como KASAN e KFENCE, e a lição prática mais importante até aqui: nem toda ideia ambiciosa (como portar um kernel entre versões incompatíveis) é viável — e reconhecer isso a tempo também é parte do trabalho técnico.",
      en: "Kernel compilation, defconfigs, debugging tools like KASAN and KFENCE, and the most important practical lesson so far: not every ambitious idea (like porting a kernel across incompatible versions) is viable — and recognizing that in time is also part of the technical work.",
    },
  },
  {
    id: "security-research",
    period: { pt: "Segurança", en: "Security" },
    title: { pt: "Pesquisa de segurança em dispositivos móveis", en: "Mobile security research" },
    body: {
      pt: "Análise de código de sistema em busca de falhas de memória, reporte responsável através de programas oficiais de bug bounty, e o processo — bem menos glamouroso do que parece de fora — de escrever um relatório técnico claro o suficiente para um analista de segurança confirmar o problema.",
      en: "Analyzing system code looking for memory-safety issues, responsible disclosure through official bug bounty programs, and the process — far less glamorous than it looks from the outside — of writing a technical report clear enough for a security analyst to confirm the issue.",
    },
  },
  {
    id: "personal-projects",
    period: { pt: "Agora", en: "Now" },
    title: { pt: "Projetos pessoais e escolares", en: "Personal and school projects" },
    body: {
      pt: "O trabalho técnico passou a se misturar com design, vídeo e apresentação — como no JALEP, um projeto escolar que virou exercício real de branding, modelagem 3D e produção de vídeo. A engenharia e a criação deixaram de ser mundos separados.",
      en: "The technical work started blending with design, video and presentation — like JALEP, a school project that became a real exercise in branding, 3D modeling and video production. Engineering and creation stopped being separate worlds.",
    },
  },
];

export function getTimeline(_locale: Locale) {
  return timelineEntries;
}
