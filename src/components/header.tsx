import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Professor Abolaji
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-blue-600">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 