import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

// Define ticket types with their specific questions
const ticketTypes = [
  { 
    id: 'bug', 
    label: 'Bug Report',
    questions: [
      { id: 'bugDescription', label: "What's your bug?", type: 'textarea' }
    ]
  },
  { 
    id: 'purchase', 
    label: 'Purchase Support',
    questions: [
      { id: 'stripeOrderId', label: "What is your stripe order ID?", type: 'text' },
      { id: 'playfabId', label: "What is your in-game playfab ID?", type: 'text' }
    ]
  },
  { 
    id: 'ban', 
    label: 'Ban Appeal',
    questions: [
      { id: 'banReason', label: "Why were you banned?", type: 'textarea' },
      { id: 'unbanReason', label: "Why should we unban you?", type: 'textarea' },
      { id: 'gameId', label: "What was your in-game name or what is your Playfab ID?", type: 'text' }
    ]
  },
  { 
    id: 'other', 
    label: 'Other',
    questions: [
      { id: 'description', label: "How can we help you?", type: 'textarea' }
    ]
  }
];

const Tickets: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Background animation states
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateDimensions);
    
    updateDimensions();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Reset form data when ticket type changes
  useEffect(() => {
    setFormData({});
  }, [selectedType]);
  
  const mouseXPercent = dimensions.width ? mousePosition.x / dimensions.width : 0;
  const mouseYPercent = dimensions.height ? mousePosition.y / dimensions.height : 0;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 400 });
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;
    
    setIsSubmitting(true);
    
    // Get the ticket type and its questions
    const ticketType = ticketTypes.find(t => t.id === selectedType);
    if (!ticketType) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Format the description with questions and answers
      let formattedDescription = '';
      
      ticketType.questions.forEach(question => {
        const answer = formData[question.id] || 'No answer provided';
        formattedDescription += `**${question.label}**\n${answer}\n\n`;
      });
      
      // Prepare the webhook payload
      const webhookData = {
        embeds: [{
          title: `New Ticket: ${ticketType.label}`,
          description: formattedDescription,
          color: 16750848, // Orange color in decimal (FF9900 in hex)
          timestamp: new Date().toISOString(),
          footer: {
            text: "Project Blaze Ticket System"
          }
        }]
      };
      
      // Send the data to Discord webhook - using the new webhook URL
      const response = await fetch('https://discord.com/api/webhooks/1345181769556819979/Fa1QyV6F30sOrPBFqHzmJg_lvRSWT4v4fKNO2Z6uXhePyVAOyDCP4pX3iN-qQiJGMcw-', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });
      
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || '5';
        const waitTime = parseInt(retryAfter, 10) * 1000;
        
        // Show a more specific error message
        console.log(`Rate limited. Retry after ${waitTime/1000} seconds.`);
        
        // Wait and retry automatically
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        // Try again
        const retryResponse = await fetch('https://discord.com/api/webhooks/1345181769556819979/Fa1QyV6F30sOrPBFqHzmJg_lvRSWT4v4fKNO2Z6uXhePyVAOyDCP4pX3iN-qQiJGMcw-', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });
        
        if (!retryResponse.ok) {
          throw new Error('Failed to submit ticket after retry');
        }
      } else if (!response.ok) {
        throw new Error('Failed to submit ticket');
      }
      
      // Show success state
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setSelectedType(null);
        setFormData({});
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setIsSubmitting(false);
      // You could add error handling UI here
      alert('There was an error submitting your ticket. Please try again.');
    }
  };

  // Get questions for the selected ticket type
  const questions = selectedType 
    ? ticketTypes.find(t => t.id === selectedType)?.questions || []
    : [];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Fixed Background that stays throughout the page */}
      <div className="fixed inset-0 z-0">
        {/* Dark base */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Interactive gradient that follows mouse */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mouseXPercent * 100}% ${mouseYPercent * 100}%, rgba(220, 38, 38, 0.3) 0%, rgba(0, 0, 0, 0) 50%)`,
          }}
        />
        
        {/* Game image with dark overlay */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: `url(https://media.discordapp.net/attachments/1328569259256975434/1344462339109556296/image.png)`,
            filter: 'brightness(0.7) contrast(1.2)',
            y: backgroundY
          }}
        />
        
        {/* Interactive grid lines */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Horizontal lines */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute w-full h-[1px] bg-red-500/10"
              style={{ 
                top: `${(i + 1) * 10}%`,
                scaleX: 1 + (mouseYPercent - 0.5) * 0.1,
                transformOrigin: mouseXPercent > 0.5 ? 'left' : 'right'
              }}
            />
          ))}
          
          {/* Vertical lines */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute h-full w-[1px] bg-red-500/10"
              style={{ 
                left: `${(i + 1) * 10}%`,
                scaleY: 1 + (mouseXPercent - 0.5) * 0.1,
                transformOrigin: mouseYPercent > 0.5 ? 'top' : 'bottom'
              }}
            />
          ))}
        </div>
        
        {/* Interactive particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const x = i % 6 * 20;
            const y = Math.floor(i / 6) * 20;
            
            return (
              <motion.div
                key={`p-${i}`}
                className="absolute w-1 h-1 rounded-full bg-red-500/30"
                style={{ 
                  left: `${x}%`, 
                  top: `${y}%`,
                  x: (mouseXPercent - 0.5) * (i % 3 === 0 ? -20 : 20),
                  y: (mouseYPercent - 0.5) * (i % 2 === 0 ? -20 : 20),
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
        
        {/* Animated glow spots */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`glow-${i}`}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(220, 38, 38, 0.2) 0%, rgba(0, 0, 0, 0) 70%)`,
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                x: (mouseXPercent - 0.5) * -30 * (i + 1),
                y: (mouseYPercent - 0.5) * -30 * (i + 1),
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              Submit a Ticket
            </h1>
            <p className="text-lg text-gray-300">
              Need help or have a suggestion? Let us know!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-lg border border-red-500/10 rounded-2xl p-6 md:p-8"
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Ticket Submitted!</h2>
                <p className="text-gray-300">Thank you for your submission. We'll get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <label className="block text-gray-300 mb-2">Ticket Type</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-left flex justify-between items-center text-white hover:border-red-500/50 transition-colors"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className={selectedType ? "text-white" : "text-gray-400"}>
                        {selectedType ? ticketTypes.find(t => t.id === selectedType)?.label : 'Select ticket type'}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform text-red-400 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-1 bg-black/90 border border-red-500/30 rounded-lg overflow-hidden shadow-lg shadow-red-500/10"
                      >
                        {ticketTypes.map(type => (
                          <button
                            key={type.id}
                            type="button"
                            className="w-full px-4 py-3 text-left text-white hover:bg-red-500/20 transition-colors"
                            onClick={() => {
                              setSelectedType(type.id);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {type.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>

                {selectedType && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {questions.map((question) => (
                      <div key={question.id}>
                        <label htmlFor={question.id} className="block text-gray-300 mb-2">{question.label}</label>
                        {question.type === 'textarea' ? (
                          <textarea
                            id={question.id}
                            name={question.id}
                            value={formData[question.id] || ''}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:outline-none focus:border-red-500 resize-none"
                            placeholder={`Enter your ${question.label.toLowerCase()}`}
                          ></textarea>
                        ) : (
                          <input
                            type="text"
                            id={question.id}
                            name={question.id}
                            value={formData[question.id] || ''}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:outline-none focus:border-red-500"
                            placeholder={`Enter your ${question.label.toLowerCase()}`}
                          />
                        )}
                      </div>
                    ))}
                    
                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white font-bold text-lg flex items-center justify-center hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-red-500/30"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : null}
                        {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link 
              to="/" 
              className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tickets; 