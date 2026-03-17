import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ChatInterface({ user, onBack }) {
  useEffect(() => {
    // Load Zapier script
    const script = document.createElement('script');
    script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="font-semibold text-[#1f2937]">Zapier Chatbot</h1>
        </div>
      </div>

      <div className="flex justify-center items-start pt-8">
        <zapier-interfaces-chatbot-embed 
          is-popup="false" 
          chatbot-id="cmmo2w5le006aspr33xecmdgj" 
          height="600px" 
          width="400px"
        />
      </div>
    </div>
  );
}