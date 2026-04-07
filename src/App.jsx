// ==============================================================
// APP.JSX - MAIN APPLICATION COMPONENT
// ==============================================================
// This is the root component of the HealthAI application
// It manages global state (user authentication, current view)
// and handles navigation between different pages/components
// ==============================================================

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import all page sections for the landing page
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Statistics from './sections/Statistics';
import Services from './sections/Services';
import HowItWorks from './sections/HowItWorks';
import ChatBotSection from './sections/ChatBotSection';
import FindHealthcare from './sections/FindHealthcare';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';

// Import all major components/pages
import AuthModal from './components/AuthModal';
import ChatInterface from './components/ChatInterface';
import HealthcareFinder from './components/HealthcareFinder';
import HealthCheck from './components/HealthCheck';
import UserDashboard from './components/UserDashboard';
import AdminPanel from './components/AdminPanel';
import './App.css';

// Register GSAP plugin for scroll animations
gsap.registerPlugin(ScrollTrigger);

function App() {
  // ==============================================================
  // STATE MANAGEMENT
  // ==============================================================
  
  // showAuth: Controls visibility of authentication modal
  const [showAuth, setShowAuth] = useState(false);
  
  // authMode: Determines if modal is in 'login' or 'register' mode
  const [authMode, setAuthMode] = useState('login');
  
  // user: Stores logged-in user data (null if not authenticated)
  const [user, setUser] = useState(null);
  
  // currentView: Tracks which page/component to display
  // Values: 'home', 'chat', 'healthcare', 'healthcheck', 'dashboard', 'admin'
  const [currentView, setCurrentView] = useState('home');

  // ==============================================================
  // EFFECTS - INITIALIZE APPLICATION
  // ==============================================================
  
  // On component mount: Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('healthbot_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ==============================================================
  // HANDLER FUNCTIONS
  // ==============================================================
  
  // handleLogin: Called when user successfully logs in
  // Saves user data to state and localStorage, closes auth modal
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('healthbot_user', JSON.stringify(userData));
    setShowAuth(false);
  };

  // handleLogout: Called when user logs out
  // Clears user data and returns to home page
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('healthbot_user');
    setCurrentView('home');
  };

  // openAuth: Opens authentication modal with specified mode
  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  // protectedNavigate: Navigate to protected pages only if user is logged in
  // If not logged in, show auth modal first
  const protectedNavigate = (view) => {
    if (!user) {
      setAuthMode('login');
      setShowAuth(true);
      return;
    }
    setCurrentView(view);
  };

  // ==============================================================
  // RENDER CONTENT - CONDITIONALLY DISPLAY COMPONENTS
  // ==============================================================
  
  // Determines which component/page to render based on currentView
  const renderContent = () => {
    switch (currentView) {
      // Chat Page: Health Assistant Chatbot Interface
      case 'chat':
        return <ChatInterface user={user} onBack={() => setCurrentView('home')} />;
      
      // Healthcare Finder Page: Search for healthcare providers
      case 'healthcare':
        return <HealthcareFinder onBack={() => setCurrentView('home')} />;
      
      // Health Check Page: Symptom assessment and disease prediction
      case 'healthcheck':
        return <HealthCheck user={user} onBack={() => setCurrentView('home')} onFindHealthcare={() => setCurrentView('healthcare')} />;
      
      // User Dashboard: Profile, health history, settings
      case 'dashboard':
        return <UserDashboard user={user} onBack={() => setCurrentView('home')} onLogout={handleLogout} />;
      
      // Admin Panel: System administration (only for admin users)
      case 'admin':
        return user?.role === 'admin' ? (
          <AdminPanel onBack={() => setCurrentView('home')} onLogout={handleLogout} />
        ) : (
          (setCurrentView('home'), null)
        );
      
      // Default: Home/Landing Page with all sections
      default:
        return (
          <>
            <Hero onChat={() => protectedNavigate('chat')} onFindHealthcare={() => protectedNavigate('healthcare')} onHealthCheck={() => protectedNavigate('healthcheck')} />
            <Statistics />
            <Services onChatClick={() => protectedNavigate('chat')} onFindClick={() => protectedNavigate('healthcare')} onHealthCheckClick={() => protectedNavigate('healthcheck')} />
            <HowItWorks />
            <ChatBotSection onTryItNow={() => protectedNavigate('chat')} />
            <FindHealthcare onSearchNow={() => protectedNavigate('healthcare')} />
            <Testimonials />
            <FAQ />
            <CTASection onGetStarted={() => !user ? openAuth('register') : protectedNavigate('dashboard')} />
            <Footer />
          </>
        );
    }
  };

  // ==============================================================
  // MAIN RENDER
  // ==============================================================
  
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navigation bar - Always visible at top */}
      <Navigation 
        user={user} 
        onLogin={() => openAuth('login')} 
        onRegister={() => openAuth('register')}
        onLogout={handleLogout}
        onNavigate={setCurrentView}
        onProtectedNavigate={protectedNavigate}
      />
      
      {/* Main content area */}
      <main className={currentView === 'home' ? '' : 'pt-20'}>
        {renderContent()}
      </main>

      {showAuth && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuth(false)} 
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
