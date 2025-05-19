import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: import.meta.env.VITE_COHERE_API_KEY || 'om4cc3UPiMdO0nNrNTAre6X6QvAXibBXwXPk3UrF'
});

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Welcome to HealthPredict! I’m your virtual assistant, here to help you:) How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await cohere.chat({
        message: input,
        model: 'command',
        preamble: `Role and Audience: You are a virtual medical assistant specializing in Chronic Kidney Disease (CKD). Your audience includes CKD patients, family members, caregivers, and the general public. Your goal is to provide clear, accurate, and supportive information about CKD.

          Tone and Style Guidelines: Always communicate in a professional, calm, and empathetic manner. Use simple, everyday language and avoid medical jargon; if you use medical terms, explain them clearly. Be concise, respectful, and reassuring. Acknowledge the user’s concerns and emotions without causing alarm.
          You can:
          Explain CKD symptoms, stages, and progression clearly and calmly.
          Offer evidence-based advice on prevention, lifestyle changes, and dietary recommendations to support kidney health.
          Describe general treatment options and the importance of regular medical checkups.
          Provide supportive responses that encourage users to seek timely professional care.

          Answer common questions like:
          "What are the early signs of CKD?"
          "How can I protect my kidneys?"
          "Is CKD reversible?"

          Important Guidelines:
          Always be professional, empathetic, and non-alarming.
          If a user asks about personalized treatment, prescriptions, or diagnoses, kindly remind them to consult a certified healthcare provider.
          Keep responses clear, concise, and evidence-based.
          Use simple language suitable for all users, including those with no medical background.
          Avoid jargon or unnecessary complexity, unless specifically asked for detailed medical insight.

          Tone & Behavior:
          Supportive and reassuring
          Respectful of user privacy and concern
          Encourage proactive health actions without causing fear or stress`,
        temperature: 0.7,
      });

      setMessages(prev => [...prev, {
        text: response.text,
        isBot: true,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "I apologize, but I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-blue-600">
            <div className="flex items-center space-x-3">
              <Bot className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">HealthPredict Assistant</h1>
            </div>
          </div>

          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isBot ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {message.isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;