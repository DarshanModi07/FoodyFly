import { useState, useRef, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ChatBot = ({ feedData }) => { 
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I know the best food spots. Ask me! ", isUser: false }
  ]);
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    console.log("User asked:", userMsg); 
    console.log("feed Data:", feedData);

    setMessages((prev) => [...prev, { text: userMsg, isUser: true }]);
    setInput("");
    setLoading(true);

    try {

      const response = await fetch( BASE_URL+ "api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          userQuestion: userMsg,
          allFeedData: feedData
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { text: data.answer, isUser: false }]);
      } else {
        setMessages((prev) => [...prev, { text: "AI error 😢", isUser: false }]);
      }

    } catch (error) {
      console.log("Frontend AI Error:", error);
      setMessages((prev) => [...prev, { text: "My brain froze! 🥶 Try again.", isUser: false }]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-serif">
      
      {/* --- CHAT WINDOW --- */}
      {isOpen && (
        <div className="w-80 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-4 border-[#4a7ac3] dark:border-[#284bffff] flex flex-col overflow-hidden mb-4 animate-in fade-in slide-in-from-bottom-5">
            
            {/* Header */}
            <div className="bg-[#4a7ac3] dark:bg-[#284bffff] p-3 text-white font-bold flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <span>Foody Assistant</span>
                </div>
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-white hover:text-gray-200 text-xl font-bold"
                >
                    &times;
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 bg-[#d7e9f5] dark:bg-gray-900 space-y-3">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                        <div className={`p-3 rounded-lg text-sm max-w-[85%] shadow-sm ${
                            msg.isUser 
                            ? "bg-[#4a7ac3] dark:bg-[#284bffff] text-white rounded-tr-none" 
                            : "bg-white dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-tl-none"
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div className="flex justify-start animate-pulse">
                         <div className="bg-white dark:bg-gray-700 p-2 rounded-lg rounded-tl-none text-xs text-gray-500 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-600">
                            Thinking... 🍔
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-2 border-t-2 border-[#4a7ac3] dark:border-[#284bffff] bg-white dark:bg-gray-800 flex gap-2">
                <input 
                    className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm outline-none focus:border-[#4a7ac3] dark:focus:border-[#284bffff] dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Suggest something spicy..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                    onClick={handleSend} 
                    disabled={loading} 
                    className="bg-[#4a7ac3] hover:bg-[#355b96] dark:bg-[#284bffff] text-white p-2 rounded-full transition-transform active:scale-95 disabled:opacity-50"
                >
                    ➤
                </button>
            </div>
        </div>
      )}

      {/* --- FLOATING TOGGLE BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-16 h-16 bg-[#4a7ac3] hover:bg-[#355b96] dark:bg-[#284bffff] text-white rounded-full shadow-2xl border-4 border-white dark:border-gray-800 text-3xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ChatBot;
