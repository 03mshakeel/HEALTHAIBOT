import { useState } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AuthModal({ mode, onClose, onSwitchMode, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (formData.email === 'metbot@london.ac.uk' && formData.password === 'admin123') {
        onLogin({
          id: 'admin-1',
          name: 'Admin',
          email: formData.email,
          role: 'admin',
        });
        return;
      }

      const users = JSON.parse(localStorage.getItem('healthbot_users') || '[]');
      const user = users.find((u) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        onLogin({
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'user',
        });
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      const users = JSON.parse(localStorage.getItem('healthbot_users') || '[]');
      
      if (users.some((u) => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      users.push(newUser);
      localStorage.setItem('healthbot_users', JSON.stringify(users));

      onLogin({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: 'user',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-[#1a6fc4] to-[#114b83] p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-white/80 mt-2">
            {mode === 'login'
              ? 'Sign in to access your HealthBot account'
              : 'Join thousands of Londoners using HealthBot'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] focus:border-transparent transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] focus:border-transparent transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {mode === 'login' && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-[#1a6fc4] hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="w-full btn-primary py-3 text-center justify-center">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center text-sm text-gray-500">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button type="button" onClick={onSwitchMode} className="text-[#1a6fc4] font-semibold hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" onClick={onSwitchMode} className="text-[#1a6fc4] font-semibold hover:underline">
                  Sign in
                </button>
              </>
            )}
          </div>

          {mode === 'login' && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
            
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
