import { useEffect } from 'react';
import { ArrowLeft, MessageCircle, Zap } from 'lucide-react';

export default function ChatInterface({ user, onBack }) {
  useEffect(() => {
    // Load Zapier script
    const script = document.createElement('script');
    script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7fa] via-[#eef4f9] to-[#f0f4f8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-[#f8fafc] to-white border-b border-gray-200 sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack} 
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-[#1f2937]" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a6fc4] to-[#0d47a1] flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-[#1f2937] text-lg">Health Assistant Chat</h1>
                <p className="text-xs text-[#6b7280]">Powered by AI</p>
              </div>
            </div>
          </div>
          {user && (
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#e3f2fd] to-[#f3e5f5] rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#28b463] to-[#1d7f44] flex items-center justify-center text-white text-sm font-bold">
                {user.name?.charAt(0) || 'U'}
              </div>
              <span className="text-sm font-medium text-[#1f2937]">{user.name || 'User'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start py-8 px-4">
        {/* Top Stats Cards */}
        <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#1a6fc4]" />
              </div>
              <div>
                <p className="text-xs text-[#6b7280]">Instant Support</p>
                <p className="text-sm font-bold text-[#1f2937]">24/7</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-green-100 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#28b463]" />
              </div>
              <div>
                <p className="text-xs text-[#6b7280]">Fast Response</p>
                <p className="text-sm font-bold text-[#1f2937]">Instant</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <span className="text-lg">🔒</span>
              </div>
              <div>
                <p className="text-xs text-[#6b7280]">Secure Chat</p>
                <p className="text-sm font-bold text-[#1f2937]">Private</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Widget Container */}
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-200 backdrop-blur">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-6">
              <h2 className="text-white font-bold text-lg">Start Your Health Consultation</h2>
              <p className="text-blue-50 text-sm mt-1">Ask anything about your health - we're here to help</p>
            </div>
            
            {/* Chat embedding area */}
            <div className="p-4 bg-gradient-to-b from-[#fafbfc] to-white">
              <div className="rounded-2xl overflow-hidden bg-white shadow-inner border border-gray-100">
                <zapier-interfaces-chatbot-embed 
                  is-popup="false" 
                  chatbot-id="cmmo2w5le006aspr33xecmdgj" 
                  height="550px" 
                  width="100%"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-[#f0f7ff] to-[#f5f1ff] px-8 py-4 border-t border-gray-100">
              <p className="text-xs text-[#6b7280] text-center">💡 Tip: Be specific about your symptoms for better recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}