

// import React, { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import { useMutation } from '@tanstack/react-query';
// import { AuthContext } from '../../providers/AuthProvider';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   FaChalkboardTeacher,
//   FaGraduationCap,
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
// } from 'react-icons/fa';

// const PostJob = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const mutation = useMutation({
//     mutationFn: (data) => axiosSecure.post('/jobs', data),
//     onSuccess: () => {
//       Swal.fire('Success', 'Job posted successfully!', 'success');
//       reset();
//       navigate('/dashboard');
//     },
//     onError: (error) => {
//       if (error.response?.status === 402) {
//         Swal.fire({
//           title: 'Payment Required',
//           text: 'You have posted 3 jobs. Please pay a $10 fee to continue.',
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonText: 'Pay $10',
//         });
//       } else {
//         Swal.fire('Error', error.response?.data?.message || 'Failed to post job', 'error');
//       }
//     },
//   });

//   const onSubmit = (data) => {
//     const jobData = {
//       ...data,
//       email: user?.email,
//       postedAt: new Date(),
//     };
//     mutation.mutate(jobData);
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FBFF] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto"
//       >
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 flex items-center justify-center bg-[#DA3A60]/10 rounded-xl">
//               <FaChalkboardTeacher className="text-[#DA3A60] text-2xl" />
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#005482]">Post a Teaching Job</h2>
//           </div>
//           <p className="text-[#70C5D7] text-lg">Fill out the details below to find your perfect tutor</p>
//         </div>

//         {/* Form Section */}
//         <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Subject and Grade Level */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {/* Subject */}
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Subject</label>
//                 <div className="relative">
//                   <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('subject', { required: 'Subject is required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select a subject</option>
//                     <option value="Math">Math</option>
//                     <option value="Science">Science</option>
//                     <option value="English">English</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 {errors.subject && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.subject.message}</span>}
//               </div>

//               {/* Grade Level */}
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Grade Level</label>
//                 <div className="relative">
//                   <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('gradeLevel', { required: 'Grade level is required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select grade/level</option>
//                     <option value="Grade 1-5">Grade 1-5</option>
//                     <option value="Grade 6-8">Grade 6-8</option>
//                     <option value="Grade 9-12">Grade 9-12</option>
//                     <option value="College">College</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 {errors.gradeLevel && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.gradeLevel.message}</span>}
//               </div>
//             </div>

//             {/* Topics and Goals */}
//             <div>
//               <label className="block text-sm font-medium text-[#005482] mb-2">Topics or Goals</label>
//               <textarea
//                 {...register('topicsGoals', { required: 'Topics or goals are required' })}
//                 rows="4"
//                 className="w-full px-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                 placeholder="Describe the specific topics you need help with or your learning goals"
//               />
//               {errors.topicsGoals && (
//                 <span className="text-[#DA3A60] text-sm mt-1 block">{errors.topicsGoals.message}</span>
//               )}
//             </div>

//             {/* Mode of Learning */}
//             <div className="bg-[#70C5D7]/10 p-6 rounded-xl">
//               <label className="block text-sm font-medium text-[#005482] mb-4">Preferred Mode of Learning</label>
//               <div className="flex flex-wrap gap-4">
//                 {['Online', 'Offline', 'Either'].map((mode) => (
//                   <label
//                     key={mode}
//                     className="flex items-center p-3 bg-white rounded-lg cursor-pointer border border-[#70C5D7]/20 hover:border-[#70C5D7] transition-colors"
//                   >
//                     <input
//                       type="radio"
//                       {...register('modeOfLearning', { required: 'Mode of learning is required' })}
//                       value={mode}
//                       className="mr-2"
//                     />
//                     <span className="text-[#005482]">{mode}</span>
//                   </label>
//                 ))}
//               </div>
//               {errors.modeOfLearning && (
//                 <span className="text-[#DA3A60] text-sm mt-2 block">{errors.modeOfLearning.message}</span>
//               )}
//             </div>

//             {/* Schedule and Budget */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Sessions per Week</label>
//                 <div className="relative">
//                   <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('sessionsPerWeek', { required: 'Sessions per week are required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select number</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5+">5+</option>
//                   </select>
//                 </div>
//                 {errors.sessionsPerWeek && (
//                   <span className="text-[#DA3A60] text-sm mt-1 block">{errors.sessionsPerWeek.message}</span>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Budget (per hour)</label>
//                 <div className="relative">
//                   <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <input
//                     type="number"
//                     {...register('budget')}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                     placeholder="Enter amount"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Availability and Negotiation */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Preferred Start Date</label>
//                 <div className="relative">
//                   <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <input
//                     type="date"
//                     {...register('startDate')}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Open to Negotiation</label>
//                 <div className="relative">
//                   <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('openToNegotiation', { required: 'Negotiation preference is required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select option</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>
//                 {errors.openToNegotiation && (
//                   <span className="text-[#DA3A60] text-sm mt-1 block">{errors.openToNegotiation.message}</span>
//                 )}
//               </div>
//             </div>

//             {/* Location (Optional) */}
//             <div>
//               <label className="block text-sm font-medium text-[#005482] mb-2">Location (if offline)</label>
//               <div className="relative">
//                 <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                 <input
//                   type="text"
//                   {...register('location')}
//                   className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   placeholder="Enter location"
//                 />
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={mutation.isLoading}
//                 className="w-full bg-[#005482] hover:bg-[#00416a] text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
//               >
//                 {mutation.isLoading ? 'Posting...' : 'Post Job'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default PostJob;




// import React, { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import { useMutation } from '@tanstack/react-query';
// import { AuthContext } from '../../providers/AuthProvider';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   FaChalkboardTeacher,
//   FaGraduationCap,
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
// } from 'react-icons/fa';

// const PostJob = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const mutation = useMutation({
//     mutationFn: (data) => axiosSecure.post('/jobs', data),
//     onSuccess: () => {
//       Swal.fire({
//         title: 'Job Posted Successfully!',
//         text: 'Ready to find your perfect tutor?',
//         icon: 'success',
//         timer: 3000,
//         showConfirmButton: false,
//         timerProgressBar: true
//       }).then(() => {
//         navigate('/');
//       });
//       reset();
//     },
//     onError: (error) => {
//       if (error.response?.status === 402) {
//         Swal.fire({
//           title: 'Payment Required',
//           text: 'You have posted 3 jobs. Please pay a $10 fee to continue.',
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonText: 'Pay $10',
//         });
//       } else {
//         Swal.fire('Error', error.response?.data?.message || 'Failed to post job', 'error');
//       }
//     },
//   });

//   const onSubmit = (data) => {
//     const jobData = {
//       ...data,
//       email: user?.email,
//       postedAt: new Date(),
//     };
//     mutation.mutate(jobData);
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FBFF] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto"
//       >
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 flex items-center justify-center bg-[#DA3A60]/10 rounded-xl">
//               <FaChalkboardTeacher className="text-[#DA3A60] text-2xl" />
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#005482]">Post a Teaching Job</h2>
//           </div>
//           <p className="text-[#70C5D7] text-lg">Fill out the details below to find your perfect tutor</p>
//         </div>

//         {/* Form Section */}
//         <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Subject and Grade Level */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {/* Subject */}
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Subject</label>
//                 <div className="relative">
//                   <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('subject', { required: 'Subject is required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select a subject</option>
//                     <option value="Math">Math</option>
//                     <option value="Science">Science</option>
//                     <option value="English">English</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 {errors.subject && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.subject.message}</span>}
//               </div>

//               {/* Grade Level */}
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Grade Level</label>
//                 <div className="relative">
//                   <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('gradeLevel', { required: 'Grade level is required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select grade/level</option>
//                     <option value="Grade 1-5">Grade 1-5</option>
//                     <option value="Grade 6-8">Grade 6-8</option>
//                     <option value="Grade 9-12">Grade 9-12</option>
//                     <option value="College">College</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 {errors.gradeLevel && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.gradeLevel.message}</span>}
//               </div>
//             </div>

//             {/* Topics and Goals */}
//             <div>
//               <label className="block text-sm font-medium text-[#005482] mb-2">Topics or Goals</label>
//               <textarea
//                 {...register('topicsGoals', { required: 'Topics or goals are required' })}
//                 rows="4"
//                 className="w-full px-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                 placeholder="Describe the specific topics you need help with or your learning goals"
//               />
//               {errors.topicsGoals && (
//                 <span className="text-[#DA3A60] text-sm mt-1 block">{errors.topicsGoals.message}</span>
//               )}
//             </div>

//             {/* Mode of Learning */}
//             <div className="bg-[#70C5D7]/10 p-6 rounded-xl">
//               <label className="block text-sm font-medium text-[#005482] mb-4">Preferred Mode of Learning</label>
//               <div className="flex flex-wrap gap-4">
//                 {['Online', 'Offline', 'Either'].map((mode) => (
//                   <label
//                     key={mode}
//                     className="flex items-center p-3 bg-white rounded-lg cursor-pointer border border-[#70C5D7]/20 hover:border-[#70C5D7] transition-colors"
//                   >
//                     <input
//                       type="radio"
//                       {...register('modeOfLearning', { required: 'Mode of learning is required' })}
//                       value={mode}
//                       className="mr-2"
//                     />
//                     <span className="text-[#005482]">{mode}</span>
//                   </label>
//                 ))}
//               </div>
//               {errors.modeOfLearning && (
//                 <span className="text-[#DA3A60] text-sm mt-2 block">{errors.modeOfLearning.message}</span>
//               )}
//             </div>

//             {/* Schedule and Budget */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Sessions per Week</label>
//                 <div className="relative">
//                   <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('sessionsPerWeek', { required: 'Sessions per week are required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select number</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5+">5+</option>
//                   </select>
//                 </div>
//                 {errors.sessionsPerWeek && (
//                   <span className="text-[#DA3A60] text-sm mt-1 block">{errors.sessionsPerWeek.message}</span>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Budget (per hour)</label>
//                 <div className="relative">
//                   <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <input
//                     type="number"
//                     {...register('budget')}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                     placeholder="Enter amount"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Availability and Negotiation */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Preferred Start Date</label>
//                 <div className="relative">
//                   <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <input
//                     type="date"
//                     {...register('startDate')}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Open to Negotiation</label>
//                 <div className="relative">
//                   <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('openToNegotiation', { required: 'Negotiation preference is required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select option</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>
//                 {errors.openToNegotiation && (
//                   <span className="text-[#DA3A60] text-sm mt-1 block">{errors.openToNegotiation.message}</span>
//                 )}
//               </div>
//             </div>

//             {/* Location (Optional) */}
//             <div>
//               <label className="block text-sm font-medium text-[#005482] mb-2">Location (if offline)</label>
//               <div className="relative">
//                 <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                 <input
//                   type="text"
//                   {...register('location')}
//                   className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   placeholder="Enter location"
//                 />
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={mutation.isLoading}
//                 className="w-full bg-[#005482] hover:bg-[#00416a] text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
//               >
//                 {mutation.isLoading ? 'Posting...' : 'Post Job'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default PostJob;



// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { AuthContext } from '../../providers/AuthProvider';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   FaChalkboardTeacher,
//   FaGraduationCap,
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaClock,
//   FaMapMarkerAlt,
//   FaEdit,
//   FaTrash,
// } from 'react-icons/fa';

// const PostJob = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [editingJobId, setEditingJobId] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     setValue,
//   } = useForm();

//   // Fetch all jobs and filter by user's email
//   const { data: allJobs = [], isLoading, error } = useQuery({
//     queryKey: ['allJobs'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/jobs');
//       return res.data;
//     },
//   });

//   // Filter jobs to show only those posted by the current user
//   const userJobs = user ? allJobs.filter(job => job.email === user.email) : [];

//   // Post or update job mutation
//   const postMutation = useMutation({
//     mutationFn: (data) => axiosSecure.post('/jobs', data),
//     onSuccess: () => {
//       Swal.fire({
//         title: 'Job Posted Successfully!',
//         text: 'Ready to find your perfect tutor?',
//         icon: 'success',
//         timer: 3000,
//         showConfirmButton: false,
//         timerProgressBar: true,
//       }).then(() => {
//         navigate('/');
//       });
//       reset();
//       queryClient.invalidateQueries(['allJobs']);
//     },
//     onError: (error) => {
//       console.error('Post error:', error.response?.data, error.response?.status);
//       if (error.response?.status === 402) {
//         Swal.fire({
//           title: 'Payment Required',
//           text: 'You have posted 3 jobs. Please pay a $10 fee to continue.',
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonText: 'Pay $10',
//         });
//       } else {
//         Swal.fire('Error', error.response?.data?.message || 'Failed to post job', 'error');
//       }
//     },
//   });

//   const updateMutation = useMutation({
//     mutationFn: ({ jobId, data }) => {
//       console.log('Updating job with ID:', jobId, 'Data:', data);
//       return axiosSecure.put(`/jobs/${jobId}`, data);
//     },
//     onSuccess: () => {
//       console.log('Update successful');
//       Swal.fire({
//         title: 'Job Posted Successfully!',
//         icon: 'success',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//       queryClient.invalidateQueries(['allJobs']);
//       setEditingJobId(null);
//       reset();
//     },
//     onError: (error) => {
//       console.error('Update error:', error.response?.data, error.response?.status);
//       Swal.fire('Error', error.response?.data?.message || 'Failed to update job', 'error');
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (jobId) => {
//       console.log('Deleting job with ID:', jobId);
//       return axiosSecure.delete(`/jobs/${jobId}`);
//     },
//     onSuccess: () => {
//       console.log('Delete successful');
//       Swal.fire({
//         title: 'Job Deleted!',
//         icon: 'success',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//       queryClient.invalidateQueries(['allJobs']);
//     },
//     onError: (error) => {
//       console.error('Delete error:', error.response?.data, error.response?.status);
//       let errorMessage = 'Failed to delete job';
//       if (error.response?.status === 400) {
//         errorMessage = error.response.data.message || 'Invalid job ID';
//       } else if (error.response?.status === 403) {
//         errorMessage = error.response.data.message || 'Unauthorized or job not found';
//       } else if (error.response?.status === 500) {
//         errorMessage = 'Server error. Please try again later.';
//       }
//       Swal.fire('Error', errorMessage, 'error');
//     },
//   });

//   const handleEdit = (job) => {
//     if (user?.email && job.email === user.email) {
//       console.log('Editing job:', job);
//       setEditingJobId(job._id);
//       setValue('subject', job.subject);
//       setValue('gradeLevel', job.gradeLevel);
//       setValue('topicsGoals', job.topicsGoals);
//       setValue('modeOfLearning', job.modeOfLearning);
//       setValue('sessionsPerWeek', job.sessionsPerWeek);
//       setValue('budget', job.budget === 'Not specified' ? '' : job.budget);
//       setValue('startDate', job.startDate ? new Date(job.startDate).toISOString().split('T')[0] : '');
//       setValue('openToNegotiation', job.openToNegotiation);
//       setValue('location', job.location);
//     } else {
//       Swal.fire('Error', 'You are not authorized to edit this job', 'error');
//     }
//   };

//   const handleDelete = (jobId) => {
//     const jobToDelete = userJobs.find((job) => job._id === jobId);
//     if (user?.email && jobToDelete?.email === user.email) {
//       console.log('Handle delete for jobId:', jobId);
//       Swal.fire({
//         title: 'Are you sure?',
//         text: 'This action cannot be undone.',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, delete it!',
//         cancelButtonText: 'Cancel',
//       }).then((result) => {
//         if (result.isConfirmed) {
//           deleteMutation.mutate(jobId);
//         }
//       });
//     } else {
//       Swal.fire('Error', 'You are not authorized to delete this job', 'error');
//     }
//   };

//   const onSubmit = (data) => {
//     console.log('Form data:', data);
//     const jobData = {
//       ...data,
//       email: user?.email,
//       postedAt: editingJobId ? undefined : new Date(),
//     };
//     if (editingJobId) {
//       updateMutation.mutate({ jobId: editingJobId, data: jobData });
//     } else {
//       postMutation.mutate(jobData);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FBFF] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto"
//       >
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 flex items-center justify-center bg-[#DA3A60]/10 rounded-xl">
//               <FaChalkboardTeacher className="text-[#DA3A60] text-2xl" />
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#005482]">
//               {editingJobId ? 'Edit Teaching Job' : 'Post a Teaching Job'}
//             </h2>
//           </div>
//           <p className="text-[#70C5D7] text-lg">
//             {editingJobId ? 'Update the details below to edit your job' : 'Fill out the details below to find your perfect tutor'}
//           </p>
//         </div>

//         <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-8">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Subject</label>
//                 <div className="relative">
//                   <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('subject', { required: 'Subject is required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select a subject</option>
//                     <option value="Math">Math</option>
//                     <option value="Science">Science</option>
//                     <option value="English">English</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 {errors.subject && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.subject.message}</span>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Grade Level</label>
//                 <div className="relative">
//                   <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('gradeLevel', { required: 'Grade level is required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select grade/level</option>
//                     <option value="Grade 1-5">Grade 1-5</option>
//                     <option value="Grade 6-8">Grade 6-8</option>
//                     <option value="Grade 9-12">Grade 9-12</option>
//                     <option value="College">College</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 {errors.gradeLevel && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.gradeLevel.message}</span>}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-[#005482] mb-2">Topics or Goals</label>
//               <textarea
//                 {...register('topicsGoals', { required: 'Topics or goals are required' })}
//                 rows="4"
//                 className="w-full px-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                 placeholder="Describe the specific topics you need help with or your learning goals"
//               />
//               {errors.topicsGoals && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.topicsGoals.message}</span>}
//             </div>
//             <div className="bg-[#70C5D7]/10 p-6 rounded-xl">
//               <label className="block text-sm font-medium text-[#005482] mb-4">Preferred Mode of Learning</label>
//               <div className="flex flex-wrap gap-4">
//                 {['Online', 'Offline', 'Either'].map((mode) => (
//                   <label
//                     key={mode}
//                     className="flex items-center p-3 bg-white rounded-lg cursor-pointer border border-[#70C5D7]/20 hover:border-[#70C5D7] transition-colors"
//                   >
//                     <input
//                       type="radio"
//                       {...register('modeOfLearning', { required: 'Mode of learning is required' })}
//                       value={mode}
//                       className="mr-2"
//                     />
//                     <span className="text-[#005482]">{mode}</span>
//                   </label>
//                 ))}
//               </div>
//               {errors.modeOfLearning && <span className="text-[#DA3A60] text-sm mt-2 block">{errors.modeOfLearning.message}</span>}
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Sessions per Week</label>
//                 <div className="relative">
//                   <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('sessionsPerWeek', { required: 'Sessions per week are required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select number</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5+">5+</option>
//                   </select>
//                 </div>
//                 {errors.sessionsPerWeek && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.sessionsPerWeek.message}</span>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Budget (per hour)</label>
//                 <div className="relative">
//                   <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <input
//                     type="number"
//                     {...register('budget')}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                     placeholder="Enter amount"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Preferred Start Date</label>
//                 <div className="relative">
//                   <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <input
//                     type="date"
//                     {...register('startDate')}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#005482] mb-2">Open to Negotiation</label>
//                 <div className="relative">
//                   <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                   <select
//                     {...register('openToNegotiation', { required: 'Negotiation preference is required' })}
//                     className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   >
//                     <option value="">Select option</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>
//                 {errors.openToNegotiation && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.openToNegotiation.message}</span>}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-[#005482] mb-2">Location (if offline)</label>
//               <div className="relative">
//                 <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
//                 <input
//                   type="text"
//                   {...register('location')}
//                   className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
//                   placeholder="Enter location"
//                 />
//               </div>
//             </div>
//             <div className="pt-4 flex gap-4">
//               <button
//                 type="submit"
//                 disabled={postMutation.isLoading || updateMutation.isLoading}
//                 className="w-full bg-[#005482] hover:bg-[#00416a] text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
//               >
//                 {postMutation.isLoading || updateMutation.isLoading ? 'Processing...' : editingJobId ? 'Update Job' : 'Post Job'}
//               </button>
//               {editingJobId && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setEditingJobId(null);
//                     reset();
//                   }}
//                   className="w-full bg-[#DA3A60] hover:bg-[#b82c4e] text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
//           <h3 className="text-xl font-semibold text-[#005482] mb-6">My Posted Jobs</h3>
//           {isLoading ? (
//             <div className="text-center py-8">Loading...</div>
//           ) : error ? (
//             <div className="text-center py-8 text-[#DA3A60]">Error: {error.message}</div>
//           ) : userJobs.length === 0 ? (
//             <p className="text-center text-[#005482]">No jobs posted yet.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {userJobs.map((job) => (
//                 <motion.div
//                   key={job._id}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="bg-[#F8FBFF] border border-[#70C5D7]/20 rounded-xl p-6 hover:shadow-md transition-shadow"
//                 >
//                   <h4 className="text-lg font-semibold text-[#005482]">{job.subject}</h4>
//                   <p className="text-[#70C5D7] text-sm mb-2">{job.gradeLevel}</p>
//                   <p className="text-[#005482] mb-2"><strong>Topics/Goals:</strong> {job.topicsGoals}</p>
//                   <p className="text-[#005482] mb-2"><strong>Mode:</strong> {job.modeOfLearning}</p>
//                   <p className="text-[#005482] mb-2"><strong>Sessions/Week:</strong> {job.sessionsPerWeek}</p>
//                   <p className="text-[#005482] mb-2"><strong>Budget:</strong> {job.budget === 'Not specified' ? 'Not specified' : `$${job.budget}/hr`}</p>
//                   <p className="text-[#005482] mb-2"><strong>Negotiation:</strong> {job.openToNegotiation}</p>
//                   <p className="text-[#005482] mb-2"><strong>Location:</strong> {job.location}</p>
//                   <p className="text-[#005482] mb-2"><strong>Start Date:</strong> {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'Not specified'}</p>
//                   <div className="flex gap-4">
//                     <button
//                       onClick={() => handleEdit(job)}
//                       className="flex items-center gap-2 bg-[#005482] hover:bg-[#00416a] text-white px-4 py-2 rounded-xl transition duration-300"
//                     >
//                       <FaEdit /> Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(job._id)}
//                       className="flex items-center gap-2 bg-[#DA3A60] hover:bg-[#b82c4e] text-white px-4 py-2 rounded-xl transition duration-300"
//                     >
//                       <FaTrash /> Delete
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default PostJob;


import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaListAlt,
} from 'react-icons/fa';

const PostJob = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingJobId, setEditingJobId] = useState(null);
  const [activeTab, setActiveTab] = useState('postJob'); // 'postJob' or 'myJobs'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch user's jobs
  const { data: allJobs = [], isLoading, error } = useQuery({
    queryKey: ['allJobs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/jobs');
      return res.data;
    },
  });

  const userJobs = user ? allJobs.filter(job => job.email === user.email) : [];

  // Mutations
  const postMutation = useMutation({
    mutationFn: (data) => axiosSecure.post('/jobs', data),
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Job posted successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
      setActiveTab('myJobs');
      queryClient.invalidateQueries(['allJobs']);
    },
    onError: handleMutationError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ jobId, data }) => axiosSecure.put(`/jobs/${jobId}`, data),
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Job updated successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      setEditingJobId(null);
      reset();
      queryClient.invalidateQueries(['allJobs']);
    },
    onError: handleMutationError,
  });

  const deleteMutation = useMutation({
    mutationFn: (jobId) => axiosSecure.delete(`/jobs/${jobId}`),
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Job deleted successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(['allJobs']);
    },
    onError: handleMutationError,
  });

  function handleMutationError(error) {
    if (error.response?.status === 402) {
      Swal.fire({
        title: 'Payment Required',
        text: 'You have posted 3 jobs. Please pay a $10 fee to continue.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Pay $10',
      });
    } else {
      Swal.fire('Error', error.response?.data?.message || 'An error occurred', 'error');
    }
  }

  const handleEdit = (job) => {
    if (user?.email && job.email === user.email) {
      setEditingJobId(job._id);
      setActiveTab('postJob');
      Object.keys(job).forEach(key => {
        if (key !== '_id' && key !== 'email' && key !== 'postedAt') {
          setValue(key, job[key]);
        }
      });
    }
  };

  const handleDelete = (jobId) => {
    const jobToDelete = userJobs.find((job) => job._id === jobId);
    if (user?.email && jobToDelete?.email === user.email) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMutation.mutate(jobId);
        }
      });
    }
  };

  const onSubmit = (data) => {
    const jobData = {
      ...data,
      email: user?.email,
      postedAt: editingJobId ? undefined : new Date(),
    };
    
    if (editingJobId) {
      updateMutation.mutate({ jobId: editingJobId, data: jobData });
    } else {
      postMutation.mutate(jobData);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#005482]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FCBB45]/20 rounded-xl">
                <FaChalkboardTeacher className="text-[#FCBB45] text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-white">Teaching Jobs</h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('postJob')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'postJob'
                    ? 'bg-[#DA3A60] text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <FaEdit /> Post Job
              </button>
              <button
                onClick={() => setActiveTab('myJobs')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'myJobs'
                    ? 'bg-[#DA3A60] text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <FaListAlt /> My Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'postJob' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-[#70C5D7]/20"
          >
            <div className="p-6 border-b border-[#70C5D7]/20">
              <h2 className="text-xl font-semibold text-[#005482]">
                {editingJobId ? 'Edit Teaching Job' : 'Post a New Teaching Job'}
              </h2>
              <p className="mt-1 text-sm text-[#70C5D7]">
                Fill out the form below with accurate details to find the perfect tutor.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-[#005482] mb-2">Subject</label>
                  <div className="relative">
                    <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FCBB45]" />
                    <select
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full pl-10 pr-4 py-2 border border-[#70C5D7]/20 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="Math">Math</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-[#DA3A60]">{errors.subject.message}</p>
                  )}
                </div>

                {/* Grade Level */}
                <div>
                  <label className="block text-sm font-medium text-[#005482] mb-2">Grade Level</label>
                  <div className="relative">
                    <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FCBB45]" />
                    <select
                      {...register('gradeLevel', { required: 'Grade level is required' })}
                      className="w-full pl-10 pr-4 py-2 border border-[#70C5D7]/20 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                    >
                      <option value="">Select grade/level</option>
                      <option value="Grade 1-5">Grade 1-5</option>
                      <option value="Grade 6-8">Grade 6-8</option>
                      <option value="Grade 9-12">Grade 9-12</option>
                      <option value="College">College</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {errors.gradeLevel && (
                    <p className="mt-1 text-sm text-[#DA3A60]">{errors.gradeLevel.message}</p>
                  )}
                </div>
              </div>

              {/* Topics and Goals */}
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Topics or Goals</label>
                <textarea
                  {...register('topicsGoals', { required: 'Topics or goals are required' })}
                  rows="4"
                  className="w-full px-4 py-2 border border-[#70C5D7]/20 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  placeholder="Describe the specific topics you need help with or your learning goals"
                />
                {errors.topicsGoals && (
                  <p className="mt-1 text-sm text-[#DA3A60]">{errors.topicsGoals.message}</p>
                )}
              </div>

              {/* Mode of Learning */}
              <div className="bg-[#70C5D7]/10 p-6 rounded-lg">
                <label className="block text-sm font-medium text-[#005482] mb-4">
                  Preferred Mode of Learning
                </label>
                <div className="flex flex-wrap gap-4">
                  {['Online', 'Offline', 'Either'].map((mode) => (
                    <label
                      key={mode}
                      className="flex items-center p-3 bg-white rounded-lg cursor-pointer border border-[#70C5D7]/20 hover:border-[#70C5D7] transition-colors"
                    >
                      <input
                        type="radio"
                        {...register('modeOfLearning', { required: 'Mode of learning is required' })}
                        value={mode}
                        className="mr-2 text-[#DA3A60] focus:ring-[#DA3A60]"
                      />
                      <span className="text-[#005482]">{mode}</span>
                    </label>
                  ))}
                </div>
                {errors.modeOfLearning && (
                  <p className="mt-2 text-sm text-[#DA3A60]">{errors.modeOfLearning.message}</p>
                )}
              </div>

              {/* Schedule and Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#005482] mb-2">Sessions per Week</label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FCBB45]" />
                    <select
                      {...register('sessionsPerWeek', { required: 'Sessions per week are required' })}
                      className="w-full pl-10 pr-4 py-2 border border-[#70C5D7]/20 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                    >
                      <option value="">Select number</option>
                      {[1, 2, 3, 4, '5+'].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  {errors.sessionsPerWeek && (
                    <p className="mt-1 text-sm text-[#DA3A60]">{errors.sessionsPerWeek.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#005482] mb-2">Budget (per hour)</label>
                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FCBB45]" />
                    <input
                      type="number"
                      {...register('budget')}
                      className="w-full pl-10 pr-4 py-2 border border-[#70C5D7]/20 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#005482] mb-2">Preferred Start Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FCBB45]" />
                    <input
                      type="date"
                      {...register('startDate')}
                      className="w-full pl-10 pr-4 py-2 border border-[#70C5D7]/20 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#005482] mb-2">Open to Negotiation</label>
                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FCBB45]" />
                    <select
                      {...register('openToNegotiation', { required: 'Negotiation preference is required' })}
                      className="w-full pl-10 pr-4 py-2 border border-[#70C5D7]/20 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                    >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {errors.openToNegotiation && (
                    <p className="mt-1 text-sm text-[#DA3A60]">{errors.openToNegotiation.message}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Location (if offline)</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FCBB45]" />
                  <input
                    type="text"
                    {...register('location')}
                    className="w-full pl-10 pr-4 py-2 border border-[#70C5D7]/20 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                    placeholder="Enter location"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={postMutation.isLoading || updateMutation.isLoading}
                  className="flex-1 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {postMutation.isLoading || updateMutation.isLoading
                    ? 'Processing...'
                    : editingJobId
                    ? 'Update Job'
                    : 'Post Job'}
                </button>
                {editingJobId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingJobId(null);
                      reset();
                    }}
                    className="flex-1 bg-[#70C5D7]/10 hover:bg-[#70C5D7]/20 text-[#005482] font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-[#70C5D7]/20"
          >
            <div className="p-6 border-b border-[#70C5D7]/20">
              <h2 className="text-xl font-semibold text-[#005482]">My Posted Jobs</h2>
              <p className="mt-1 text-sm text-[#70C5D7]">
                Manage and track all your posted teaching job listings.
              </p>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA3A60] mx-auto"></div>
                  <p className="mt-4 text-[#70C5D7]">Loading your jobs...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-[#DA3A60]">{error.message}</p>
                </div>
              ) : userJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#70C5D7]">You haven't posted any jobs yet.</p>
                  <button
                    onClick={() => setActiveTab('postJob')}
                    className="mt-4 inline-flex items-center gap-2 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <FaEdit /> Post Your First Job
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-[#70C5D7]/20 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      {/* Job Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[#005482]">{job.subject}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-[#FCBB45]/10 text-[#FCBB45] text-xs font-medium px-2 py-1 rounded">
                              {job.gradeLevel}
                            </span>
                            <span className="bg-[#70C5D7]/10 text-[#70C5D7] text-xs font-medium px-2 py-1 rounded">
                              {job.modeOfLearning}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(job)}
                            className="p-2 text-[#FCBB45] hover:bg-[#FCBB45]/10 rounded-lg transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="p-2 text-[#DA3A60] hover:bg-[#DA3A60]/10 rounded-lg transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      {/* Job Card Content */}
                      <div className="space-y-3">
                        <div className="bg-[#70C5D7]/5 p-3 rounded-lg">
                          <p className="text-[#005482] text-sm">
                            <span className="font-medium">Topics/Goals:</span><br />
                            {job.topicsGoals}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-[#70C5D7]/5 p-3 rounded-lg">
                            <p className="text-[#005482]">
                              <span className="font-medium">Sessions/Week:</span><br />
                              {job.sessionsPerWeek}
                            </p>
                          </div>
                          <div className="bg-[#70C5D7]/5 p-3 rounded-lg">
                            <p className="text-[#005482]">
                              <span className="font-medium">Budget:</span><br />
                              {job.budget ? `$${job.budget}/hr` : 'Not specified'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-[#70C5D7]/5 p-3 rounded-lg">
                            <p className="text-[#005482]">
                              <span className="font-medium">Location:</span><br />
                              {job.location || 'Not specified'}
                            </p>
                          </div>
                          <div className="bg-[#70C5D7]/5 p-3 rounded-lg">
                            <p className="text-[#005482]">
                              <span className="font-medium">Posted:</span><br />
                              {new Date(job.postedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PostJob;