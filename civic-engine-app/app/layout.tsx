import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth/auth-context";
import { DemoAuthProvider } from "@/lib/auth/demo-auth-context";
import { ClassProvider } from "@/lib/auth/class-context";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Most of Us - Policies Americans Agree On",
  description: "Discover the policies that most Americans agree on, based on bipartisan polling data. A platform for consensus-driven civic engagement.",
  keywords: ["politics", "consensus", "bipartisan", "policy", "civic engagement"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <DemoAuthProvider>
            <ClassProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </ClassProvider>
          </DemoAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
