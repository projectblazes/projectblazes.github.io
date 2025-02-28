import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
// Replace these imports with your actual images
import image1 from '../assets/img/image1.png';
import image2 from '../assets/img/image2.png';
import image3 from '../assets/img/image3.png';
import image4 from '../assets/img/image4.png';
import headerImage from '../assets/img/header.png';

const VRIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h.01M7 12h.01M11 12h.01M15 12h.01M19 12h.01" />
    <rect x="2" y="6" width="20" height="12" rx="2" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189z"/>
  </svg>
);

interface AnimatedTextProps {
  text: string;
  className: string;
  delay?: number;
}

const AnimatedText = ({ text, className, delay = 0 }: AnimatedTextProps) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i }
    })
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };
  
  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const Welcome: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const isMobile = dimensions.width < 768;
    
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
    
    const mouseXPercent = dimensions.width ? mousePosition.x / dimensions.width : 0;
    const mouseYPercent = dimensions.height ? mousePosition.y / dimensions.height : 0;
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    
    const smoothProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 400 });
    const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
    const heroY = useTransform(smoothProgress, [0, 0.25], ['0%', '-30%']);
    const contentOpacity = useTransform(smoothProgress, [0.15, 0.3], [0, 1]);
    const contentY = useTransform(smoothProgress, [0.15, 0.3], ['50px', '0px']);
    
    const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '30%']);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div ref={containerRef} className="relative min-h-[200vh] bg-black overflow-hidden">
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

            {/* Header with Navigation and Social Links */}
            <motion.header 
                className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 flex justify-between items-center"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Logo with significantly increased size */}
                <motion.div 
                    className="flex items-center"
                    whileHover={{ scale: 1.1 }}
                >
                    <img 
                        src={headerImage} 
                        alt="Project Blaze" 
                        className="h-10 md:h-14"
                    />
                </motion.div>
                
                {/* Tickets Button - Center of Header */}
                <motion.div
                    className="hidden md:block absolute left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link to="/tickets">
                        <motion.button
                            className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg text-white font-medium flex items-center hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-red-500/20"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 5v2" />
                                <path d="M15 11v2" />
                                <path d="M15 17v2" />
                                <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" />
                            </svg>
                            Tickets
                        </motion.button>
                    </Link>
                </motion.div>
                
                {/* Mobile menu button */}
                <motion.button
                    className="md:hidden text-white p-2 z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    {mobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </motion.button>
                
                {/* Mobile menu overlay */}
                {mobileMenuOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex flex-col items-center space-y-8">
                            <motion.a
                                href="https://www.meta.com/experiences/7199026436861364/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white font-bold text-lg flex items-center hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-red-500/30"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <DownloadIcon />
                                Download Now
                            </motion.a>
                            
                            {/* Tickets Button for Mobile */}
                            <Link to="/tickets">
                                <motion.div
                                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white font-bold text-lg flex items-center hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-red-500/30"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 5v2" />
                                        <path d="M15 11v2" />
                                        <path d="M15 17v2" />
                                        <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" />
                                    </svg>
                                    Tickets
                                </motion.div>
                            </Link>
                            
                            <div className="flex items-center space-x-8 mt-8">
                                <motion.a 
                                    href="https://www.youtube.com/@ProjectBlazeOffical" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-red-500 transition-colors duration-300"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <YoutubeIcon />
                                </motion.a>
                                <motion.a 
                                    href="https://www.tiktok.com/@projectblazegame" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-blue-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <TiktokIcon />
                                </motion.a>
                                <motion.a 
                                    href="https://discord.gg/projectblaze" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-indigo-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <DiscordIcon />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                )}
                
                {/* Desktop Social Media Links */}
                <div className="hidden md:flex items-center space-x-4">
                    <motion.a 
                        href="https://www.youtube.com/@ProjectBlazeOffical" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-red-500 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <YoutubeIcon />
                    </motion.a>
                    <motion.a 
                        href="https://www.tiktok.com/@projectblazegame" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-blue-400 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <TiktokIcon />
                    </motion.a>
                    <motion.a 
                        href="https://discord.gg/projectblaze" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-indigo-400 transition-colors duration-300"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <DiscordIcon />
                    </motion.a>
                    <motion.a
                        href="https://www.meta.com/experiences/7199026436861364/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg text-white text-sm font-medium hidden md:flex items-center hover:from-red-700 hover:to-orange-700 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <DownloadIcon />
                        Download
                    </motion.a>
                </div>
            </motion.header>

            {/* Hero Content */}
            <motion.div 
                className="relative z-10 h-screen flex flex-col items-center justify-center px-4"
                style={{ opacity: heroOpacity, y: heroY }}
            >
                {/* NEW Badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="mb-4 md:mb-6"
                >
                    <span className="px-3 py-1 md:px-4 md:py-1 bg-red-500/20 backdrop-blur-md text-white text-xs md:text-sm font-bold rounded-full inline-flex items-center shadow-lg border border-red-500/30">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mr-1.5 md:mr-2 animate-pulse"></span>
                        NEW UPDATE
                    </span>
                </motion.div>

                {/* Main Title with cascading text animation - smaller on mobile */}
                <AnimatedText 
                    text="Project Blaze"
                    className="text-5xl sm:text-7xl md:text-9xl font-black mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-[0_0_15px_rgba(255,100,0,0.5)] flex"
                    delay={0.2}
                />

                {/* Subtitle with cascading text animation */}
                <div className="relative mb-8 md:mb-12">
                    <AnimatedText 
                        text="The ultimate VR experience"
                        className="text-lg md:text-2xl text-white/90 flex flex-wrap justify-center"
                        delay={0.6}
                    />
                    <motion.span 
                        className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    />
                </div>

                {/* CTA Button - Visible on mobile too */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex flex-col items-center"
                >
                    <motion.a
                        href="https://www.meta.com/experiences/7199026436861364/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white font-bold text-base md:text-lg flex items-center hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/30 mb-4 md:mb-6"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <DownloadIcon />
                        Download Now
                    </motion.a>
                    
                    {/* Gorilla Tag Logo - Smaller on mobile */}
                    <motion.a
                        href="https://www.meta.com/experiences/7199026436861364/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        className="mt-2 md:mt-4"
                    >
                        <img 
                            src="https://cdn.prod.website-files.com/634dcd98720fb26a457ae36f/636157e8bc53e88b65f3d4cf_Gorilla%20Tag%20Icons%20(3).webp" 
                            alt="Gorilla Tag Logo" 
                            className="h-20 sm:h-24 md:h-40"
                        />
                    </motion.a>
                </motion.div>

                {/* Scroll indicator - Smaller on mobile */}
                <motion.div 
                    className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 1 }}
                >
                    <div className="flex flex-col items-center">
                        <p className="text-white/70 text-xs md:text-sm mb-1 md:mb-2">Scroll to explore</p>
                        <motion.div 
                            className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <motion.div 
                                className="w-1 h-1.5 md:w-1 md:h-2 bg-white/70 rounded-full"
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scrollable Content Section */}
            <motion.section 
                className="relative z-10 min-h-screen pt-16 md:pt-20 px-4 mt-screen"
                style={{ opacity: contentOpacity, y: contentY }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Section title with cascading text animation */}
                    <div className="mb-10 md:mb-16 text-center">
                        <AnimatedText 
                            text="Game Features"
                            className="text-4xl md:text-5xl font-bold text-white flex justify-center"
                            delay={0.1}
                        />
                    </div>

                    {/* Feature Cards - Single column on mobile, three columns on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
                        {[
                            { icon: <VRIcon />, title: "VR Ready", desc: "Immersive virtual reality experience with full motion tracking and haptic feedback." },
                            { icon: <StarIcon />, title: "New Update", desc: "Latest features including new maps, characters, and gameplay mechanics." },
                            { icon: <TrophyIcon />, title: "Multiplayer", desc: "Compete or cooperate with friends in real-time multiplayer modes." }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="p-8 rounded-2xl bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-lg border border-red-500/10 hover:border-red-500/30 transition-all duration-300 group"
                            >
                                <div className="text-red-400 mb-6 group-hover:text-red-300 transition-colors duration-300">
                                    {feature.icon}
                                </div>
                                <AnimatedText 
                                    text={feature.title}
                                    className="text-2xl font-bold text-white mb-4 flex"
                                    delay={0.2 + (index * 0.1)}
                                />
                                <p className="text-gray-300">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Game Screenshots - Improved mobile layout */}
                    <motion.div 
                        className="mb-16 md:mb-20"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-8 md:mb-10 text-center">
                            <AnimatedText 
                                text="Game Screenshots"
                                className="text-3xl md:text-4xl font-bold text-white flex justify-center"
                                delay={0.1}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                            {[
                                image1, 
                                image2, 
                                image3, 
                                image4
                            ].map((image, index) => (
                                <motion.div 
                                    key={index}
                                    className="rounded-xl overflow-hidden cursor-pointer relative group aspect-[4/3]"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img 
                                        src={image} 
                                        alt={`Game Screenshot ${index + 1}`} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                                        <span className="text-white text-sm font-medium">Click to enlarge</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    
                    {/* Mobile-specific footer */}
                    <div className="md:hidden pb-10">
                        <div className="flex flex-col items-center">
                            <motion.a
                                href="https://www.meta.com/experiences/7199026436861364/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white font-bold text-base flex items-center hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/30 mb-6"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <DownloadIcon />
                                Download Now
                            </motion.a>
                            
                            <div className="flex items-center space-x-6 mt-4">
                                <motion.a 
                                    href="https://www.youtube.com/@ProjectBlazeOffical" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-red-500 transition-colors duration-300"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <YoutubeIcon />
                                </motion.a>
                                <motion.a 
                                    href="https://www.tiktok.com/@projectblazegame" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-blue-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <TiktokIcon />
                                </motion.a>
                                <motion.a 
                                    href="https://discord.gg/projectblaze" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white/70 hover:text-indigo-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <DiscordIcon />
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Image Modal - Improved for mobile */}
            {selectedImage && (
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-2 md:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div 
                        className="relative max-w-full md:max-w-4xl max-h-[90vh]"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedImage} 
                            alt="Game Screenshot" 
                            className="max-w-full max-h-[80vh] md:max-h-[90vh] object-contain rounded-lg"
                        />
                        <button 
                            className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/70 flex items-center justify-center text-white"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Welcome;