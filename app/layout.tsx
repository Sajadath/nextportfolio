import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/theme-provider";
import CustomCursor from "@/components/ui/CustomCursor";
import ReduxProvider from "@/components/ui/ReduxProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Footer from "./(home)/components/Footer";
import HeaderProvider from "./(home)/components/HeaderProvider";
import NavigationMenu from "./(home)/components/NavigationMenu";
import TransitionEffect from "./(home)/components/TransitionEffect";
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
      <body
        className={`${spaceGrotesk.className} relative bg-white antialiased dark:bg-black`}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScroll>
              <ScrollProgress />
              <HeaderProvider />
              <main className="min-h-dvh overflow-x-clip">{children}</main>
              <Footer />
              <NavigationMenu />
              <TransitionEffect />
              <CustomCursor />
              <div
                aria-hidden
                className="noise pointer-events-none fixed inset-0 z-[95] opacity-[0.035] dark:opacity-[0.05]"
              />
            </SmoothScroll>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
