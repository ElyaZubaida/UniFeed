import { MapPin, ShieldCheck, Users, Building2, User, Clock } from 'lucide-react';
import type { Listing } from '../data';

export type TimeTag = 'just-posted' | 'ending-soon';

interface FoodCardProps {
  listing: Listing;
  onClick: () => void;
  timeTag?: TimeTag;
}

const donorBadge = (type: Listing['donorType']) => {
  const map: Record<Listing['donorType'], { label: string; color: string; bg: string; icon: React.FC<{ size?: number }> }> = {
    vendor:  { label: 'Vendor',  color: '#FFFFFF', bg: '#1F5C99', icon: ShieldCheck },
    club:    { label: 'Club',    color: '#1F5C99', bg: '#AED6F1', icon: Users },
    kolej:   { label: 'Kolej',   color: '#1F5C99', bg: '#AED6F1', icon: Building2 },
    ngo:     { label: 'NGO',     color: '#1F5C99', bg: '#AED6F1', icon: Users },
    student: { label: 'Student', color: '#FFFFFF', bg: '#95A5A6', icon: User },
  };
  return map[type];
};

const timeTagConfig: Record<TimeTag, { label: string; bg: string }> = {
  'just-posted':  { label: 'Just Posted',  bg: '#2ABFBF' },
  'ending-soon':  { label: 'Ending Soon',  bg: '#F5A623' },
};

export function FoodCard({ listing, onClick, timeTag }: FoodCardProps) {
  const badge = donorBadge(listing.donorType);
  const BadgeIcon = badge.icon;
  const isFree = listing.type === 'free';
  const tagColor = isFree ? '#27AE60' : '#F5A623';

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl overflow-hidden shadow-sm transition-all active:scale-[0.98] hover:shadow-md"
      style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)' }}
    >
      <div className="relative w-full h-40 overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
        <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />

        {/* Time sensitivity tag — top left */}
        {timeTag && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-1 shadow-sm"
            style={{ backgroundColor: timeTagConfig[timeTag].bg }}
          >
            <Clock size={9} color="#FFFFFF" strokeWidth={2.5} />
            <span className="text-[10px] text-white" style={{ fontWeight: 600 }}>
              {timeTagConfig[timeTag].label}
            </span>
          </div>
        )}

        {/* Price / free tag — top right */}
        <div
          className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs shadow"
          style={{ backgroundColor: tagColor, color: '#FFFFFF', fontWeight: 700 }}
        >
          {isFree ? 'FREE' : `RM ${listing.price?.toFixed(2)}`}
        </div>

        {/* Discount badge — only when both timeTag and discount exist, shift discount below price tag */}
        {!isFree && listing.originalPrice && !timeTag && (
          <div
            className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#FFFFFF' }}
          >
            <span style={{ textDecoration: 'line-through', opacity: 0.8 }}>
              RM {listing.originalPrice.toFixed(2)}
            </span>
            {' '}
            <span style={{ color: '#FDE68A', fontWeight: 600 }}>
              -{Math.round((1 - listing.price! / listing.originalPrice) * 100)}%
            </span>
          </div>
        )}

        {/* Discount badge when timeTag is present — move to bottom-left */}
        {!isFree && listing.originalPrice && timeTag && (
          <div
            className="absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-xs"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#FFFFFF' }}
          >
            <span style={{ textDecoration: 'line-through', opacity: 0.8 }}>
              RM {listing.originalPrice.toFixed(2)}
            </span>
            {' '}
            <span style={{ color: '#FDE68A', fontWeight: 600 }}>
              -{Math.round((1 - listing.price! / listing.originalPrice) * 100)}%
            </span>
          </div>
        )}
      </div>

      <div className="px-4 py-3 flex flex-col gap-1.5">
        <h3 className="text-sm leading-snug" style={{ color: 'var(--accent)', fontWeight: 600 }}>
          {listing.name}
        </h3>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{ backgroundColor: badge.bg }}
          >
            <BadgeIcon size={11} color={badge.color} />
            <span className="text-[10px]" style={{ color: badge.color, fontWeight: 600 }}>{badge.label}</span>
          </div>
          <span className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>{listing.donor}</span>
          {listing.verified && <ShieldCheck size={12} color="#1F5C99" className="shrink-0" />}
        </div>

        <div className="flex items-center gap-1">
          <MapPin size={11} color="var(--muted-foreground)" />
          <span className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>{listing.location}</span>
        </div>

        <div className="flex items-center justify-between mt-0.5">
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {listing.quantity} pack{listing.quantity !== 1 ? 's' : ''} left
          </span>
          <span
            className="text-xs"
            style={{ color: listing.quantity <= 3 ? 'var(--destructive)' : '#27AE60', fontWeight: 500 }}
          >
            {listing.quantity <= 3 ? 'Almost gone!' : 'Available'}
          </span>
        </div>
      </div>
    </button>
  );
}
