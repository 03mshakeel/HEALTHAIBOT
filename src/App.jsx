import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import AuthModal from './components/AuthModal';
import ChatInterface from './components/ChatInterface';
import HealthcareFinder from './components/HealthcareFinder';
import HealthCheck from './components/HealthCheck';
import UserDashboard from './components/UserDashboard';
import AdminPanel from './components/AdminPanel';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const savedUser = localStorage.getItem('healthbot_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('healthbot_user', JSON.stringify(userData));
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('healthbot_user');
    setCurrentView('home');
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'chat':
        return <ChatInterface user={user} onBack={() => setCurrentView('home')} />;
      case 'healthcare':
        return <HealthcareFinder onBack={() => setCurrentView('home')} />;
      case 'healthcheck':
        return <HealthCheck user={user} onBack={() => setCurrentView('home')} onFindHealthcare={() => setCurrentView('healthcare')} />;
      case 'dashboard':
        return <UserDashboard user={user} onBack={() => setCurrentView('home')} onLogout={handleLogout} />;
      case 'admin':
        return user?.role === 'admin' ? (
          <AdminPanel onBack={() => setCurrentView('home')} onLogout={handleLogout} />
        ) : (
          (setCurrentView('home'), null)
        );
      default:
        return (
          <>
            <Hero onChat={() => setCurrentView('chat')} onFindHealthcare={() => setCurrentView('healthcare')} onHealthCheck={() => setCurrentView('healthcheck')} />
            <Statistics />
            <Services onChatClick={() => setCurrentView('chat')} onFindClick={() => setCurrentView('healthcare')} onHealthCheckClick={() => setCurrentView('healthcheck')} />
            <HowItWorks />
            <ChatBotSection onTryItNow={() => setCurrentView('chat')} />
            <FindHealthcare onSearchNow={() => setCurrentView('healthcare')} />
            <Testimonials />
            <FAQ />
            <CTASection onGetStarted={() => openAuth('register')} />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navigation 
        user={user} 
        onLogin={() => openAuth('login')} 
        onRegister={() => openAuth('register')}
        onLogout={handleLogout}
        onNavigate={setCurrentView}
      />
      
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
