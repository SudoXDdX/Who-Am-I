export interface StackCategory {
  id: string;
  label: { pt: string; en: string };
  items: string[];
}

export const stackCategories: StackCategory[] = [
  {
    id: "systems",
    label: { pt: "Sistemas", en: "Systems" },
    items: ["Linux", "Android", "Kernel Linux/Android", "Termux", "Bedrock Linux"],
  },
  {
    id: "programming",
    label: { pt: "Programação", en: "Programming" },
    items: ["C", "Python", "Bash", "JavaScript", "TypeScript", "Lua", "Make"],
  },
  {
    id: "android",
    label: { pt: "Android", en: "Android" },
    items: [
      "KernelSU",
      "Magisk",
      "ADB",
      "Fastboot",
      "FastbootD",
      "Zygisk",
      "LSPosed",
      "Shizuku",
      "ROMs customizadas",
    ],
  },
  {
    id: "tools",
    label: { pt: "Ferramentas", en: "Tools" },
    items: [
      "Git",
      "GitHub",
      "Clang",
      "Android NDK",
      "nm",
      "readelf",
      "objdump",
      "pahole",
      "bpftool",
      "Blender",
      "Kdenlive",
      "OBS Studio",
    ],
  },
];
