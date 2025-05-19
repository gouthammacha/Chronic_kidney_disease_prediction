import { useNavigate } from 'react-router-dom';
import { Activity, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=3840")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Early Detection Saves Lives
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Advanced AI-powered kidney disease prediction system
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/predict')}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Start Your Test Now
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600">
              Advanced technology meets healthcare expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="h-12 w-12 text-blue-600" />,
                title: "Accurate Predictions",
                description: "Our AI model is trained on extensive medical data to provide reliable predictions"
              },
              {
                icon: <Zap className="h-12 w-12 text-blue-600" />,
                title: "Instant Results",
                description: "Get your prediction results immediately after submitting your test data"
              },
              {
                icon: <Shield className="h-12 w-12 text-blue-600" />,
                title: "Secure & Private",
                description: "Your health data is protected with enterprise-grade security measures"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 p-8 rounded-xl text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;