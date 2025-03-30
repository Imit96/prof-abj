import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Professor Abolaji</h3>
            <p className="text-gray-300">
              Biochemist & Researcher<br />
              Department of Biochemistry<br />
              University of Ibadan
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-gray-300">Email: prof.abolaji@example.com</p>
            <p className="text-gray-300">Phone: +234 123 456 7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Professor Abolaji. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 