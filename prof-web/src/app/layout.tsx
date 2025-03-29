import './globals.css'
import type { Metadata } from 'next'
import Header from "@/components/header";
import Footer from "@/components/footer";
import BreadcrumbNav from "@/components/breadcrumb-nav";
import { Providers } from "@/components/providers";

// Import Inter font locally instead of using the Google Fonts API
import localFont from 'next/font/local';

// Use local font files (these should exist in the /public/fonts directory)
const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Professor Abolaji - Biochemist & Researcher",
  description: "Professional portfolio of Professor Abolaji, an accomplished biochemist and researcher specializing in neurosciences and toxicology",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} min-h-screen bg-white text-gray-900`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <BreadcrumbNav />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
