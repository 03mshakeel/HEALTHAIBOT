import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Heart, MessageCircle, MapPin, Home, Brain, Activity } from 'lucide-react';

export default function Navigation({ user, onLogin, onRegister, onLogout, onNavigate, onProtectedNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', icon: Home, view: 'home' },
    { label: 'Services', icon: Heart, view: 'home', href: '#services' },
    { label: 'ChatBot', icon: MessageCircle, view: 'chat' },
    { label: 'Health Check', icon: Activity, view: 'healthcheck' },
    { label: 'Find Healthcare', icon: MapPin, view: 'healthcare' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      isScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#1a6fc4] to-[#114b83] rounded-lg flex items-center justify-center">
              <img src="Logo maker project.png" alt="" />
            </div>
            <span className="text-xl font-bold text-[#1f2937]">MEDBOT</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.href) {
                    scrollToSection(link.href);
                  } else if (link.view === 'home') {
                    onNavigate(link.view);
                  } else {
                    // Protected pages require login
                    onProtectedNavigate(link.view);
                  }
                }}
                className="text-sm font-medium transition-colors duration-250 hover:text-[#1a6fc4] relative group text-[#1f2937]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a6fc4] transition-all duration-250 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={() => onNavigate(user.role === 'admin' ? 'admin' : 'dashboard')}
                  className="flex items-center gap-2 text-sm font-medium text-[#1f2937] hover:text-[#1a6fc4] transition-colors"
                >
                  <User className="w-5 h-5" />
                  {user.name}
                </button>
                <button onClick={onLogout} className="p-2 text-[#6b7280] hover:text-[#e74c3c] transition-colors" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button onClick={onLogin} className="text-sm font-medium text-[#1f2937] hover:text-[#1a6fc4] transition-colors">
                  Log In
                </button>
                <button onClick={onRegister} className="btn-primary text-sm">
                  Get Started
                </button>
              </>
            )}
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-[#1f2937]">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.href) {
                      scrollToSection(link.href);
                    } else if (link.view === 'home') {
                      onNavigate(link.view);
                    } else {
                      // Protected pages require login
                      onProtectedNavigate(link.view);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-[#1f2937] hover:text-[#1a6fc4] transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </button>
              ))}
              
              {user ? (
                <>
                  <button
                    onClick={() => { onNavigate(user.role === 'admin' ? 'admin' : 'dashboard'); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-3 text-[#1f2937] hover:text-[#1a6fc4] transition-colors"
                  >
                    <User className="w-5 h-5" />
                    My Account
                  </button>
                  <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 text-[#e74c3c]">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 text-[#1f2937]">
                    <User className="w-5 h-5" />
                    Log In
                  </button>
                  <button onClick={() => { onRegister(); setIsMobileMenuOpen(false); }} className="btn-primary text-center">
                    Get Started
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
