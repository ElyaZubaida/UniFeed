import { Search } from 'lucide-react';
import { useState } from 'react';
import { FREE_LISTINGS, type Listing } from '../data';
import { FoodCard } from './FoodCard';

type FilterType = 'all' | 'club' | 'kolej' | 'ngo' | 'student';

interface FreeFoodScreenProps {
  onNavigateToListing: (listing: Listing) => void;
}

export function FreeFoodScreen({ onNavigateToListing }: FreeFoodScreenProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = FREE_LISTINGS.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.donor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || l.donorType === filter;
    return matchSearch && matchFilter;
  });

  const filterLabels: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'club', label: 'Clubs' },
    { id: 'kolej', label: 'Kolej' },
    { id: 'ngo', label: 'NGO' },
    { id: 'student', label: 'Students' },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div
        className="px-5 pt-14 pb-4"
        style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)' }}
      >
        <h1 className="text-xl mb-4" style={{ fontWeight: 700, color: 'var(--accent)' }}>
          Free Food 🎁
          <span
            className="ml-2 text-sm rounded-full px-2 py-0.5"
            style={{ backgroundColor: '#E9F7EF', color: '#27AE60', fontWeight: 500 }}
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
            placeholder="Search food, donors…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--foreground)' }}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {filterLabels.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="rounded-full px-3 py-1 text-xs whitespace-nowrap transition-all shrink-0"
              style={{
                backgroundColor: filter === id ? '#27AE60' : 'var(--secondary)',
                color: filter === id ? 'white' : 'var(--foreground)',
                fontWeight: filter === id ? 600 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="mx-5 mt-4 rounded-xl p-3 flex items-start gap-2"
        style={{ backgroundColor: '#E9F7EF', border: '1px solid rgba(39,174,96,0.25)' }}
      >
        <span className="text-base">💚</span>
        <p className="text-xs" style={{ color: '#1A7A40' }}>
          Surplus food shared by campus clubs, colleges, NGOs, and fellow students — completely free. Pay it forward!
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl">🤲</span>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No free food listings right now.</p>
          </div>
        ) : (
          filtered.map((listing) => (
            <FoodCard key={listing.id} listing={listing} onClick={() => onNavigateToListing(listing)} />
          ))
        )}
      </div>
    </div>
  );
}
