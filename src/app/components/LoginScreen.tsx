import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UniFeedLogo } from './UniFeedLogo';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!studentId || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #2ABFBF 0%, #1E9999 55%, #1F5C99 100%)' }}
    >
      {/* Hero — logo centred on teal gradient */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8">
        <UniFeedLogo size={90} showWordmark={true} onDark={true} />
        <p className="text-white/60 text-xs text-center mt-4">
          Kurang bazir. Lebih berkongsi. · Less waste. More sharing.
        </p>
      </div>

      {/* Form card */}
      <div
        className="rounded-t-3xl px-6 pt-8 pb-10 shadow-2xl"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <h2 className="mb-1 text-xl" style={{ color: 'var(--accent)', fontWeight: 600 }}>
          Log in to continue
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
          Use your UiTM student credentials
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm" style={{ color: 'var(--foreground)', fontWeight: 500 }}>
              Student ID
            </label>
            <input
              type="text"
              placeholder="e.g. 2023456789"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1.5px solid transparent' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm" style={{ color: 'var(--foreground)', fontWeight: 500 }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all"
                style={{ backgroundColor: 'var(--input-background)', color: 'var(--foreground)', border: '1.5px solid transparent' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: 'var(--primary)' }}
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="text-sm text-center" style={{ color: 'var(--destructive)' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3.5 text-sm transition-opacity disabled:opacity-60 mt-1"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', fontWeight: 600 }}
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--muted-foreground)' }}>
          Having trouble? Contact{' '}
          <span style={{ color: 'var(--primary)', fontWeight: 500 }}>help@uitm.edu.my</span>
        </p>
      </div>
    </div>
  );
}
