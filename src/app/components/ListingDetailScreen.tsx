import { ArrowLeft, MapPin, Clock, Package, ShieldCheck, Users, Building2, User, Share2, Navigation } from 'lucide-react';
import { useState } from 'react';
import type { Listing } from '../data';
import { StaticCampusMap } from './CampusMap';

interface ListingDetailScreenProps {
  listing: Listing;
  onBack: () => void;
  onReserved: () => void;
}

const donorBadgeConfig = (type: Listing['donorType']) => {
  const map: Record<Listing['donorType'], { label: string; color: string; bg: string; icon: React.FC<{ size?: number }> }> = {
    vendor:  { label: 'Verified Vendor',  color: '#FFFFFF', bg: '#1F5C99', icon: ShieldCheck },
    club:    { label: 'Campus Club',      color: '#1F5C99', bg: '#AED6F1', icon: Users },
    kolej:   { label: 'Kolej Kediaman',  color: '#1F5C99', bg: '#AED6F1', icon: Building2 },
    ngo:     { label: 'NGO Partner',      color: '#1F5C99', bg: '#AED6F1', icon: Users },
    student: { label: 'Student',          color: '#FFFFFF', bg: '#95A5A6', icon: User },
  };
  return map[type];
};

export function ListingDetailScreen({ listing, onBack, onReserved }: ListingDetailScreenProps) {
  const [reserved, setReserved] = useState(false);
  const [loading, setLoading] = useState(false);
  const badge = donorBadgeConfig(listing.donorType);
  const BadgeIcon = badge.icon;
  const isFree = listing.type === 'free';
  const tagColor = isFree ? '#27AE60' : '#F5A623';
  const discount = listing.originalPrice
    ? Math.round((1 - listing.price! / listing.originalPrice) * 100)
    : 0;

  const handleReserve = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReserved(true);
      setTimeout(() => onReserved(), 1500);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero image */}
      <div className="relative w-full h-64 overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
        <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%)' }}
        />
        <div className="absolute top-12 left-4 right-4 flex justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center shadow"
            style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
          >
            <ArrowLeft size={18} color="#2C3E50" />
          </button>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center shadow"
            style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
          >
            <Share2 size={18} color="#2C3E50" />
          </button>
        </div>

        {/* Price tag */}
        <div
          className="absolute bottom-4 right-4 rounded-2xl px-4 py-2 shadow-lg"
          style={{ backgroundColor: tagColor, color: '#FFFFFF' }}
        >
          {isFree ? (
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>FREE</span>
          ) : (
            <div className="flex flex-col items-end">
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>RM {listing.price?.toFixed(2)}</span>
              {listing.originalPrice && (
                <span className="text-xs" style={{ textDecoration: 'line-through', opacity: 0.75 }}>
                  RM {listing.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          )}
        </div>

        {!isFree && discount > 0 && (
          <div
            className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs shadow"
            style={{ backgroundColor: '#FEF9EC', color: '#8C6400', fontWeight: 700 }}
          >
            -{discount}% OFF
          </div>
        )}
      </div>

      {/* Scrollable detail content */}
      <div className="flex-1 overflow-y-auto pb-36">
        <div
          className="mx-4 -mt-5 rounded-2xl p-5 shadow-md mb-4"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <h1
            className="text-xl mb-3"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--accent)' }}
          >
            {listing.name}
          </h1>

          {/* Donor badge */}
          <div
            className="flex items-center gap-2 rounded-xl p-3 mb-4"
            style={{ backgroundColor: badge.bg }}
          >
            <BadgeIcon size={18} color={badge.color} />
            <div className="flex-1">
              <p className="text-xs" style={{ color: badge.color, fontWeight: 600 }}>{badge.label}</p>
              <p className="text-sm" style={{ color: 'var(--foreground)', fontWeight: 500 }}>{listing.donor}</p>
            </div>
            {listing.verified && (
              <div
                className="flex items-center gap-1 rounded-full px-2 py-0.5"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <ShieldCheck size={12} color="#1F5C99" />
                <span className="text-[10px]" style={{ color: '#1F5C99', fontWeight: 600 }}>Verified</span>
              </div>
            )}
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-start gap-2 rounded-xl p-3" style={{ backgroundColor: 'var(--muted)' }}>
              <MapPin size={15} color="var(--muted-foreground)" className="mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] mb-0.5" style={{ color: 'var(--muted-foreground)' }}>Location</p>
                <p className="text-xs" style={{ color: 'var(--foreground)', fontWeight: 500, lineHeight: 1.4 }}>{listing.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl p-3" style={{ backgroundColor: 'var(--muted)' }}>
              <Clock size={15} color="var(--muted-foreground)" className="mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] mb-0.5" style={{ color: 'var(--muted-foreground)' }}>Prepared at</p>
                <p className="text-xs" style={{ color: 'var(--foreground)', fontWeight: 500 }}>{listing.timePrepared}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl p-3 col-span-2" style={{ backgroundColor: 'var(--muted)' }}>
              <Package size={15} color="var(--muted-foreground)" className="mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] mb-0.5" style={{ color: 'var(--muted-foreground)' }}>Quantity remaining</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: listing.quantity <= 3 ? 'var(--destructive)' : '#27AE60', fontWeight: 600 }}>
                    {listing.quantity} pack{listing.quantity !== 1 ? 's' : ''} left
                  </p>
                  {listing.quantity <= 3 && (
                    <span className="text-xs rounded-full px-2 py-0.5" style={{ backgroundColor: '#FEE2E2', color: 'var(--destructive)' }}>
                      Almost gone!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-sm mb-2" style={{ color: 'var(--accent)', fontWeight: 600 }}>About this listing</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{listing.description}</p>
          </div>
        </div>

        {/* Campus map */}
        <div className="mx-4 mb-4">
          <p className="text-sm mb-2" style={{ color: 'var(--accent)', fontWeight: 600 }}>Collection Point</p>
          <StaticCampusMap location={listing.location} />
        </div>

        {/* Food safety notice */}
        <div
          className="mx-4 rounded-xl p-3 flex items-start gap-2"
          style={{ backgroundColor: '#FEF9EC', border: '1px solid rgba(245,166,35,0.3)' }}
        >
          <span className="text-sm">⚠️</span>
          <p className="text-xs" style={{ color: '#8C6400' }}>
            Please collect your reservation within 30 minutes of pick-up time. Food safety is our priority.
          </p>
        </div>
      </div>

      {/* Fixed bottom action bar */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-5 py-4 flex flex-col gap-2.5"
        style={{ backgroundColor: 'var(--background)', borderTop: '1px solid var(--border)' }}
      >
        {/* Get Directions — outlined, teal */}
        <button
          className="w-full rounded-xl py-3.5 text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-80"
          style={{
            backgroundColor: 'transparent',
            border: '1.5px solid #2ABFBF',
            color: '#2ABFBF',
            fontWeight: 600,
          }}
        >
          <Navigation size={15} strokeWidth={2} />
          Get Directions
        </button>

        {/* Reserve — primary action */}
        {reserved ? (
          <div
            className="w-full rounded-xl py-3.5 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#E9F7EF' }}
          >
            <span className="text-lg">✅</span>
            <span className="text-sm" style={{ color: '#1A7A40', fontWeight: 600 }}>Reserved! Redirecting…</span>
          </div>
        ) : (
          <button
            onClick={handleReserve}
            disabled={loading || listing.quantity === 0}
            className="w-full rounded-xl py-3.5 text-sm transition-opacity disabled:opacity-60"
            style={{ backgroundColor: tagColor, color: '#FFFFFF', fontWeight: 600 }}
          >
            {loading
              ? 'Reserving…'
              : listing.quantity === 0
              ? 'Sold Out'
              : isFree
              ? 'Reserve Free Food'
              : `Reserve for RM ${listing.price?.toFixed(2)}`}
          </button>
        )}
      </div>
    </div>
  );
}
