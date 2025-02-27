import { useState } from 'react';
import Welcome from './components/Welcome';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'signup' | 'dashboard' | 'welcome'>('welcome');
  
  // Example listings data with all 3 listings
  const listings = [
    {
      image: "https://cdn.wallpapersafari.com/41/42/Lg7k3Y.jpg",
      price: 299.99,
      description: "OG Fortnite Account with Renegade Raider, Black Knight, and rare emotes from Chapter 1. Full email access included.",
      onBuy: () => console.log('Buy clicked')
    },
    {
      image: "https://wallpapercave.com/wp/wp8655369.jpg",
      price: 199.99,
      description: "Stacked Account with 150+ skins including Galaxy, Wonder, and Honor Guard. All Battle Passes completed since Season 4.",
      onBuy: () => console.log('Buy clicked')
    },
    {
      image: "https://images5.alphacoders.com/116/1165762.jpg",
      price: 249.99,
      description: "Rare Account featuring Aerial Assault Trooper, Recon Expert, and exclusive tournament skins. 500+ wins.",
      onBuy: () => console.log('Buy clicked')
    }
  ];

  // Make sure Welcome is the default screen
  return (
    <>
      {currentScreen === 'welcome' ? (
        <Welcome />
      ) : currentScreen === 'login' ? (
        <LoginScreen 
          onSignupClick={() => setCurrentScreen('signup')}
          onDashboardClick={() => setCurrentScreen('dashboard')}
        />
      ) : currentScreen === 'signup' ? (
        <SignupScreen onLoginClick={() => setCurrentScreen('login')} />
      ) : (
        <Dashboard listings={listings} userBalance={0} />
      )}
    </>
  );
}

export default App; 