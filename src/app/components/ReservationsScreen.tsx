import { useState } from 'react';
import { MapPin, Clock, X, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { RESERVATIONS, type Reservation } from '../data';

interface ReservationsScreenProps {
  onNavigateToListing: (listing: Reservation['listing']) => void;
}

const statusConfig: Record<Reservation['status'], { label: string; color: string; bg: string; icon: React.FC<{ size?: number }> }> = {
  active:    { label: 'Active',    color: '#27AE60', bg: '#E9F7EF', icon: CheckCircle },
  claimed:   { label: 'Claimed',   color: '#1F5C99', bg: '#E8F4FD', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: '#7B8C9E', bg: '#F0F4F8', icon: XCircle },
  expired:   { label: 'Expired',   color: '#DC2626', bg: '#FEE2E2', icon: AlertCircle },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('en-MY', { dateStyle: 'medium', timeStyle: 'short' });
}

function ReservationCard({
  reservation,
  onCancel,
  onClick,
}: {
  reservation: Reservation;
  onCancel?: () => void;
  onClick: () => void;
}) {
  const config = statusConfig[reservation.status];
  const StatusIcon = config.icon;
  const isFree = reservation.listing.type === 'free';
  const tagColor = isFree ? '#27AE60' : '#F5A623';

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)' }}
    >
      <button onClick={onClick} className="w-full text-left">
        <div className="relative w-full h-28 overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
          <img src={reservation.listing.image} alt={reservation.listing.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.2)' }} />
          <div
            className="absolute top-2 right-2 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs shadow"
            style={{ backgroundColor: config.bg }}
          >
            <StatusIcon size={11} color={config.color} />
            <span style={{ color: config.color, fontWeight: 600 }}>{config.label}</span>
          </div>
          <div
            className="absolute bottom-2 left-3 rounded-full px-2.5 py-1 text-xs"
            style={{ backgroundColor: tagColor, color: '#FFFFFF', fontWeight: 700 }}
          >
            {isFree ? 'FREE' : `RM ${reservation.listing.price?.toFixed(2)}`}
          </div>
        </div>
      </button>

      <div className="px-4 py-3">
        <h3 className="text-sm mb-1" style={{ color: 'var(--accent)', fontWeight: 600 }}>
          {reservation.listing.name}
        </h3>
        <p className="text-xs mb-2" style={{ color: 'var(--muted-foreground)' }}>{reservation.listing.donor}</p>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <MapPin size={11} color="var(--muted-foreground)" />
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              {reservation.listing.location.split(',')[0]}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={11} color="var(--muted-foreground)" />
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              {formatTime(reservation.reservedAt)}
            </span>
          </div>
        </div>

        <div
          className="flex items-center justify-between rounded-xl px-3 py-2 mb-3"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Pickup Code</span>
          <span
            className="text-sm tracking-widest"
            style={{ color: 'var(--accent)', fontWeight: 700, fontFamily: 'monospace' }}
          >
            {reservation.pickupCode}
          </span>
        </div>

        {reservation.status === 'active' && onCancel && (
          <button
            onClick={onCancel}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#FEE2E2', color: 'var(--destructive)', fontWeight: 500 }}
          >
            <X size={13} />
            Cancel Reservation
          </button>
        )}
      </div>
    </div>
  );
}

export function ReservationsScreen({ onNavigateToListing }: ReservationsScreenProps) {
  const [tab, setTab] = useState<'active' | 'past'>('active');
  const [reservations, setReservations] = useState(RESERVATIONS);

  const active = reservations.filter((r) => r.status === 'active');
  const past = reservations.filter((r) => r.status !== 'active');

  const handleCancel = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' as const } : r))
    );
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div
        className="px-5 pt-14 pb-0"
        style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)' }}
      >
        <h1 className="text-xl mb-4" style={{ fontWeight: 700, color: 'var(--accent)' }}>My Reservations</h1>
        <div className="flex">
          {(['active', 'past'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-3 text-sm transition-colors relative"
              style={{
                color: tab === t ? 'var(--primary)' : 'var(--muted-foreground)',
                fontWeight: tab === t ? 600 : 400,
              }}
            >
              {t === 'active' ? `Active (${active.length})` : `Past (${past.length})`}
              {tab === t && (
                <span
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--primary)' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 flex flex-col gap-3">
        {tab === 'active' ? (
          active.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <span className="text-5xl">📋</span>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No active reservations</p>
              <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
                Browse listings and reserve food to see them here
              </p>
            </div>
          ) : (
            active.map((r) => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onCancel={() => handleCancel(r.id)}
                onClick={() => onNavigateToListing(r.listing)}
              />
            ))
          )
        ) : past.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl">🕰️</span>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No past reservations yet</p>
          </div>
        ) : (
          past.map((r) => (
            <ReservationCard
              key={r.id}
              reservation={r}
              onClick={() => onNavigateToListing(r.listing)}
            />
          ))
        )}
      </div>
    </div>
  );
}
