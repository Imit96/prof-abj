import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Dr. Amos Abolaji | Research & Portfolio",
  description: "Academic and professional portfolio of Dr. Amos Abolaji focusing on Drosophila research, academic standing, and capacity building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-ink bg-background`}>
        <SmoothScroll>
          <ConvexClientProvider>
            <Navbar />
            {children}
            <Footer />
          </ConvexClientProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
