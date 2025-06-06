


// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FaUserPlus, FaClipboardCheck, FaChalkboardTeacher, FaMoneyBillWave, 
//   FaCertificate, FaClock, FaHandshake, FaGraduationCap, FaLaptop, FaChartLine 
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useLanguage } from '../../providers/LanguageProvider';
// import imgg1 from '../../assets/Become.jpg';
// import imgg2 from '../../assets/FindTeacher.jpg';
// import imgg3 from '../../assets/Become2.jpg';
// import imgg4 from '../../assets/Become3.jpg';

// const BecomeTeacherGuide = () => {
//   const { translate } = useLanguage();

//   const steps = [
//     {
//       icon: <FaUserPlus className="text-4xl text-[#DA3A60]" />,
//       title: translate('buildProfile'),
//       description: translate('buildProfileDesc'),
//       image: imgg1,
//       animation: { x: [-100, 0], opacity: [0, 1] }
//     },
//     {
//       icon: <FaClipboardCheck className="text-4xl text-[#70C5D7]" />,
//       title: translate('qualityVerification'),
//       description: translate('qualityVerificationDesc'),
//       image: imgg2,
//       animation: { y: [100, 0], opacity: [0, 1] }
//     },
//     {
//       icon: <FaChalkboardTeacher className="text-4xl text-[#FCBB45]" />,
//       title: translate('customizeTeaching'),
//       description: translate('customizeTeachingDesc'),
//       image: imgg3,
//       animation: { x: [100, 0], opacity: [0, 1] }
//     },
//     {
//       icon: <FaMoneyBillWave className="text-4xl text-[#DA3A60]" />,
//       title: translate('startJourney'),
//       description: translate('startJourneyDesc'),
//       image: imgg4,
//       animation: { y: [-100, 0], opacity: [0, 1] }
//     }
//   ];

//   const benefits = [
//     {
//       icon: <FaCertificate className="text-[#DA3A60]" />,
//       title: translate('professionalGrowth'),
//       description: translate('professionalGrowthDesc')
//     },
//     {
//       icon: <FaLaptop className="text-[#70C5D7]" />,
//       title: translate('teachingTools'),
//       description: translate('teachingToolsDesc')
//     },
//     {
//       icon: <FaChartLine className="text-[#FCBB45]" />,
//       title: translate('careerDevelopment'),
//       description: translate('careerDevelopmentDesc')
//     }
//   ];

//   const features = [
//     {
//       title: translate('flexibleSchedule'),
//       value: "100%",
//       description: translate('flexibleScheduleDesc')
//     },
//     {
//       title: translate('platformSupport'),
//       value: "24/7",
//       description: translate('platformSupportDesc')
//     },
//     {
//       title: translate('earningPotential'),
//       value: "$50+/hr",
//       description: translate('earningPotentialDesc')
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
//       {/* Hero Section with Animated Background */}
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7] opacity-5"></div>
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-64 h-64 bg-[#DA3A60] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
//           <div className="absolute top-0 right-0 w-64 h-64 bg-[#70C5D7] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
//           <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-[#FCBB45] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
//         </div>
        
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="relative py-24 px-6"
//         >
//           <div className="max-w-7xl mx-auto text-center">
//             <motion.div
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8 }}
//               className="mb-12"
//             >
//               <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text">
//                 {translate('becomeExpertTeacher')}
//               </h1>
//               <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//                 {translate('becomeTeacherDesc')}
//               </p>
//             </motion.div>

//             {/* Quick Stats */}
//             <motion.div 
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
//             >
//               {features.map((feature, index) => (
//                 <div key={index} className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="text-4xl font-bold text-[#DA3A60] mb-2">{feature.value}</div>
//                   <div className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</div>
//                   <div className="text-gray-600">{feature.description}</div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Steps Section with Enhanced Visual Design */}
//       <div className="max-w-7xl mx-auto px-6 py-24">
//         <div className="text-center mb-20">
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text"
//           >
//             {translate('teachingJourneyBegins')}
//           </motion.h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-[#005482] to-[#70C5D7] mx-auto rounded-full"></div>
//         </div>
        
//         <div className="space-y-32">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, ...step.animation }}
//               whileInView={{ opacity: 1, x: 0, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1 }}
//               className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
//             >
//               <div className="flex-1 text-center md:text-left">
//                 <div className="inline-block p-4 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-xl mb-8">
//                   {step.icon}
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-800 mb-6">{step.title}</h3>
//                 <p className="text-xl text-gray-600 leading-relaxed">{step.description}</p>
//               </div>
              
