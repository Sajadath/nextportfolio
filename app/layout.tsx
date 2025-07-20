import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sajadathportfolio.vercel.app/"),
  title: "Sajad Atharyan Portfolio",
  authors: {
    name: "sajad atharyan",
  },
  description: `I am a Front-End Developer with a strong passion for creating
          interactive, user-friendly, and visually appealing web applications.
          My focus is on crafting seamless user experiences by combining modern
          design principles with cutting-edge technologies. I enjoy solving
          complex problems, learning new tools, and continuously improving my
          skills to deliver high-quality solutions that make a difference.`,
  openGraph: {
    title: "Sajad Atharyan Portfolio",
    description: `I am a Front-End Developer with a strong passion for creating
                    interactive, user-friendly, and visually appealing web applications.`,
    url: "https://sajadathportfolio.vercel.app/",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        alt: "Sajad Atharyan Portfolio",
      },
    ],
  },
  keywords: [
    "sajad atharyan",
    "sajadath",
    "sajad ath",
    "Front-End Developer",
    "portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${spaceGrotesk.className} relative antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
