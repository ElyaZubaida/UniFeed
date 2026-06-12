import { Search, Bell, UserCircle, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { SURPLUS_LISTINGS, FREE_LISTINGS, type Listing } from '../data';
import { FoodCard, type TimeTag } from './FoodCard';

interface HomeScreenProps {
  onNavigateToListing: (listing: Listing) => void;
  onNavigateToSurplus: () => void;
  onNavigateToFree: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAdd: () => void;
}

// Time tag assignment for Happening Now cards — alternates to show both variants
const HAPPENING_NOW_TAGS: TimeTag[] = ['just-posted', 'ending-soon', 'just-posted'];

export function HomeScreen({
  onNavigateToListing,
  onNavigateToSurplus,
  onNavigateToFree,
  onNavigateToProfile,
  onNavigateToAdd,
}: HomeScreenProps) {
  const [search, setSearch] = useState('');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const happeningNow = [...SURPLUS_LISTINGS.slice(0, 2), ...FREE_LISTINGS.slice(0, 2)].slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Teal gradient header */}
      <div
        className="px-5 pt-14 pb-5"
        style={{ background: 'linear-gradient(160deg, #2ABFBF 0%, #1E9999 55%, #1F5C99 100%)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-xs mb-0.5">{greeting},</p>
            <h1
              className="text-white text-2xl"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              Ahmad Haziq
            </h1>
            <p className="text-white/60 text-xs mt-0.5">2023456789 · Shah Alam</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            >
              <Bell size={18} color="white" />
            </button>
            <button
              onClick={onNavigateToProfile}
              className="w-9 h-9 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <UserCircle size={36} color="rgba(255,255,255,0.9)" />
            </button>
          </div>
        </div>

        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
        >
          <Search size={16} color="rgba(255,255,255,0.7)" />
          <input
            type="text"
            placeholder="Search food listings…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-white/50 text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            className="rounded-xl p-3.5"
            style={{ backgroundColor: '#FEF9EC', border: '1px solid rgba(245,166,35,0.2)' }}
          >
            <p className="text-2xl mb-0.5" style={{ fontWeight: 700, color: '#F5A623' }}>
              {SURPLUS_LISTINGS.length}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Discounted listings active</p>
          </div>
          <div
            className="rounded-xl p-3.5"
            style={{ backgroundColor: '#E9F7EF', border: '1px solid rgba(39,174,96,0.2)' }}
          >
            <p className="text-2xl mb-0.5" style={{ fontWeight: 700, color: '#27AE60' }}>
              {FREE_LISTINGS.length}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Free food available now</p>
          </div>
        </div>

        {/* Happening Now — with time tags */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary)' }} />
              <h2 className="text-base" style={{ fontWeight: 600, color: 'var(--accent)' }}>Happening Now</h2>
            </div>
            <button
              onClick={onNavigateToSurplus}
              className="flex items-center gap-0.5 text-xs transition-opacity hover:opacity-70"
              style={{ color: 'var(--primary)' }}
            >
              See all <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {happeningNow.map((item, idx) => (
              <FoodCard
                key={item.id}
                listing={item}
                onClick={() => onNavigateToListing(item)}
                timeTag={HAPPENING_NOW_TAGS[idx]}
              />
            ))}
          </div>
        </section>

        {/* Free Food */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base" style={{ fontWeight: 600, color: 'var(--accent)' }}>Free Food 🎁</h2>
            <button
              onClick={onNavigateToFree}
              className="flex items-center gap-0.5 text-xs transition-opacity hover:opacity-70"
              style={{ color: '#27AE60' }}
            >
              See all <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {FREE_LISTINGS.slice(0, 2).map((item) => (
              <FoodCard key={item.id} listing={item} onClick={() => onNavigateToListing(item)} />
            ))}
          </div>
        </section>
      </div>

      <button
        onClick={onNavigateToAdd}
        className="fixed bottom-20 right-5 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-40"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <Plus size={24} color="white" />
      </button>
    </div>
  );
}
