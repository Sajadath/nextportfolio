import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sajadath.portfolio.vercel.app"),
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
    url: "https://sajadath.portfolio.vercel.app",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
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
      <body className={`${spaceGrotesk.className} antialiased`}>
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
