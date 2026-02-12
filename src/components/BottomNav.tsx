import { Home, PlusCircle, MessageCircle, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/create', icon: PlusCircle, label: 'Create' },
  { path: '/chats', icon: MessageCircle, label: 'Chats' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2 pb-safe">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const isCreate = path === '/create';

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground',
                isCreate && !isActive && 'text-primary'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-all',
                  isCreate && 'h-6 w-6',
                  isActive && 'scale-110'
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn('text-[10px]', isActive && 'font-semibold')}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
