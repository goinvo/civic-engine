import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth/auth-context";
import { DemoAuthProvider } from "@/lib/auth/demo-auth-context";
import { ClassProvider } from "@/lib/auth/class-context";
import { ToastProvider } from "@/components/education/ui/Toast";

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
  title: "Most of Us - Valence Issues & Policies Americans Agree On",
  description: "Explore valence issues—policies with broad bipartisan support that most Americans agree on. Discover consensus-driven civic engagement based on real polling data.",
  keywords: ["valence issues", "bipartisan policies", "consensus politics", "policies Americans agree on", "civic engagement", "bipartisan support"],
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
              <ToastProvider>
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </ToastProvider>
            </ClassProvider>
          </DemoAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
