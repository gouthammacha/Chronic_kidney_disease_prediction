import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, MessageCircle } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import PredictionForm from './pages/PredictionForm';
import Chatbot from './pages/Chatbot';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-lg fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
                  <Heart className="h-8 w-8 text-blue-600" />
                  <span className="text-xl font-bold text-gray-900">HealthPredict</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  About
                </Link>
                <Link to="/predict" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all duration-300">
                  Test Now
                </Link>
                <Link to="/chat" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors duration-200">
                  <MessageCircle className="h-4 w-4" />
                  <span>Help Chat</span>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/predict"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Test Now
                </Link>
                <Link
                  to="/chat"
                  className="block-flex px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 flex items-center space-x-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Help Chat</span>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <div className="pt-16 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/predict" element={<PredictionForm />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </div>

        {/* Footer - Hidden on chat page */}
        <FooterWrapper />
      </div>
    </Router>
  );
}

// Footer wrapper component to handle conditional rendering
function FooterWrapper() {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';
  
  return !isChatPage ? <Footer /> : null;
}

export default App;