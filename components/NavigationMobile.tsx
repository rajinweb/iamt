'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Users, BarChart } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function NavigationMobile() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4 bg-[#060E1F] h-full">
      <div className="flex items-center gap-2 p-2 mb-4 text-white">
        <span className="font-semibold text-lg">Iam</span>
      </div>
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-white',
              ${pathname === item.href
                ? 'bg-[#2684FF] hover:bg-[#2684FF]/90'
                : 'hover:bg-white/10'}
          `}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
