import { Home, ShoppingBag, Gift, BookMarked } from 'lucide-react';

export type Screen = 'login' | 'home' | 'surplus' | 'free' | 'detail' | 'add' | 'reservations' | 'profile';

type Tab = 'home' | 'surplus' | 'free' | 'reservations';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.FC<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'surplus', label: 'Surplus Food', icon: ShoppingBag },
  { id: 'free', label: 'Free Food', icon: Gift },
  { id: 'reservations', label: 'Reservations', icon: BookMarked },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card border-t border-border flex items-stretch z-50">
      {tabs.map(({ id, label, icon: Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors"
            style={{
              color: active ? 'var(--primary)' : 'var(--muted-foreground)',
            }}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            <span
              className="text-[10px] leading-tight"
              style={{ fontWeight: active ? 600 : 400 }}
            >
              {label}
            </span>
            {active && (
              <span
                className="absolute bottom-0 h-0.5 w-8 rounded-full"
                style={{ backgroundColor: 'var(--primary)' }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
