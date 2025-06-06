

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
} from 'react-icons/fa';

const PostJob = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingJobId, setEditingJobId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch all jobs and filter by user's email
  const { data: allJobs = [], isLoading, error } = useQuery({
    queryKey: ['allJobs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/jobs');
      return res.data;
    },
  });

  // Filter jobs to show only those posted by the current user
  const userJobs = user ? allJobs.filter(job => job.email === user.email) : [];

  // Post or update job mutation
  const postMutation = useMutation({
    mutationFn: (data) => axiosSecure.post('/jobs', data),
    onSuccess: () => {
      Swal.fire({
        title: 'Job Posted Successfully!',
        text: 'Ready to find your perfect tutor?',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        navigate('/');
      });
      reset();
      queryClient.invalidateQueries(['allJobs']);
    },
    onError: (error) => {
      console.error('Post error:', error.response?.data, error.response?.status);
      if (error.response?.status === 402) {
        Swal.fire({
          title: 'Payment Required',
          text: 'You have posted 3 jobs. Please pay a $10 fee to continue.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Pay $10',
        });
      } else {
        Swal.fire('Error', error.response?.data?.message || 'Failed to post job', 'error');
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ jobId, data }) => {
      console.log('Updating job with ID:', jobId, 'Data:', data);
      return axiosSecure.put(`/jobs/${jobId}`, data);
    },
    onSuccess: () => {
      console.log('Update successful');
      Swal.fire({
        title: 'Job Posted Successfully!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(['allJobs']);
      setEditingJobId(null);
      reset();
    },
    onError: (error) => {
      console.error('Update error:', error.response?.data, error.response?.status);
      Swal.fire('Error', error.response?.data?.message || 'Failed to update job', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (jobId) => {
      console.log('Deleting job with ID:', jobId);
      return axiosSecure.delete(`/jobs/${jobId}`);
    },
    onSuccess: () => {
      console.log('Delete successful');
      Swal.fire({
        title: 'Job Deleted!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(['allJobs']);
    },
    onError: (error) => {
      console.error('Delete error:', error.response?.data, error.response?.status);
      let errorMessage = 'Failed to delete job';
      if (error.response?.status === 400) {
        errorMessage = error.response.data.message || 'Invalid job ID';
      } else if (error.response?.status === 403) {
        errorMessage = error.response.data.message || 'Unauthorized or job not found';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      Swal.fire('Error', errorMessage, 'error');
    },
  });

  const handleEdit = (job) => {
    if (user?.email && job.email === user.email) {
      console.log('Editing job:', job);
      setEditingJobId(job._id);
      setValue('subject', job.subject);
      setValue('gradeLevel', job.gradeLevel);
      setValue('topicsGoals', job.topicsGoals);
      setValue('modeOfLearning', job.modeOfLearning);
      setValue('sessionsPerWeek', job.sessionsPerWeek);
      setValue('budget', job.budget === 'Not specified' ? '' : job.budget);
      setValue('startDate', job.startDate ? new Date(job.startDate).toISOString().split('T')[0] : '');
      setValue('openToNegotiation', job.openToNegotiation);
      setValue('location', job.location);
    } else {
      Swal.fire('Error', 'You are not authorized to edit this job', 'error');
    }
  };

  const handleDelete = (jobId) => {
    const jobToDelete = userJobs.find((job) => job._id === jobId);
    if (user?.email && jobToDelete?.email === user.email) {
      console.log('Handle delete for jobId:', jobId);
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMutation.mutate(jobId);
        }
      });
    } else {
      Swal.fire('Error', 'You are not authorized to delete this job', 'error');
    }
  };

  const onSubmit = (data) => {
    console.log('Form data:', data);
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
    <div className="min-h-screen bg-[#F8FBFF] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-[#DA3A60]/10 rounded-xl">
              <FaChalkboardTeacher className="text-[#DA3A60] text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#005482]">
              {editingJobId ? 'Edit Teaching Job' : 'Post a Teaching Job'}
            </h2>
          </div>
          <p className="text-[#70C5D7] text-lg">
            {editingJobId ? 'Update the details below to edit your job' : 'Fill out the details below to find your perfect tutor'}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Subject</label>
                <div className="relative">
                  <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <select
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.subject && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.subject.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Grade Level</label>
                <div className="relative">
                  <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <select
                    {...register('gradeLevel', { required: 'Grade level is required' })}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  >
                    <option value="">Select grade/level</option>
                    <option value="Grade 1-5">Grade 1-5</option>
                    <option value="Grade 6-8">Grade 6-8</option>
                    <option value="Grade 9-12">Grade 9-12</option>
                    <option value="College">College</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.gradeLevel && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.gradeLevel.message}</span>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#005482] mb-2">Topics or Goals</label>
              <textarea
                {...register('topicsGoals', { required: 'Topics or goals are required' })}
                rows="4"
                className="w-full px-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                placeholder="Describe the specific topics you need help with or your learning goals"
              />
              {errors.topicsGoals && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.topicsGoals.message}</span>}
            </div>
            <div className="bg-[#70C5D7]/10 p-6 rounded-xl">
              <label className="block text-sm font-medium text-[#005482] mb-4">Preferred Mode of Learning</label>
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
                      className="mr-2"
                    />
                    <span className="text-[#005482]">{mode}</span>
                  </label>
                ))}
              </div>
              {errors.modeOfLearning && <span className="text-[#DA3A60] text-sm mt-2 block">{errors.modeOfLearning.message}</span>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Sessions per Week</label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <select
                    {...register('sessionsPerWeek', { required: 'Sessions per week are required' })}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  >
                    <option value="">Select number</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                  </select>
                </div>
                {errors.sessionsPerWeek && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.sessionsPerWeek.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Budget (per hour)</label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <input
                    type="number"
                    {...register('budget')}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Preferred Start Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <input
                    type="date"
                    {...register('startDate')}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#005482] mb-2">Open to Negotiation</label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                  <select
                    {...register('openToNegotiation', { required: 'Negotiation preference is required' })}
                    className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {errors.openToNegotiation && <span className="text-[#DA3A60] text-sm mt-1 block">{errors.openToNegotiation.message}</span>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#005482] mb-2">Location (if offline)</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#70C5D7]" />
                <input
                  type="text"
                  {...register('location')}
                  className="w-full pl-10 pr-4 py-3 border border-[#70C5D7]/20 rounded-xl focus:ring-2 focus:ring-[#70C5D7] focus:border-[#70C5D7] bg-white"
                  placeholder="Enter location"
                />
              </div>
            </div>
            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                disabled={postMutation.isLoading || updateMutation.isLoading}
                className="w-full bg-[#005482] hover:bg-[#00416a] text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
              >
                {postMutation.isLoading || updateMutation.isLoading ? 'Processing...' : editingJobId ? 'Update Job' : 'Post Job'}
              </button>
              {editingJobId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingJobId(null);
                    reset();
                  }}
                  className="w-full bg-[#DA3A60] hover:bg-[#b82c4e] text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-[#005482] mb-6">My Posted Jobs</h3>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-[#DA3A60]">Error: {error.message}</div>
          ) : userJobs.length === 0 ? (
            <p className="text-center text-[#005482]">No jobs posted yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#F8FBFF] border border-[#70C5D7]/20 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-[#005482]">{job.subject}</h4>
                  <p className="text-[#70C5D7] text-sm mb-2">{job.gradeLevel}</p>
                  <p className="text-[#005482] mb-2"><strong>Topics/Goals:</strong> {job.topicsGoals}</p>
                  <p className="text-[#005482] mb-2"><strong>Mode:</strong> {job.modeOfLearning}</p>
                  <p className="text-[#005482] mb-2"><strong>Sessions/Week:</strong> {job.sessionsPerWeek}</p>
                  <p className="text-[#005482] mb-2"><strong>Budget:</strong> {job.budget === 'Not specified' ? 'Not specified' : `$${job.budget}/hr`}</p>
                  <p className="text-[#005482] mb-2"><strong>Negotiation:</strong> {job.openToNegotiation}</p>
                  <p className="text-[#005482] mb-2"><strong>Location:</strong> {job.location}</p>
                  <p className="text-[#005482] mb-2"><strong>Start Date:</strong> {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'Not specified'}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(job)}
                      className="flex items-center gap-2 bg-[#005482] hover:bg-[#00416a] text-white px-4 py-2 rounded-xl transition duration-300"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="flex items-center gap-2 bg-[#DA3A60] hover:bg-[#b82c4e] text-white px-4 py-2 rounded-xl transition duration-300"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PostJob;