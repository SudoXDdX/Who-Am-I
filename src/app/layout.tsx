import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "whoami // SuXD",
  description:
    "A personal technical archive: who SuXD is, what he has built, and how he got here.",
};

/** Inline script to set theme attrs before first paint (prevents FOUC) */
const themeScript = `
(function(){
  try {
    var m = localStorage.getItem('theme-mode') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var c = localStorage.getItem('theme-color') || 'blue';
    document.documentElement.setAttribute('data-mode', m);
    document.documentElement.setAttribute('data-color', c);
    document.documentElement.style.colorScheme = m;
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
