import { Home, Plus, MessageCircle, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/create', icon: Plus, label: 'Create', isCreate: true },
  { path: '/chats', icon: MessageCircle, label: 'Chats' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2 pb-safe">
        {navItems.map(({ path, icon: Icon, label, isCreate }) => {
          const isActive = location.pathname === path;

          if (isCreate) {
            return (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-0.5 -mt-4"
              >
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25">
                  <Plus className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-semibold text-primary">{label}</span>
              </motion.button>
            );
          }

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon
                className={cn('h-5 w-5 transition-all', isActive && 'scale-110')}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={cn('text-[10px]', isActive ? 'font-semibold' : 'font-medium')}>
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
