import { Brain, Heart, Users } from 'lucide-react';

function About() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=3840")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About HealthPredict</h1>
          <p className="text-xl md:text-2xl">
            Revolutionizing kidney disease detection through AI
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're dedicated to making early kidney disease detection accessible to everyone through 
              advanced artificial intelligence and machine learning technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Brain className="h-12 w-12 text-blue-600" />,
                title: "AI-Powered Analysis",
                description: "Our system uses state-of-the-art machine learning algorithms to analyze medical data"
              },
              {
                icon: <Heart className="h-12 w-12 text-blue-600" />,
                title: "Early Detection",
                description: "Identifying potential kidney issues before they become serious health concerns"
              },
              {
                icon: <Users className="h-12 w-12 text-blue-600" />,
                title: "Accessibility",
                description: "Making advanced medical prediction tools available to everyone"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Using advanced machine learning models trained on extensive medical datasets to provide 
              accurate predictions and early detection of kidney disease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">1.</span>
                  <span>Input your medical parameters and test results</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">2.</span>
                  <span>Our AI analyzes the data using advanced algorithms</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">3.</span>
                  <span>Receive instant predictions and risk assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">4.</span>
                  <span>Get recommendations for next steps</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accuracy & Reliability</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">✓</span>
                  <span>Trained on extensive medical datasets</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">✓</span>
                  <span>Regularly updated with latest medical research</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">✓</span>
                  <span>Validated by healthcare professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">✓</span>
                  <span>Continuous improvement through machine learning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;