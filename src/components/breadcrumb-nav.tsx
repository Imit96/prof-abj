import React from 'react';
import { usePathname } from 'next/navigation';

const BreadcrumbNav = () => {
  const pathname = usePathname();
  
  // Skip rendering on homepage
  if (pathname === '/') return null;
  
  // Create breadcrumb items from pathname
  const paths = pathname.split('/').filter(Boolean);
  const items = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    return {
      label: path.charAt(0).toUpperCase() + path.slice(1),
      href
    };
  });
  
  return (
    <nav className="bg-gray-100 py-2">
      <div className="container mx-auto px-6">
        <div className="flex items-center text-sm">
          <a href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </a>
          
          {items.map((item, index) => (
            <React.Fragment key={item.href}>
              <span className="mx-2 text-gray-400">/</span>
              <a 
                href={item.href} 
                className={index === items.length - 1 
                  ? "font-medium text-blue-600" 
                  : "text-gray-600 hover:text-blue-600"}
              >
                {item.label}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbNav; 