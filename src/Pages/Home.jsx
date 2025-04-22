/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useCallback, memo, Suspense } from "react"
import { Github, Linkedin, Mail, ExternalLink, Sparkles } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Model from '../components/Model'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#53f79a] to-[#169875] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-5 sm:px-4 py-2 rounded-full bg-black backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#53f79a] to-[#169875] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-green-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#53f79a] to-[#169875] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Frontend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#53f79a] to-[#169875] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#53f79a] to-[#169875] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4ee18e] to-[#178769] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#53f79a]/20 to-[#169875]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4ee18e] to-[#178769] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Software Engineer", "Frontend Developer", "Web Designer"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/iAli-Ak/" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/alialkhatam/" },
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering 
        ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2" 
        : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
    }`
  };

  return (
    <div className="min-h-screen bg-[#212121] overflow-hidden" id="Home">
  <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="w-full grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-0">
        {/* Left Column */}
        <div className="w-full space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-left order-1 lg:order-1"
          data-aos="fade-right"
          data-aos-delay="200">
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <StatusBadge />

            {/* Responsive Main Title */}
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-gradient-to-r from-[#53f79a] to-[#169875] blur-2xl opacity-20"></span>
                  <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    Frontend
                  </span>
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="absolute -inset-2 bg-gradient-to-r from-[#53f79a] to-[#169875] blur-2xl opacity-20"></span>
                  <span className="relative bg-gradient-to-r from-[#53f79a] to-[#169875] bg-clip-text text-transparent">
                    Developer
                  </span>
                </span>
              </h1>
            </div>

            {/* Typing Effect */}
            <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
              <span className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                {text}
              </span>
              <span className="w-[2px] sm:w-[3px] h-5 sm:h-6 bg-gradient-to-t from-[#1dcd9e] to-[#169875] ml-1 animate-blink"></span>
            </div>

            {/* Responsive Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-full sm:max-w-xl leading-relaxed font-light"
              data-aos="fade-up"
              data-aos-delay="1000">
              Creating innovative, functional, and user-friendly websites for digital solutions.
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
              {TECH_STACK.map((tech, index) => (
                <TechStack key={index} tech={tech} className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2" />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
              <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} className="w-full sm:w-[160px] h-10 sm:h-11 text-sm sm:text-base" />
              <CTAButton href="#Contact" text="Contact" icon={Mail} className="w-full sm:w-[160px] h-10 sm:h-11 text-sm sm:text-base" />
            </div>

            {/* Social Links */}
            <div className="flex sm:hidden gap-3 justify-start" data-aos="fade-up" data-aos-delay="1600">
              {SOCIAL_LINKS.map((social, index) => (
                <SocialLink key={index} {...social} className="p-2" />
              ))}
            </div>
            <div className="hidden sm:flex gap-3 justify-start" data-aos="fade-up" data-aos-delay="1600">
              {SOCIAL_LINKS.map((social, index) => (
                <SocialLink key={index} {...social} className="p-2 sm:p-3" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 3D Model */}
        <div className="w-full h-[50vh] sm:h-[60vh] lg:h-auto flex items-center justify-center order-2 lg:order-2">
          <div className="w-full max-w-[600px] aspect-square relative">
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <Model />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default memo(Home);