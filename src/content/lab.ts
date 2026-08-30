export interface LabEntry {
  id: string;
  title: { pt: string; en: string };
  tag: { pt: string; en: string };
  objective: { pt: string; en: string };
  whatHappened: { pt: string; en: string };
  result: { pt: string; en: string };
  lesson: { pt: string; en: string };
}

export const labEntries: LabEntry[] = [
  {
    id: "kasan-bug-hunting",
    title: { pt: "Bug hunting com KASAN/KFENCE", en: "Bug hunting with KASAN/KFENCE" },
    tag: { pt: "Kernel · Android", en: "Kernel · Android" },
    objective: {
      pt: "Configurar um kernel Android com ferramentas de depuração de memória (KASAN, KFENCE, KCSAN, KMEMLEAK) para caçar bugs reais em drivers de um SoC MediaTek durante o uso diário do aparelho.",
      en: "Configure an Android kernel with memory-debugging tools (KASAN, KFENCE, KCSAN, KMEMLEAK) to hunt for real bugs in a MediaTek SoC's drivers during everyday device use.",
    },
    whatHappened: {
      pt: "Antes disso, uma tentativa de portar o kernel entre versões incompatíveis do Android esbarrou em componentes de fabricante fechados (drivers de Wi-Fi/Bluetooth, modem, câmera) que não carregam entre ABIs diferentes — a rota de porting foi abandonada.",
      en: "Before this, an attempt to port the kernel across incompatible Android versions ran into closed vendor components (Wi-Fi/Bluetooth drivers, modem, camera) that don't load across different ABIs — the porting route was abandoned.",
    },
    result: {
      pt: "A estratégia foi ajustada: em vez de portar, habilitar instrumentação de depuração no defconfig correto e usar o dispositivo normalmente por um período, monitorando o log do kernel em busca de avisos de KASAN/KFENCE.",
      en: "The strategy was adjusted: instead of porting, enable debug instrumentation in the correct defconfig and use the device normally for a period, watching the kernel log for KASAN/KFENCE warnings.",
    },
    lesson: {
      pt: "Nem toda ideia técnica ambiciosa é a rota certa. Reconhecer um beco sem saída cedo (o porting) abriu espaço para uma estratégia mais realista (instrumentação + uso real).",
      en: "Not every ambitious technical idea is the right route. Recognizing a dead end early (the port) made room for a more realistic strategy (instrumentation + real-world use).",
    },
  },
  {
    id: "hyprland-migration",
    title: { pt: "Migrar para Hyprland sem quebrar o KDE", en: "Migrating to Hyprland without breaking KDE" },
    tag: { pt: "Linux · Desktop", en: "Linux · Desktop" },
    objective: {
      pt: "Substituir uma configuração customizada do Hyprland pela configuração oficial do CachyOS, sem perder o ambiente KDE Plasma já instalado.",
      en: "Replace a customized Hyprland setup with CachyOS's official configuration, without losing the already-installed KDE Plasma environment.",
    },
    whatHappened: {
      pt: "O gerenciador de pacotes acusou conflito: o meta-pacote de configurações do Hyprland e o do KDE não podiam coexistir via instalação direta, já que ambos disputam os mesmos arquivos.",
      en: "The package manager flagged a conflict: the Hyprland settings meta-package and the KDE one couldn't coexist through a direct install, since both compete for the same files.",
    },
    result: {
      pt: "A solução foi clonar o repositório de configuração oficial manualmente e copiar os arquivos para o diretório de config do usuário, preservando o KDE intacto — depois de fazer backup dos arquivos de configuração do KDE por segurança.",
      en: "The fix was to clone the official config repository manually and copy the files into the user's config directory, keeping KDE intact — after backing up KDE's config files as a safety net.",
    },
    lesson: {
      pt: "Quando um gerenciador de pacotes não permite duas coisas coexistirem, geralmente existe um caminho manual mais granular — só exige mais cuidado e um backup antes de agir.",
      en: "When a package manager won't let two things coexist, there's usually a more granular manual path — it just takes more care and a backup before acting.",
    },
  },
  {
    id: "blender-lighting",
    title: { pt: "Iluminação de loja em Eevee sob prazo curto", en: "Storefront lighting in Eevee under a tight deadline" },
    tag: { pt: "3D · Design", en: "3D · Design" },
    objective: {
      pt: "Conseguir um visual de loja moderna (estilo Apple Store) para o modelo 3D do projeto JALEP, sem o tempo de renderização que o Cycles exigiria.",
      en: "Get a modern-storefront look (Apple-Store-like) for the JALEP project's 3D model, without the render time Cycles would require.",
    },
    whatHappened: {
      pt: "Testes com uma configuração de três pontos de luz (key, fill, back) combinados com um HDRI de ambiente de loja e o motor de renderização em tempo real Eevee.",
      en: "Tests with a three-point lighting setup (key, fill, back) combined with a storefront HDRI environment and the real-time Eevee render engine.",
    },
    result: {
      pt: "Um visual convincente o suficiente para o vídeo final, entregue dentro do prazo apertado da apresentação escolar.",
      en: "A look convincing enough for the final video, delivered within the school presentation's tight deadline.",
    },
    lesson: {
      pt: "A escolha de ferramenta certa para o prazo (Eevee em vez de Cycles) muitas vezes importa mais do que a escolha 'tecnicamente superior'.",
      en: "The right tool for the deadline (Eevee instead of Cycles) often matters more than the 'technically superior' choice.",
    },
  },
];
