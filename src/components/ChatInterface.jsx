// ==============================================================
// CHAT INTERFACE COMPONENT
// ==============================================================
// Chatling.ai chatbot widget integration

import { useEffect } from 'react';

export default function ChatInterface({ onBack }) {
  useEffect(() => {
    // Create and append config script
    const configScript = document.createElement('script');
    configScript.innerHTML = `window.chtlConfig = { chatbotId: "2768284131" }`;
    document.head.appendChild(configScript);

    // Create and append Chatling embed script
    const embedScript = document.createElement('script');
    embedScript.src = 'https://chatling.ai/js/embed.js';
    embedScript.id = 'chtl-script';
    embedScript.async = true;
    embedScript.setAttribute('data-id', '2768284131');
    embedScript.type = 'text/javascript';
    document.head.appendChild(embedScript);

    // Cleanup
    return () => {
      const configScripts = document.querySelectorAll('script');
      configScripts.forEach(script => {
        if (script.innerHTML.includes('chtlConfig')) {
          script.remove();
        }
      });
      const script = document.getElementById('chtl-script');
      if (script) {
        script.remove();
      }
      delete window.chtlConfig;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <div className="border-b border-gray-200 p-4">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>

      {/* Clean chat container */}
      <div className="w-full h-[calc(100vh-60px)]">
        <div id="chtl-inline-bot"></div>
      </div>
    </div>
  );
}
