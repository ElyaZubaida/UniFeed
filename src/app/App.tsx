import '../styles/fonts.css';
import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { SurplusFoodScreen } from './components/SurplusFoodScreen';
import { FreeFoodScreen } from './components/FreeFoodScreen';
import { ListingDetailScreen } from './components/ListingDetailScreen';
import { AddListingScreen } from './components/AddListingScreen';
import { ReservationsScreen } from './components/ReservationsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import type { Listing } from './data';

// MARKER-MAKE-KIT-INVOKED

type Screen =
  | 'login'
  | 'home'
  | 'surplus'
  | 'free'
  | 'detail'
  | 'add'
  | 'reservations'
  | 'profile';

type BottomTab = 'home' | 'surplus' | 'free' | 'reservations';

const TAB_TO_SCREEN: Record<BottomTab, Screen> = {
  home: 'home',
  surplus: 'surplus',
  free: 'free',
  reservations: 'reservations',
};

const SCREEN_TO_TAB: Partial<Record<Screen, BottomTab>> = {
  home: 'home',
  surplus: 'surplus',
  free: 'free',
  reservations: 'reservations',
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [activeTab, setActiveTab] = useState<BottomTab>('home');

  const showBottomNav = screen !== 'login' && screen !== 'detail' && screen !== 'add' && screen !== 'profile';

  const navigateToListing = (listing: Listing) => {
    setSelectedListing(listing);
    setScreen('detail');
  };

  const handleTabChange = (tab: BottomTab) => {
    setActiveTab(tab);
    setScreen(TAB_TO_SCREEN[tab]);
  };

  const handleBack = () => {
    const tab = SCREEN_TO_TAB[screen];
    if (tab) {
      setScreen(tab);
    } else {
      setScreen('home');
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center" style={{ backgroundColor: '#1A0E08' }}>
      <div
        className="relative w-full max-w-sm min-h-screen overflow-hidden shadow-2xl"
        style={{ backgroundColor: 'var(--background)' }}
      >
        {screen === 'login' && (
          <LoginScreen
            onLogin={() => {
              setScreen('home');
              setActiveTab('home');
            }}
          />
        )}

        {screen === 'home' && (
          <HomeScreen
            onNavigateToListing={navigateToListing}
            onNavigateToSurplus={() => { setScreen('surplus'); setActiveTab('surplus'); }}
            onNavigateToFree={() => { setScreen('free'); setActiveTab('free'); }}
            onNavigateToProfile={() => setScreen('profile')}
            onNavigateToAdd={() => setScreen('add')}
          />
        )}

        {screen === 'surplus' && (
          <SurplusFoodScreen onNavigateToListing={navigateToListing} />
        )}

        {screen === 'free' && (
          <FreeFoodScreen onNavigateToListing={navigateToListing} />
        )}

        {screen === 'detail' && selectedListing && (
          <ListingDetailScreen
            listing={selectedListing}
            onBack={handleBack}
            onReserved={() => {
              setScreen('reservations');
              setActiveTab('reservations');
            }}
          />
        )}

        {screen === 'add' && (
          <AddListingScreen
            onBack={() => { setScreen('home'); setActiveTab('home'); }}
            onPosted={() => { setScreen('home'); setActiveTab('home'); }}
          />
        )}

        {screen === 'reservations' && (
          <ReservationsScreen onNavigateToListing={navigateToListing} />
        )}

        {screen === 'profile' && (
          <ProfileScreen
            onBack={() => { setScreen('home'); setActiveTab('home'); }}
            onLogout={() => setScreen('login')}
          />
        )}

        {showBottomNav && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
}