//               <div className="flex-1">
//                 <div className="relative group">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-[#DA3A60] to-[#70C5D7] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
//                   <img
//                     src={step.image}
//                     alt={step.title}
//                     className="relative rounded-lg shadow-2xl w-full transform group-hover:scale-[1.02] transition duration-500"
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Benefits Section with Modern Design */}
//       <motion.div 
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="bg-white py-24 px-6"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-20">
//             <motion.h2 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text"
//             >
//               {translate('teachingBenefits')}
//             </motion.h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-[#005482] to-[#70C5D7] mx-auto rounded-full"></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             {benefits.map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.2 }}
//                 className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="text-5xl mb-6">
//                   {benefit.icon}
//                 </div>
//                 <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
//                 <p className="text-gray-600 text-lg">{benefit.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       {/* Enhanced CTA Section */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className="relative overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7]"></div>
//         <div className="relative max-w-4xl mx-auto text-center py-24 px-6">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
//             {translate('readyToTeach')}
//           </h2>
//           <p className="text-xl text-white/90 mb-12 leading-relaxed">
//             {translate('joinTeacherCommunity')}
//           </p>
//           <div className="flex flex-col md:flex-row gap-6 justify-center">
//             <Link 
//               to="/signup"
//               className="px-8 py-4 bg-[#DA3A60] text-white rounded-full text-lg font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               {translate('applyAsTeacher')}
//             </Link>
//             <Link 
//               to="/about"
//               className="px-8 py-4 bg-white text-[#005482] rounded-full text-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               {translate('learnMoreTeaching')}
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default BecomeTeacherGuide; 


import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserPlus, FaClipboardCheck, FaChalkboardTeacher, FaMoneyBillWave, 
  FaCertificate, FaClock, FaHandshake, FaGraduationCap, FaLaptop, FaChartLine 
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../providers/LanguageProvider';
import { AuthContext } from '../../providers/AuthProvider';
import imgg1 from '../../assets/Become.jpg';
import imgg2 from '../../assets/FindTeacher.jpg';
import imgg3 from '../../assets/Become2.jpg';
import imgg4 from '../../assets/Become3.jpg';

const BecomeTeacherGuide = () => {
  const { translate } = useLanguage();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleApplyTeacher = () => {
    if (user) {
      navigate('/dashboard/joinTeacher');
    } else {
      navigate('/login');
    }
  };

  const steps = [
    {
      icon: <FaUserPlus className="text-4xl text-[#DA3A60]" />,
      title: translate('buildProfile'),
      description: translate('buildProfileDesc'),
      image: imgg1,
      animation: { x: [-100, 0], opacity: [0, 1] }
    },
    {
      icon: <FaClipboardCheck className="text-4xl text-[#70C5D7]" />,
      title: translate('qualityVerification'),
      description: translate('qualityVerificationDesc'),
      image: imgg2,
      animation: { y: [100, 0], opacity: [0, 1] }
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl text-[#FCBB45]" />,
      title: translate('customizeTeaching'),
      description: translate('customizeTeachingDesc'),
      image: imgg3,
      animation: { x: [100, 0], opacity: [0, 1] }
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-[#DA3A60]" />,
      title: translate('startJourney'),
      description: translate('startJourneyDesc'),
      image: imgg4,
      animation: { y: [-100, 0], opacity: [0, 1] }
    }
  ];

  const benefits = [
    {
      icon: <FaCertificate className="text-[#DA3A60]" />,
      title: translate('professionalGrowth'),
      description: translate('professionalGrowthDesc')
    },
    {
      icon: <FaLaptop className="text-[#70C5D7]" />,
      title: translate('teachingTools'),
      description: translate('teachingToolsDesc')
    },
    {
      icon: <FaChartLine className="text-[#FCBB45]" />,
      title: translate('careerDevelopment'),
      description: translate('careerDevelopmentDesc')
    }
  ];

  const features = [
    {
      title: translate('flexibleSchedule'),
      value: "100%",
      description: translate('flexibleScheduleDesc')
    },
    {
      title: translate('platformSupport'),
      value: "24/7",
      description: translate('platformSupportDesc')
    },
    {
      title: translate('earningPotential'),
      value: "$50+/hr",
      description: translate('earningPotentialDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7] opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#DA3A60] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#70C5D7] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-[#FCBB45] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-24 px-6"
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text">
                {translate('becomeExpertTeacher')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {translate('becomeTeacherDesc')}
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold text-[#DA3A60] mb-2">{feature.value}</div>
                  <div className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</div>
                  <div className="text-gray-600">{feature.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Steps Section with Enhanced Visual Design */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text"
          >
            {translate('teachingJourneyBegins')}
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#005482] to-[#70C5D7] mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, ...step.animation }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
            >
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block p-4 rounded-full bg-gradient-to-r from-gray-50 to-white shadow-xl mb-8">
                  {step.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">{step.title}</h3>
                <p className="text-xl text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#DA3A60] to-[#70C5D7] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="relative rounded-lg shadow-2xl w-full transform group-hover:scale-[1.02] transition duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section with Modern Design */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text"
            >
              {translate('teachingBenefits')}
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#005482] to-[#70C5D7] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600 text-lg">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7]"></div>
        <div className="relative max-w-4xl mx-auto text-center py-24 px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {translate('readyToTeach')}
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            {translate('joinTeacherCommunity')}
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button 
              onClick={handleApplyTeacher}
              className="px-8 py-4 bg-[#DA3A60] text-white rounded-full text-lg font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {translate('applyAsTeacher')}
            </button>
            <Link 
              to="/about"
              className="px-8 py-4 bg-white text-[#005482] rounded-full text-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {translate('learnMoreTeaching')}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BecomeTeacherGuide; 