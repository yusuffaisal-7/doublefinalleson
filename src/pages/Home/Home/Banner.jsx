// import React from 'react';
// import img2 from "../../../assets/img-02.png";

// const Banner = () => {
//     return (
//         <div className="w-full bg-gradient-to-r from-blue-800 to-teal-700 text-white py-16 px-4">
//             <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
//                 <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
//                     <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
//                     <p className="text-lg mb-6">Discover amazing features and join our community today!</p>
//                     <button className="btn bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-full">
//                         Get Started
//                     </button>
//                 </div>
//                 <div className="md:w-1/2 flex justify-center">
//                     <img src={img2} alt="Banner Illustration" className="w-full max-w-sm h-auto" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Banner;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLanguage } from '../../../providers/LanguageProvider';
import img2 from "../../../assets/hero_img-Photoroom.png";

const Banner = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = [
    translate('findTeacher'),
    translate('learnAnywhere'),
    translate('growSkills')
  ];

  useEffect(() => {
    let timer;
    const word = words[currentIndex];

    if (!isDeleting && displayText === word) {
      // Pause at end of word
      timer = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(100);
      }, 2000);
    } else if (isDeleting && displayText === '') {
      // Move to next word
      setIsDeleting(false);
      setCurrentIndex((current) => (current + 1) % words.length);
      setTypingSpeed(150);
    } else {
      timer = setTimeout(() => {
        setDisplayText(prev => 
          isDeleting 
            ? prev.slice(0, -1)
            : word.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, words, typingSpeed]);

  const handleJoinClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="w-full bg-white py-8 sm:py-12 md:py-16 min-h-[calc(100vh-100px)] flex items-center">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-[1920px] mx-auto">
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6 md:space-y-8 md:pr-8 lg:pr-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
              {translate('transformingEducation')} <span className="text-blue-500">{translate('inHaiti')}</span>
            </h1>
            <div className="w-full">
              <span className="inline-block bg-[#DA3A60] text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold rounded-2xl">
                {displayText}
                <span className="typing-cursor"></span>
              </span>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl">
              {translate('buildingBridges')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start pt-4">
              <button 
                onClick={handleJoinClick}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl"
              >
                {translate('getStarted')}
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
            <img 
              src={img2} 
              alt="Education Illustration" 
              className="w-full h-auto max-w-4xl mx-auto transform scale-125 hover:scale-120 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;