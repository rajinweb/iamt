'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, Settings, Users, BarChart } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col h-full bg-[#15274E] w-full sticky top-0 z-[99]  transition-all duration-150 ${isCollapsed ? 'w-[65px]' : 'w-[165px]'}`}>
      <div className='bg-[#ad2e2d] flex items-center justify-between p-2.5 border-b border-[#060E1F] h-[65px] relative'>
        <div className={`text-white font-bold text-2xl`}>
          Iam
        </div>
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-2.5 top-[46px] p-2 ${
            isCollapsed ? '-right-5' : ''
          }`}
        >
          {isCollapsed ? (
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" transform="scale(-1 1)">
              <path d="M.45 10 13.573.625v18.75z" fill="#15274E" />
              <path d="M.45 10 13.573.625V10z" fill="#AD2D2D" />
            </svg>
          ) : (
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M.45 10 13.573.625v18.75z" fill="#fff" />
              <path d="M.45 10 13.573.625V10z" fill="#fff" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className={`flex flex-col gap-2 px-2 py-6  ${isCollapsed ? 'pl-0 items-center' : ''}`}>
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-white h-10 ${
                pathname === item.href ? 'bg-[#2684FF] hover:bg-[#2684FF]/90' : 'hover:bg-white/10'
              } ${isCollapsed ? 'rounded-r-full justify-center ' : ''}`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
