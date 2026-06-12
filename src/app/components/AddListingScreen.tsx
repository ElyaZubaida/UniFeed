import { ArrowLeft, Camera, Clock, Package, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { MapPicker } from './CampusMap';

interface AddListingScreenProps {
  onBack: () => void;
  onPosted: () => void;
}

export function AddListingScreen({ onBack, onPosted }: AddListingScreenProps) {
  const [listingType, setListingType] = useState<'discounted' | 'free'>('discounted');
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [timePrepared, setTimePrepared] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [posted, setPosted] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName || !quantity || !selectedBuilding || !timePrepared) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setPosted(true); setTimeout(() => onPosted(), 1500); }, 1200);
  };

  const fieldStyle = {
    backgroundColor: 'var(--input-background)',
    color: 'var(--foreground)',
    border: '1.5px solid transparent',
    borderRadius: '0.875rem',
  };

  const activeTypeColor = listingType === 'discounted' ? '#F5A623' : '#27AE60';

  const canSubmit = Boolean(foodName && quantity && selectedBuilding && timePrepared);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 pt-14 pb-4"
        style={{ backgroundColor: 'var(--card)', borderBottom: '1px solid var(--border)' }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--muted)' }}
        >
          <ArrowLeft size={18} color="var(--foreground)" />
        </button>
        <h1 className="text-lg" style={{ fontWeight: 700, color: 'var(--accent)' }}>Add Food Listing</h1>
      </div>

      <form onSubmit={handlePost} className="flex-1 overflow-y-auto px-5 py-5 pb-32 flex flex-col gap-5">
        {/* Photo upload */}
        <div
          className="w-full h-44 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed cursor-pointer transition-all hover:opacity-80"
          style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--muted)' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <Camera size={22} color="var(--primary)" />
          </div>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Tap to upload food photo</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>JPG, PNG up to 5MB</p>
        </div>

        {/* Listing type toggle */}
        <div>
          <label className="text-sm mb-2 block" style={{ color: 'var(--foreground)', fontWeight: 500 }}>Listing Type</label>
          <div className="flex rounded-xl p-1 gap-1" style={{ backgroundColor: 'var(--input-background)' }}>
            {(['discounted', 'free'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setListingType(type)}
                className="flex-1 rounded-lg py-2.5 text-sm transition-all"
                style={{
                  backgroundColor: listingType === type ? (type === 'discounted' ? '#F5A623' : '#27AE60') : 'transparent',
                  color: listingType === type ? '#FFFFFF' : 'var(--muted-foreground)',
                  fontWeight: listingType === type ? 600 : 400,
                }}
              >
                {type === 'discounted' ? '🏷️ Discounted' : '🎁 Free'}
              </button>
            ))}
          </div>
        </div>

        {/* Food name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" style={{ color: 'var(--foreground)', fontWeight: 500 }}>Food Name *</label>
          <input
            type="text"
            placeholder="e.g. Nasi Lemak Set"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
            className="w-full px-4 py-3 text-sm outline-none transition-all"
            style={fieldStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = activeTypeColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
          />
        </div>

        {/* Price — discounted only */}
        {listingType === 'discounted' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm" style={{ color: 'var(--foreground)', fontWeight: 500 }}>Discounted Price (RM) *</label>
            <div className="relative">
              <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="var(--muted-foreground)" />
              <input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.50"
                min="0"
                className="w-full pl-9 pr-4 py-3 text-sm outline-none transition-all"
                style={fieldStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#F5A623')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              />
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" style={{ color: 'var(--foreground)', fontWeight: 500 }}>Quantity (packs) *</label>
          <div className="relative">
            <Package size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="var(--muted-foreground)" />
            <input
              type="number"
              placeholder="e.g. 10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
              className="w-full pl-9 pr-4 py-3 text-sm outline-none transition-all"
              style={fieldStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = activeTypeColor)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
            />
          </div>
        </div>

        {/* Location — map picker */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" style={{ color: 'var(--foreground)', fontWeight: 500 }}>
            Pickup Location *
          </label>
          <MapPicker
            selectedBuilding={selectedBuilding}
            onSelect={(name) => setSelectedBuilding(name || null)}
          />
        </div>

        {/* Time prepared */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" style={{ color: 'var(--foreground)', fontWeight: 500 }}>Time Prepared *</label>
          <div className="relative">
            <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="var(--muted-foreground)" />
            <input
              type="time"
              value={timePrepared}
              onChange={(e) => setTimePrepared(e.target.value)}
              required
              className="w-full pl-9 pr-4 py-3 text-sm outline-none transition-all"
              style={fieldStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = activeTypeColor)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" style={{ color: 'var(--foreground)', fontWeight: 500 }}>
            Description{' '}
            <span style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            placeholder="Describe the food, any allergens, or special instructions…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 text-sm outline-none transition-all resize-none"
            style={fieldStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = activeTypeColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
          />
        </div>

        <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
          By posting, you confirm the food is safe to consume and comply with UiTM UniFeed community guidelines.
        </p>
      </form>

      {/* Post button */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-5 py-4"
        style={{ backgroundColor: 'var(--background)', borderTop: '1px solid var(--border)' }}
      >
        {posted ? (
          <div
            className="w-full rounded-xl py-4 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#E9F7EF' }}
          >
            <span className="text-lg">🎉</span>
            <span className="text-sm" style={{ color: '#1A7A40', fontWeight: 600 }}>Listing posted successfully!</span>
          </div>
        ) : (
          <button
            onClick={handlePost}
            disabled={loading || !canSubmit}
            className="w-full rounded-xl py-4 text-sm transition-opacity disabled:opacity-40"
            style={{ backgroundColor: activeTypeColor, color: '#FFFFFF', fontWeight: 600 }}
          >
            {loading ? 'Posting…' : '📢 Post Listing'}
          </button>
        )}
      </div>
    </div>
  );
}
