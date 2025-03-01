
import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: 'Hej! Hur kan vi hjälpa dig idag?', sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Auto-scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
    
    // Simulate a reply after a short delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          text: 'Tack för ditt meddelande. Vi kommer att kontakta dig så snart som möjligt. För snabbare svar, vänligen kontakta oss via Facebook Messenger.', 
          sender: 'bot' 
        }
      ]);
    }, 1000);
  };

  const openMessenger = () => {
    window.open('https://m.me/hustoftasmide', '_blank');
    toast({
      title: "Öppnar Facebook Messenger",
      description: "Du kommer att omdirigeras till vår Facebook Messenger chat.",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-forge-500 hover:bg-forge-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
          aria-label="Öppna chat"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl flex flex-col w-80 sm:w-96 h-96 border border-gray-200">
          {/* Chat Header */}
          <div className="bg-forge-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Hustofta Smide Chat</h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Stäng chat"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-forge-500 text-white rounded-tr-none' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Facebook Messenger Option */}
          <button
            onClick={openMessenger}
            className="flex items-center justify-center gap-2 bg-[#0084FF] hover:bg-[#0070db] text-white p-3 transition-colors"
          >
            <Facebook size={18} />
            <span>Fortsätt i Facebook Messenger</span>
          </button>
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Skriv ett meddelande..."
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forge-500"
            />
            <button
              type="submit"
              className="bg-forge-500 hover:bg-forge-600 text-white px-4 py-2 rounded-r-md flex items-center justify-center transition-colors"
              disabled={newMessage.trim() === ''}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
