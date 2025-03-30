import './globals.css';
import type { Metadata } from 'next';

// Don't use font imports or complex components for now
export const metadata: Metadata = {
  title: "Professor Abolaji - Biochemist & Researcher",
  description: "Professional portfolio of Professor Abolaji, an accomplished biochemist and researcher specializing in neurosciences and toxicology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
} 