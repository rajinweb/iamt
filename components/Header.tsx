'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavigationMobile from './NavigationMobile';
import HeaderContent from './HeaderContent';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300  bg-[#F4F5FA]">
      <div className="flex h-[65px] px-6 items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-gray-200 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
            <div
              className="fixed left-0 top-0 h-full w-64 bg-white shadow-md p-4 transform transition-transform duration-300"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing menu
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-md hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </button>

              {/* Navigation */}
              <NavigationMobile />
            </div>
          </div>
        )}

        {/* Main Header Content */}
        <HeaderContent />
      </div>
    </header>
  );
}
