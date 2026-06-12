import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { SURPLUS_LISTINGS, type Listing } from '../data';
import { FoodCard } from './FoodCard';

interface SurplusFoodScreenProps {
  onNavigateToListing: (listing: Listing) => void;
}

export function SurplusFoodScreen({ onNavigateToListing }: SurplusFoodScreenProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'discount' | 'qty'>('price');

  const filtered = SURPLUS_LISTINGS.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.donor.toLowerCase().includes(search.toLowerCase()) ||
    l.location.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price') return (a.price ?? 0) - (b.price ?? 0);
    if (sortBy === 'discount') {
      const da = 1 - (a.price ?? 0) / (a.originalPrice ?? 1);
      const db = 1 - (b.price ?? 0) / (b.originalPrice ?? 1);
      return db - da;
    }
    return b.quantity - a.quantity;
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div
        className="px-5 pt-14 pb-4"
        style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)' }}
      >
        <h1 className="text-xl mb-4" style={{ fontWeight: 700, color: 'var(--accent)' }}>
          Surplus Food
          <span
            className="ml-2 text-sm rounded-full px-2 py-0.5"
            style={{ backgroundColor: '#FEF9EC', color: '#F5A623', fontWeight: 500 }}
          >
            {filtered.length}
          </span>
        </h1>
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3"
          style={{ backgroundColor: 'var(--input-background)' }}
        >
          <Search size={15} color="var(--muted-foreground)" />
          <input
            type="text"
            placeholder="Search vendors, food…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--foreground)' }}
          />
          <SlidersHorizontal size={15} color="var(--muted-foreground)" />
        </div>
        <div className="flex gap-2">
          {(['price', 'discount', 'qty'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className="rounded-full px-3 py-1 text-xs transition-all"
              style={{
                backgroundColor: sortBy === s ? 'var(--primary)' : 'var(--secondary)',
                color: sortBy === s ? 'white' : 'var(--foreground)',
                fontWeight: sortBy === s ? 600 : 400,
              }}
            >
              {s === 'price' ? 'Lowest Price' : s === 'discount' ? 'Best Discount' : 'Most Available'}
            </button>
          ))}
        </div>
      </div>

      <div
        className="mx-5 mt-4 rounded-xl p-3 flex items-start gap-2"
        style={{ backgroundColor: '#FEF9EC', border: '1px solid rgba(245,166,35,0.25)' }}
      >
        <span className="text-base">🏷️</span>
        <p className="text-xs" style={{ color: '#8C6400' }}>
          These are near-expiry items from verified campus vendors at heavily discounted prices. Reserve now before they're gone!
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 flex flex-col gap-3">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl">🍱</span>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No listings match your search.</p>
          </div>
        ) : (
          sorted.map((listing) => (
            <FoodCard key={listing.id} listing={listing} onClick={() => onNavigateToListing(listing)} />
          ))
        )}
      </div>
    </div>
  );
}
