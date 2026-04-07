// ==============================================================
// CHAT INTERFACE COMPONENT
// ==============================================================
// This component displays the Health Assistant Chatbot interface
// It loads the Chatling.ai chatbot widget for real-time chat
// Users can ask health questions and get AI-powered responses
// ==============================================================

import { useEffect } from 'react';
import { ArrowLeft, MessageCircle, Zap } from 'lucide-react';

export default function ChatInterface({ user, onBack }) {
  // ============================================================== 
  // EFFECTS - LOAD AND CLEANUP CHATLING SCRIPT (only if logged in)
  // ============================================================== 
  useEffect(() => {
    if (!user) return;
    // Create and append config script
    const configScript = document.createElement('script');
    configScript.innerHTML = `window.chtlConfig = { chatbotId: "2768284131", display: "page_inline" }`;
    document.head.appendChild(configScript);

    // Create and append Chatling embed script
    const embedScript = document.createElement('script');
    embedScript.src = 'https://chatling.ai/js/embed.js';
    embedScript.id = 'chtl-script';
    embedScript.async = true;
    embedScript.setAttribute('data-id', '2768284131');
    embedScript.setAttribute('data-display', 'page_inline');
    embedScript.type = 'text/javascript';
    document.head.appendChild(embedScript);

    // Cleanup: Remove scripts when unmounting (leaving page)
    return () => {
      configScript.remove();
      // Remove embed script
      const script = document.getElementById('chtl-script');
      if (script) {
        script.remove();
      }
      delete window.chtlConfig;
    };
  }, [user]);

  // ==============================================================
  // COMPONENT STRUCTURE
  // ==============================================================
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f7fa] via-[#eef4f9] to-[#f0f4f8]">
      {/* HEADER SECTION - Navigation and user info */}
      <div className="bg-gradient-to-r from-white via-[#f8fafc] to-white border-b border-gray-200 sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back button */}
            <button 
              onClick={onBack} 
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-[#1f2937]" />
            </button>
            
            {/* Title with icon */}
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
          
          {/* User info display (if logged in) */}
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

      {/* MAIN CONTENT SECTION */}
      <div className="flex flex-col items-center justify-start py-8 px-4">
        
        {/* TOP INFO CARDS - Show features */}
        <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Card 1: 24/7 Support */}
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
          
          {/* Card 2: Fast Response */}
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
          
          {/* Card 3: Secure Chat */}
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
            {/* Chat widget embedding area - Chatling widget loads here */}
            <div className="p-4 bg-gradient-to-b from-[#fafbfc] to-white">
              {user ? (
                <div id="chtl-inline-bot" style={{ width: '100%', height: '60%' }}></div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <p className="text-lg font-semibold">Please log in to access the Health Assistant Chatbot.</p>
                </div>
              )}
            </div>

            {/* Footer with helpful tip */}
            <div className="bg-gradient-to-r from-[#f0f7ff] to-[#f5f1ff] px-8 py-4 border-t border-gray-100">
              <p className="text-xs text-[#6b7280] text-center">💡 Tip: Be specific about your symptoms for better recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
