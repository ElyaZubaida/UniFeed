import { ArrowLeft, UserCircle, ChevronRight, LogOut, Bell, ShieldCheck, Heart, Clock, BookMarked } from 'lucide-react';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const dietaryOptions = ['Halal', 'Vegetarian', 'No Nuts', 'No Seafood', 'Vegan', 'Gluten-Free'];

export function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const selectedDietary = ['Halal'];

  const stats = [
    { label: 'Reservations',    value: '12',  icon: BookMarked, color: 'var(--primary)' },
    { label: 'Food Saved',      value: '8kg', icon: Heart,      color: '#27AE60' },
    { label: 'Listings Posted', value: '3',   icon: Clock,      color: '#1F5C99' },
  ];

  const menuItems = [
    { label: 'Notifications',       icon: Bell,        value: 'On' },
    { label: 'Dietary Preferences', icon: Heart,       value: '' },
    { label: 'Verified Status',     icon: ShieldCheck, value: 'Student' },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Teal gradient header */}
      <div
        className="px-5 pt-14 pb-5"
        style={{ background: 'linear-gradient(160deg, #2ABFBF 0%, #1E9999 55%, #1F5C99 100%)' }}
      >
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <ArrowLeft size={18} color="white" />
          </button>
          <h1 className="text-lg text-white" style={{ fontWeight: 600 }}>My Profile</h1>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: 72, height: 72 }}
          >
            <UserCircle size={60} color="rgba(255,255,255,0.9)" />
          </div>
          <div>
            <h2
              className="text-white text-xl"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              Ahmad Haziq
            </h2>
            <p className="text-white/70 text-xs">2023456789</p>
            <p className="text-white/60 text-xs mt-0.5">Faculty of Computer Science</p>
            <div
              className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <ShieldCheck size={10} color="white" />
              <span className="text-[10px] text-white" style={{ fontWeight: 500 }}>Verified UiTM Student</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-28 flex flex-col gap-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl p-3 flex flex-col items-center gap-1.5"
              style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)' }}
            >
              <Icon size={18} color={color} />
              <span className="text-xl" style={{ fontWeight: 700, color: 'var(--accent)' }}>{value}</span>
              <span className="text-[10px] text-center leading-tight" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Dietary preferences */}
        <div
          className="rounded-2xl p-4"
          style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm" style={{ fontWeight: 600, color: 'var(--accent)' }}>Dietary Preferences</h3>
            <button className="text-xs" style={{ color: 'var(--primary)' }}>Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((opt) => {
              const selected = selectedDietary.includes(opt);
              return (
                <span
                  key={opt}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{
                    backgroundColor: selected ? '#1F5C99' : 'var(--card)',
                    color: selected ? '#FFFFFF' : 'var(--muted-foreground)',
                    fontWeight: selected ? 600 : 400,
                    border: selected ? '1px solid #1F5C99' : '1px solid var(--border)',
                  }}
                >
                  {opt}
                </span>
              );
            })}
          </div>
        </div>

        {/* Settings menu */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)' }}
        >
          {menuItems.map(({ label, icon: Icon, value }, idx) => (
            <div key={label}>
              <button className="w-full flex items-center justify-between px-4 py-4 transition-colors hover:opacity-80 text-left">
                <div className="flex items-center gap-3">
                  <Icon size={18} color="var(--primary)" />
                  <span className="text-sm" style={{ color: 'var(--foreground)' }}>{label}</span>
                </div>
                <div className="flex items-center gap-1">
                  {value && <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{value}</span>}
                  <ChevronRight size={15} color="var(--muted-foreground)" />
                </div>
              </button>
              {idx < menuItems.length - 1 && (
                <div className="mx-4" style={{ height: '1px', backgroundColor: 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div
          className="rounded-2xl p-4"
          style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-sm mb-3" style={{ fontWeight: 600, color: 'var(--accent)' }}>Recent Activity</h3>
          {['Nasi Lemak Set — Reserved', 'Nasi Briyani Pack — Claimed', 'Mee Goreng Mamak — Cancelled'].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <span className="text-xs" style={{ color: 'var(--foreground)' }}>{item.split(' — ')[0]}</span>
              <span
                className="text-xs rounded-full px-2 py-0.5"
                style={{
                  backgroundColor: item.includes('Reserved') ? '#E9F7EF' : item.includes('Claimed') ? '#E8F4FD' : '#F0F4F8',
                  color: item.includes('Reserved') ? '#27AE60' : item.includes('Claimed') ? '#1F5C99' : '#7B8C9E',
                  fontWeight: 500,
                }}
              >
                {item.split(' — ')[1]}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>UniFeed v1.0.0 · UiTM Shah Alam</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
            Reducing food waste, one meal at a time 🌿
          </p>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#FEE2E2', color: 'var(--destructive)', fontWeight: 500 }}
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
}
