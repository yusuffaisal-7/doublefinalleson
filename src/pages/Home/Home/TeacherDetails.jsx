

// import { useQuery } from '@tanstack/react-query';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useContext, useState, useEffect } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';
// import {
//   FaGlobe, FaUserGraduate, FaClock, FaDollarSign, FaBook, FaChalkboardTeacher,
//   FaStar, FaMapMarkerAlt, FaLanguage, FaArrowLeft, FaQuoteLeft, FaEnvelope,
//   FaPhone, FaCalendarAlt, FaCheckCircle, FaWhatsapp, FaComments, FaShare,
//   FaChevronUp, FaChevronDown, FaLock, FaGraduationCap, FaUser
// } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';

// const TeacherDetails = () => {
//   const { tutorId } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [hasUserRated, setHasUserRated] = useState(false);
//   const [hasPaidForTutor, setHasPaidForTutor] = useState(false);
//   const [isBookingLoading, setIsBookingLoading] = useState(false); // Added state for booking loading

//   const { data: tutor, isLoading: tutorLoading, error: tutorError } = useQuery({
//     queryKey: ['tutor', tutorId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/tutors/${tutorId}`);
//       return res.data;
//     },
//   });

//   const { data: ratings, isLoading: ratingsLoading, error: ratingsError } = useQuery({
//     queryKey: ['ratings', tutorId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/ratings/${tutorId}`);
//       if (user) {
//         const hasRated = res.data.some(rating => rating.studentEmail === user.email);
//         setHasUserRated(hasRated);
//       }
//       return res.data;
//     },
//   });

//   const { data: payments, isLoading: paymentsLoading } = useQuery({
//     queryKey: ['payments', user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments/${user.email}`);
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (payments && tutor) {
//       const paidTutorEmails = payments.flatMap(payment => payment.tutorEmails || []);
//       setHasPaidForTutor(paidTutorEmails.includes(tutor.email));
//     }
//   }, [payments, tutor]);

//   const handleBookTutor = async () => {
//     if (!user) {
//       Swal.fire({
//         title: 'Login Required',
//         text: 'Please login to book a tutor',
//         icon: 'info',
//         showCancelButton: true,
//         confirmButtonText: 'Login',
//         cancelButtonText: 'Cancel'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/login');
//         }
//       });
//       return;
//     }

//     setIsBookingLoading(true); // Set loading state
//     try {
//       const existingBooking = await axiosSecure.get(`/carts?email=${user.email}`);
//       const alreadyBooked = existingBooking.data.find((item) => item.tutorId === tutor._id);

//       if (alreadyBooked) {
//         Swal.fire({
//           icon: 'info',
//           title: 'Already Booked',
//           text: 'You have already booked this tutor.',
//         });
//         return;
//       }

//       await axiosSecure.post('/carts', {
//         email: user.email,
//         tutorId: tutor._id,
//         tutorName: tutor.name,
//         subject: tutor.subjects?.[0] || 'Not specified',
//         price: tutor.hourlyRate,
//         status: 'Pending',
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Booking Successful',
//         text: 'Tutor booked successfully!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//       navigate('/dashboard/my-bookings');
//     } catch (error) {
//       console.error('Error booking tutor:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Booking Failed',
//         text: 'Failed to book tutor. Please try again.',
//       });
//     } finally {
//       setIsBookingLoading(false); // Reset loading state
//     }
//   };

//   const handleContactClick = () => {
//     if (!user) {
//       Swal.fire({
//         title: 'Login Required',
//         text: 'Please login to contact the tutor',
//         icon: 'info',
//         showCancelButton: true,
//         confirmButtonText: 'Login',
//         cancelButtonText: 'Cancel'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/login');
//         }
//       });
//       return;
//     }

//     if (!hasPaidForTutor) {
//       Swal.fire({
//         title: 'Subscription Required',
//         text: 'Please book this tutor first to get contact access',
//         icon: 'info',
//         showCancelButton: true,
//         confirmButtonText: 'Book Now',
//         cancelButtonText: 'Cancel'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           handleBookTutor();
//         }
//       });
//       return;
//     }

//     window.open(`https://wa.me/${tutor.contactNumber?.replace(/\D/g, '')}`, '_blank');
//   };

//   if (tutorLoading || ratingsLoading || paymentsLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FFFFFF]"></div>
//       </div>
//     );
//   }

//   if (tutorError || ratingsError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//         <div className="text-white text-xl">
//           Error: {tutorError?.message || ratingsError?.message || 'An error occurred'}
//         </div>
//       </div>
//     );
//   }

//   if (!tutor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//         <div className="text-white text-xl">Tutor not found</div>
//       </div>
//     );
//   }

//   const averageRating = ratings?.reduce((acc, curr) => acc + curr.rating, 0) / ratings?.length || 0;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC]">
//       {/* Hero Section */}
//       <div className="relative bg-[#005482] text-white">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#005482] via-[#005482]/90 to-[#70C5D7]/20"></div>
//         <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//           {/* Navigation */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
//             <button
//               onClick={() => navigate(-1)}
//               className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
//             >
//               <FaArrowLeft className="text-sm" />
//               <span>Back to Search</span>
//             </button>
//             <div className="text-sm breadcrumbs text-white/60">
//               <span>Tutors</span>
//               <span className="mx-2">›</span>
//               <span className="text-white">{tutor?.name}</span>
//             </div>
//           </div>

//           {/* Hero Content */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
//             {/* Profile Image */}
//             <div className="lg:col-span-4">
//               <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
//                 <img
//                   src={tutor?.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
//                   alt={tutor?.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6">
//                   <div className="flex items-center gap-2 text-white/80 text-sm">
//                     <FaMapMarkerAlt />
//                     <span>{tutor?.location || 'Location not specified'}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Profile Info */}
//             <div className="lg:col-span-8">
//               <div className="space-y-6">
//                 <div>
//                   <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
//                     {tutor?.name}
//                   </h1>
//                   <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
//                     <span className="text-xl text-[#70C5D7]">{tutor?.subjects?.[0]}</span>
//                     <div className="flex items-center gap-2">
//                       <FaGraduationCap className="text-[#70C5D7]" />
//                       <span>{tutor?.educationalQualifications || 'Education not specified'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                     <div className="text-sm text-[#70C5D7] mb-1">Experience</div>
//                     <div className="text-2xl font-bold">{tutor?.experience || 0} Years</div>
//                   </div>
//                   <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                     <div className="text-sm text-[#70C5D7] mb-1">Hourly Rate</div>
//                     <div className="text-2xl font-bold">${tutor?.hourlyRate || 0}</div>
//                   </div>
//                   <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 col-span-2 sm:col-span-1">
//                     <div className="text-sm text-[#70C5D7] mb-1">Rating</div>
//                     <div className="flex items-center gap-3">
//                       <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                           <FaStar
//                             key={i}
//                             className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-white/30"}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-xl font-bold">({ratings?.length || 0})</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Actions */}
//                 <div className="flex flex-wrap gap-4 pt-6">
//                   {user ? (
//                     <>
//                       <button
//                         onClick={handleBookTutor}
//                         disabled={isBookingLoading}
//                         className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#70C5D7] text-white rounded-xl hover:bg-[#70C5D7]/90 transition-colors disabled:opacity-50"
//                       >
//                         <FaCalendarAlt />
//                         <span>{isBookingLoading ? 'Booking...' : 'Book a Session'}</span>
//                       </button>
//                       <button
//                         onClick={() => window.location.href = `mailto:${tutor?.email}`}
//                         className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
//                       >
//                         <FaEnvelope />
//                         <span>Send Email</span>
//                       </button>
//                       {tutor?.contactNumber && (
//                         <button
//                           onClick={handleContactClick}
//                           className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
//                         >
//                           <FaWhatsapp />
//                           <span>Contact via WhatsApp</span>
//                         </button>
//                       )}
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => navigate('/login')}
//                       className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#70C5D7] text-white rounded-xl hover:bg-[#70C5D7]/90 transition-colors"
//                     >
//                       <FaLock />
//                       <span>Login to Book</span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Sidebar */}
//           <div className="lg:col-span-4 space-y-6">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-6 sticky top-8"
//             >
//               <h3 className="text-xl font-bold text-[#005482] mb-6">Contact Information</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
//                     <FaEnvelope className="text-[#FCBB45]" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-[#005482]/60">Email</div>
//                     <div className="text-[#005482] break-all">{tutor?.email}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
//                     <FaPhone className="text-[#FCBB45]" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-[#005482]/60">Phone</div>
//                     <div className="text-[#005482]">{tutor?.contactNumber || 'Not provided'}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
//                     <FaMapMarkerAlt className="text-[#FCBB45]" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-[#005482]/60">Location</div>
//                     <div className="text-[#005482]">{tutor?.location || 'Location not specified'}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <h3 className="text-xl font-bold text-[#005482] mb-6">Languages</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {(tutor?.languages || ['English']).map((language, index) => (
//                     <span
//                       key={index}
//                       className="bg-[#70C5D7]/10 text-[#005482] px-4 py-2 rounded-full text-sm font-medium"
//                     >
//                       {language}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <h3 className="text-xl font-bold text-[#005482] mb-6">Teaching Mode</h3>
//                 <div className="p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="flex items-center gap-3">
//                     <FaChalkboardTeacher className="text-[#FCBB45]" />
//                     <span className="text-[#005482] font-medium">{tutor?.teachingMode || 'Not specified'}</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Main Content Area */}
//           <div className="lg:col-span-8 space-y-8">
//             {/* About Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-6"
//             >
//               <h3 className="text-xl font-bold text-[#005482] mb-6 flex items-center gap-3">
//                 <FaUserGraduate />
//                 About {tutor?.name}
//               </h3>
//               <p className="text-[#005482]/70 leading-relaxed">
//                 {tutor?.bio || 'No biography provided.'}
//               </p>
//             </motion.div>

//             {/* Teaching Details */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-6"
//             >
//               <h3 className="text-xl font-bold text-[#005482] mb-6 flex items-center gap-3">
//                 <FaChalkboardTeacher />
//                 Teaching Details
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-[#005482] mb-4 flex items-center gap-2">
//                     <FaBook className="text-[#70C5D7]" />
//                     Subjects
//                   </h4>
//                   <div className="space-y-2">
//                     {tutor?.subjects?.length ? tutor.subjects.map((subject, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center gap-2 text-[#005482]/70"
//                       >
//                         <div className="w-2 h-2 bg-[#70C5D7] rounded-full"></div>
//                         <span>{subject}</span>
//                       </div>
//                     )) : 'No subjects specified'}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-[#005482] mb-4 flex items-center gap-2">
//                     <FaClock className="text-[#70C5D7]" />
//                     Availability
//                   </h4>
//                   <div className="space-y-2">
//                     {tutor?.availability?.length ? tutor.availability.map((time, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center gap-2 text-[#005482]/70"
//                       >
//                         <div className="w-2 h-2 bg-[#70C5D7] rounded-full"></div>
//                         <span>{time}</span>
//                       </div>
//                     )) : 'Availability not specified'}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Reviews Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-6"
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-[#005482] flex items-center gap-3">
//                   <FaStar className="text-[#FCBB45]" />
//                   Student Reviews
//                 </h3>
//                 {user && !hasUserRated && hasPaidForTutor && (
//                   <button
//                     onClick={() => navigate(`/dashboard/rate-tutor/${tutor?._id}`)}
//                     className="inline-flex items-center gap-2 px-4 py-2 bg-[#70C5D7]/10 text-[#70C5D7] rounded-xl hover:bg-[#70C5D7]/20 transition-colors text-sm"
//                   >
//                     <FaStar />
//                     <span>Write a Review</span>
//                   </button>
//                 )}
//               </div>

//               {ratings?.length > 0 ? (
//                 <div className="space-y-6">
//                   {(showAllReviews ? ratings : ratings.slice(0, 3)).map((rating, index) => (
//                     <div
//                       key={index}
//                       className="border-b border-[#70C5D7]/10 last:border-0 pb-6 last:pb-0"
//                     >
//                       <div className="flex items-start gap-4">
//                         <div className="flex-shrink-0">
//                           <div className="w-10 h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center">
//                             <FaUser className="text-[#70C5D7]" />
//                           </div>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2 mb-2">
//                             <div className="flex">
//                               {[...Array(5)].map((_, i) => (
//                                 <FaStar
//                                   key={i}
//                                   className={i < rating.rating ? "text-[#FCBB45]" : "text-[#70C5D7]/20"}
//                                 />
//                               ))}
//                             </div>
//                             <span className="text-sm text-[#005482]/60">
//                               {new Date(rating.date).toLocaleDateString()}
//                             </span>
//                           </div>
//                           <p className="text-[#005482]/70">{rating.comment}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   {ratings.length > 3 && (
//                     <button
//                       onClick={() => setShowAllReviews(!showAllReviews)}
//                       className="w-full text-center text-[#70C5D7] hover:text-[#005482] transition-colors"
//                     >
//                       {showAllReviews ? (
//                         <span className="inline-flex items-center gap-2">
//                           <FaChevronUp />
//                           Show Less
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center gap-2">
//                           <FaChevronDown />
//                           Show All Reviews ({ratings.length})
//                         </span>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <FaComments className="text-[#70C5D7] text-4xl mx-auto mb-4" />
//                   <p className="text-[#005482]/60">No reviews yet</p>
//                 </div>
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const RatingForm = ({ tutorId }) => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [rating, setRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const onSubmit = async (data) => {
//     if (rating === 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Rating Required',
//         text: 'Please select a rating before submitting',
//         confirmButtonColor: '#005482',
//       });
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       // Check if user has already rated this tutor
//       const existingRatings = await axiosSecure.get(`/ratings/${tutorId}`);
//       const hasRated = existingRatings.data.some(r => r.studentEmail === user.email);

//       if (hasRated) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Already Rated',
//           text: 'You have already submitted a review for this tutor.',
//           confirmButtonColor: '#005482',
//         });
//         return;
//       }

//       const ratingData = {
//         tutorId,
//         studentEmail: user.email,
//         rating: rating,
//         comment: data.comment,
//         date: new Date().toISOString()
//       };

//       const res = await axiosSecure.post('/ratings', ratingData);
//       if (res.data.success) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Rating Submitted',
//           text: 'Thank you for your feedback!',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         setRating(0);
//         reset();
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error('Rating submission failed', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to submit rating. Please try again.',
//         confirmButtonColor: '#005482',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((value) => (
//             <button
//               key={value}
//               type="button"
//               onClick={() => setRating(value)}
//               onMouseEnter={() => setHoveredRating(value)}
//               onMouseLeave={() => setHoveredRating(0)}
//               className="focus:outline-none"
//               disabled={isSubmitting}
//             >
//               <FaStar 
//                 className={`text-3xl transition-colors duration-200 ${
//                   value <= (hoveredRating || rating) 
//                     ? 'text-[#FCBB45]' 
//                     : 'text-gray-300'
//                 }`}
//               />
//             </button>
//           ))}
//         </div>
//         {rating === 0 && (
//           <p className="text-sm text-red-500 mt-1">Please select a rating</p>
//         )}
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
//         <textarea
//           {...register('comment', { 
//             required: 'Please write a review',
//             minLength: { value: 10, message: 'Review must be at least 10 characters' }
//           })}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent transition-all resize-none"
//           rows="4"
//           placeholder="Share your experience with this tutor..."
//           disabled={isSubmitting}
//         ></textarea>
//         {errors.comment && (
//           <p className="text-sm text-red-500 mt-1">{errors.comment.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className={`w-full px-6 py-3 bg-[#005482] text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
//           isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#004368]'
//         }`}
//       >
//         {isSubmitting ? (
//           <>
//             <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
//             <span>Submitting...</span>
//           </>
//         ) : (
//           <>
//             <FaStar className="text-sm" /> Submit Review
//           </>
//         )}
//       </button>
//     </form>
//   );
// };

// export default TeacherDetails;

// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useContext, useState, useEffect } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';
// import {
//   FaUserGraduate, FaDollarSign, FaBook, FaChalkboardTeacher, FaStar, FaMapMarkerAlt,
//   FaLanguage, FaArrowLeft, FaQuoteLeft, FaEnvelope, FaPhone, FaCheckCircle,
//   FaWhatsapp, FaShare, FaChevronUp, FaChevronDown, FaLock
// } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';

// const TeacherDetails = () => {
//   const { tutorId } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [hasUserRated, setHasUserRated] = useState(false);
//   const [hasPaidForTutor, setHasPaidForTutor] = useState(false);

//   const { data: tutor, isLoading: tutorLoading, error: tutorError } = useQuery({
//     queryKey: ['tutor', tutorId],
//     queryFn: async () => {
//       if (!tutorId) throw new Error('Invalid tutor ID');
//       const res = await axiosSecure.get(`/tutors/${tutorId}`);
//       return res.data;
//     },
//   });

//   const { data: ratings, isLoading: ratingsLoading, error: ratingsError } = useQuery({
//     queryKey: ['ratings', tutorId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/ratings/${tutorId}`);
//       if (user) {
//         const hasRated = res.data.some(rating => rating.studentEmail === user.email);
//         setHasUserRated(hasRated);
//       }
//       return res.data;
//     },
//   });

//   const { data: payments, isLoading: paymentsLoading, error: paymentsError } = useQuery({
//     queryKey: ['payments', user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments/${user.email}`);
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (payments && tutor) {
//       const paidTutorEmails = payments.flatMap(payment => payment.tutorEmails || []);
//       setHasPaidForTutor(paidTutorEmails.includes(tutor.email));
//     }
//   }, [payments, tutor]);

//   const handleBookTutor = async () => {
//     if (!user) {
//       Swal.fire({
//         icon: 'info',
//         title: 'Login Required',
//         text: 'Please log in to book a tutor.',
//         confirmButtonText: 'Login',
//       }).then(() => navigate('/login'));
//       return;
//     }

//     try {
//       const existingBooking = await axiosSecure.get(`/carts?email=${user.email}`);
//       const alreadyBooked = existingBooking.data.find(item => item.tutorId === tutor._id);

//       if (alreadyBooked) {
//         Swal.fire({
//           icon: 'info',
//           title: 'Already Booked',
//           text: 'You have already booked this tutor.',
//         });
//         return;
//       }

//       await axiosSecure.post('/carts', {
//         email: user.email,
//         tutorId: tutor._id,
//         tutorName: tutor.name,
//         subject: tutor.subjects?.[0] || 'Not specified',
//         price: tutor.hourlyRate,
//         status: 'Pending',
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Tutor booked successfully!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//       navigate('/dashboard/my-bookings');
//     } catch (error) {
//       console.error('Error booking tutor:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to book tutor. Please try again.',
//       });
//     }
//   };

//   const handleContactClick = () => {
//     if (!user) {
//       Swal.fire({
//         title: 'Login Required',
//         text: 'Please login to contact the tutor',
//         icon: 'info',
//         showCancelButton: true,
//         confirmButtonText: 'Login',
//         cancelButtonText: 'Cancel'
//       }).then(result => {
//         if (result.isConfirmed) {
//           navigate('/login');
//         }
//       });
//       return;
//     }

//     if (!hasPaidForTutor) {
//       Swal.fire({
//         title: 'Subscription Required',
//         text: 'Please book this tutor first to get contact access',
//         icon: 'info',
//         showCancelButton: true,
//         confirmButtonText: 'Book Now',
//         cancelButtonText: 'Cancel'
//       }).then(result => {
//         if (result.isConfirmed) {
//           handleBookTutor();
//         }
//       });
//       return;
//     }

//     // Safeguard for invalid contactNumber
//     const cleanedNumber = tutor.contactNumber?.replace(/[^0-9]/g, '') || '';
//     if (!cleanedNumber) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'No valid contact number provided.',
//       });
//       return;
//     }

//     window.open(`https://wa.me/${cleanedNumber}`, '_blank');
//   };

//   if (tutorLoading || ratingsLoading || paymentsLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FFFFFF]"></div>
//       </div>
//     );
//   }

//   if (tutorError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//         <div className="text-white text-xl">Error: {tutorError.message}</div>
//       </div>
//     );
//   }

//   if (paymentsError) {
//     console.error('Payments error:', paymentsError);
//   }

//   if (!tutor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//         <div className="text-white text-xl">Tutor not found</div>
//       </div>
//     );
//   }

//   const averageRating = ratings?.length > 0 ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length : 0;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC]">
//       {/* Hero Section */}
//       <div className="relative bg-[#005482] text-white">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#005482] via-[#005482]/90 to-[#70C5D7]/20"></div>
//         <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="flex items-center justify-between mb-8">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-white hover:text-[#70C5D7] transition-colors duration-300"
//             >
//               <FaArrowLeft /> Back to Search
//             </button>
//             <div className="text-sm breadcrumbs">
//               <span className="opacity-75">Tutors</span>
//               <span className="mx-2">›</span>
//               <span>{tutor.name}</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//             <div className="lg:col-span-4">
//               <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
//                 <img
//                   src={tutor.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
//                   alt={tutor.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#005482] via-[#005482]/50 to-transparent"></div>
//               </div>
//             </div>
//             <div className="lg:col-span-8">
//               <div className="space-y-4">
//                 <h1 className="text-5xl font-bold mb-2 text-white bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">
//                   {tutor.name}
//                 </h1>
//                 <div className="flex items-center gap-3">
//                   <span className="text-xl text-[#70C5D7]">{tutor.subjects?.[0] || 'Not specified'}</span>
//                   <span className="w-2 h-2 rounded-full bg-[#70C5D7]/30"></span>
//                   <span className="text-white/80">{tutor.location || 'Location not specified'}</span>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-4 my-8">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
//                   <div className="text-sm text-[#70C5D7] mb-1">Experience</div>
//                   <div className="text-2xl font-bold text-white">{tutor.experience || 0} Years</div>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
//                   <div className="text-sm text-[#70C5D7] mb-1">Hourly Rate</div>
//                   <div className="text-2xl font-bold text-white">${tutor.hourlyRate || 0}</div>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
//                   <div className="text-sm text-[#70C5D7] mb-1">Rating</div>
//                   <div className="flex items-center gap-3">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar key={i} className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-white/30"} />
//                       ))}
//                     </div>
//                     <span className="text-xl font-bold text-white">({ratings?.length || 0})</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4 mt-8">
//                 <button
//                   onClick={handleBookTutor}
//                   className="px-8 py-3 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 >
//                   <FaCheckCircle className="text-sm" /> Book Now
//                 </button>
//                 <button
//                   onClick={handleContactClick}
//                   className={`px-8 py-3 border ${
//                     hasPaidForTutor
//                       ? 'border-white/30 hover:border-white text-white hover:bg-[#25D366] hover:border-[#25D366]'
//                       : 'border-white/10 text-white/50 cursor-not-allowed'
//                   } rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
//                   disabled={!hasPaidForTutor}
//                 >
//                   {hasPaidForTutor ? (
//                     <>
//                       <FaWhatsapp className="text-lg" /> Contact Me
//                     </>
//                   ) : (
//                     <>
//                       <FaLock className="text-sm" /> Contact Locked
//                     </>
//                   )}
//                 </button>
//                 <button
//                   className="w-10 h-10 flex items-center justify-center border border-white/30 hover:border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
//                 >
//                   <FaShare className="text-sm" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Sidebar */}
//           <div className="lg:col-span-4 space-y-6">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-6 sticky top-8"
//             >
//               <h3 className="text-xl font-bold text-[#005482] mb-6">Contact Information</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
//                     <FaEnvelope className="text-[#FCBB45]" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-gray-500">Email</div>
//                     <div className="text-[#005482]">{tutor.email || 'Not provided'}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
//                     <FaPhone className="text-[#FCBB45]" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-gray-500">Phone</div>
//                     <div className="text-[#005482]">{tutor.contactNumber || 'Not provided'}</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
//                     <FaMapMarkerAlt className="text-[#FCBB45]" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-gray-500">Location</div>
//                     <div className="text-[#005482]">{tutor.location || 'Location not specified'}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <h3 className="text-xl font-bold text-[#005482] mb-6">Languages</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {(tutor.languages || ['English']).map((language, index) => (
//                     <span
//                       key={index}
//                       className="bg-[#70C5D7]/10 text-[#005482] px-4 py-2 rounded-full text-sm font-medium"
//                     >
//                       {language}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <h3 className="text-xl font-bold text-[#005482] mb-6">Teaching Mode</h3>
//                 <div className="p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="flex items-center gap-3 mb-2">
//                     <FaChalkboardTeacher className="text-[#FCBB45]" />
//                     <span className="text-[#005482] font-medium">{tutor.teachingMode || 'Not specified'}</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Main Content Area */}
//           <div className="lg:col-span-8 space-y-8">
//             {/* About Section */}
//             <motion.section
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-8"
//             >
//               <h2 className="text-2xl font-bold text-[#005482] mb-6 flex items-center gap-3">
//                 <FaUserGraduate className="text-[#FCBB45]" /> Professional Summary
//               </h2>
//               <div className="prose max-w-none text-gray-600">
//                 <p className="text-lg leading-relaxed">{tutor.bio || 'No bio provided'}</p>
//               </div>
//             </motion.section>

//             {/* Expertise Section */}
//             <motion.section
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-8"
//             >
//               <h2 className="text-2xl font-bold text-[#005482] mb-6 flex items-center gap-3">
//                 <FaBook className="text-[#FCBB45]" /> Areas of Expertise
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-[#70C5D7]/5 rounded-xl p-6">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="p-3 bg-[#FCBB45]/10 rounded-lg">
//                       <FaUserGraduate className="text-2xl text-[#FCBB45]" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-[#005482]">Education</h3>
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-gray-700 font-medium">{tutor.educationalQualifications || 'Not specified'}</p>
//                     <p className="text-sm text-gray-500">{tutor.institution || 'Not specified'}</p>
//                   </div>
//                 </div>

//                 <div className="bg-[#70C5D7]/5 rounded-xl p-6">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="p-3 bg-[#FCBB45]/10 rounded-lg">
//                       <FaBook className="text-2xl text-[#FCBB45]" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-[#005482]">Teaching Subjects</h3>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {(tutor.subjects || []).map((subject, index) => (
//                       <span
//                         key={index}
//                         className="bg-[#005482] text-white px-4 py-2 rounded-full text-sm font-medium"
//                       >
//                         {subject}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.section>

//             {/* Reviews Section */}
//             <motion.section
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-8"
//             >
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-2xl font-bold text-[#005482] flex items-center gap-3">
//                   <FaStar className="text-[#FCBB45]" /> Student Reviews
//                 </h2>
//                 <div className="flex items-center gap-2">
//                   <div className="text-3xl font-bold text-[#005482]">{averageRating.toFixed(1)}</div>
//                   <div className="flex flex-col">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar key={i} className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-gray-200"} />
//                       ))}
//                     </div>
//                     <div className="text-sm text-gray-500">{ratings?.length || 0} reviews</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Add Rating Form */}
//               {user && !hasUserRated ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-8 p-6 bg-[#70C5D7]/5 rounded-xl"
//                 >
//                   <h3 className="text-xl font-bold text-[#005482] mb-4">Rate this Tutor</h3>
//                   <RatingForm tutorId={tutorId} />
//                 </motion.div>
//               ) : user && hasUserRated ? (
//                 <div className="mb-8 p-4 bg-yellow-50 rounded-xl text-yellow-700">
//                   You have already submitted a review for this tutor.
//                 </div>
//               ) : null}

//               {ratingsError && (
//                 <div className="text-[#DA3A60] bg-[#DA3A60]/10 p-4 rounded-xl">
//                   Failed to load reviews.
//                 </div>
//               )}

//               {ratings && ratings.length > 0 ? (
//                 <div className="space-y-6">
//                   {(showAllReviews ? ratings : ratings.slice(0, 2)).map((review, index) => (
//                     <div
//                       key={index}
//                       className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-[#70C5D7]/5"
//                     >
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-2">
//                           {[...Array(5)].map((_, i) => (
//                             <FaStar
//                               key={i}
//                               className={i < review.rating ? "text-[#FCBB45]" : "text-gray-300"}
//                             />
//                           ))}
//                           <span className="ml-2 text-[#005482] font-medium">
//                             {review.rating}/5
//                           </span>
//                         </div>
//                         <span className="text-sm text-gray-500">
//                           {new Date(review.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>

//                       <div className="flex items-start gap-4">
//                         <div className="p-3 bg-white rounded-xl">
//                           <FaQuoteLeft className="text-[#70C5D7] text-xl" />
//                         </div>
//                         <div>
//                           <p className="text-gray-700 italic mb-3">{review.comment}</p>
//                           <p className="text-sm text-[#005482] font-medium">
//                             {review.studentEmail}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   {ratings.length > 2 && (
//                     <div className="text-center mt-8">
//                       <button
//                         onClick={() => setShowAllReviews(!showAllReviews)}
//                         className="px-6 py-3 bg-[#005482] text-white rounded-lg hover:bg-[#004368] transition-all duration-300 inline-flex items-center gap-2"
//                       >
//                         {showAllReviews ? (
//                           <>Show Less <FaChevronUp className="text-sm" /></>
//                         ) : (
//                           <>View More Reviews ({ratings.length - 2}) <FaChevronDown className="text-sm" /></>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-16 bg-[#70C5D7]/5 rounded-xl">
//                   <FaStar className="text-[#FCBB45] text-5xl mx-auto mb-4" />
//                   <p className="text-xl text-[#005482] font-medium mb-2">No Reviews Yet</p>
//                   <p className="text-gray-500">Be the first to review this tutor</p>
//                 </div>
//               )}
//             </motion.section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const RatingForm = ({ tutorId }) => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [rating, setRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);

//   const onSubmit = async (data) => {
//     if (rating === 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Rating Required',
//         text: 'Please select a rating before submitting',
//       });
//       return;
//     }

//     try {
//       const existingRatings = await axiosSecure.get(`/ratings/${tutorId}`);
//       const hasRated = existingRatings.data.some(r => r.studentEmail === user.email);

//       if (hasRated) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Already Rated',
//           text: 'You have already submitted a review for this tutor.',
//         });
//         return;
//       }

//       const ratingData = {
//         tutorId,
//         studentEmail: user.email,
//         rating: rating,
//         comment: data.comment,
//         createdAt: new Date()
//       };

//       const res = await axiosSecure.post('/ratings', ratingData);
//       if (res.data) {
//         queryClient.invalidateQueries(['ratings', tutorId]);
//         Swal.fire({
//           icon: 'success',
//           title: 'Rating Submitted',
//           text: 'Thank you for your feedback!',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         setRating(0);
//         reset();
//       }
//     } catch (error) {
//       console.error('Rating submission failed', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to submit rating. Please try again.',
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((value) => (
//             <button
//               key={value}
//               type="button"
//               onClick={() => setRating(value)}
//               onMouseEnter={() => setHoveredRating(value)}
//               onMouseLeave={() => setHoveredRating(0)}
//               className="focus:outline-none"
//             >
//               <FaStar
//                 className={`text-3xl transition-colors duration-200 ${
//                   value <= (hoveredRating || rating)
//                     ? 'text-[#FCBB45]'
//                     : 'text-gray-300'
//                 }`}
//               />
//             </button>
//           ))}
//         </div>
//         {rating === 0 && (
//           <p className="text-sm text-red-500 mt-1">Please select a rating</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
//         <textarea
//           {...register('comment', {
//             required: 'Please write a review',
//             minLength: { value: 10, message: 'Review must be at least 10 characters' }
//           })}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent transition-all resize-none"
//           rows="4"
//           placeholder="Share your experience with this tutor..."
//         ></textarea>
//         {errors.comment && (
//           <p className="text-sm text-red-500 mt-1">{errors.comment.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full px-6 py-3 bg-[#005482] text-white rounded-lg hover:bg-[#004368] transition-all duration-300 flex items-center justify-center gap-2"
//       >
//         <FaStar className="text-sm" /> Submit Review
//       </button>
//     </form>
//   );
// };

// export default TeacherDetails;

// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useContext, useState, useEffect } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';
// import {
//   FaUserGraduate, FaDollarSign, FaBook, FaChalkboardTeacher, FaStar, FaMapMarkerAlt,
//   FaLanguage, FaArrowLeft, FaQuoteLeft, FaEnvelope, FaPhone, FaCheckCircle,
//   FaWhatsapp, FaShare, FaChevronUp, FaChevronDown, FaLock
// } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';

// const TeacherDetails = () => {
//   const { tutorId } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [hasUserRated, setHasUserRated] = useState(false);
//   const [hasPaidForTutor, setHasPaidForTutor] = useState(false);

//   const { data: tutor, isLoading: tutorLoading, error: tutorError } = useQuery({
//     queryKey: ['tutor', tutorId],
//     queryFn: async () => {
//       if (!tutorId) throw new Error('Invalid tutor ID');
//       const res = await axiosSecure.get(`/tutors/${tutorId}`);
//       return res.data;
//     },
//   });

//   const { data: ratings, isLoading: ratingsLoading, error: ratingsError } = useQuery({
//     queryKey: ['ratings', tutorId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/ratings/${tutorId}`);
//       if (user) {
//         const hasRated = res.data.some(rating => rating.studentEmail === user.email);
//         setHasUserRated(hasRated);
//       }
//       return res.data;
//     },
//   });

//   const { data: payments, isLoading: paymentsLoading, error: paymentsError } = useQuery({
//     queryKey: ['payments', user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments/${user.email}`);
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (payments && tutor) {
//       const paidTutorEmails = payments.flatMap(payment => payment.tutorEmails || []);
//       setHasPaidForTutor(paidTutorEmails.includes(tutor.email));
//     }
//   }, [payments, tutor]);

//   const handleBookTutor = async () => {
//     if (!user) {
//       Swal.fire({
//         icon: 'info',
//         title: 'Login Required',
//         text: 'Please log in to book a tutor.',
//         confirmButtonText: 'Login',
//       }).then(() => navigate('/login'));
//       return;
//     }

//     try {
//       const existingBooking = await axiosSecure.get(`/carts?email=${user.email}`);
//       const alreadyBooked = existingBooking.data.find(item => item.tutorId === tutor._id);

//       if (alreadyBooked) {
//         Swal.fire({
//           icon: 'info',
//           title: 'Already Booked',
//           text: 'You have already booked this tutor.',
//         });
//         return;
//       }

//       await axiosSecure.post('/carts', {
//         email: user.email,
//         tutorId: tutor._id,
//         tutorName: tutor.name,
//         subject: tutor.subjects?.[0] || 'Not specified',
//         price: tutor.hourlyRate,
//         status: 'Pending',
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Tutor booked successfully!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//       navigate('/dashboard/my-bookings');
//     } catch (error) {
//       console.error('Error booking tutor:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to book tutor. Please try again.',
//       });
//     }
//   };

//   const handleContactClick = () => {
//     if (!user) {
//       Swal.fire({
//         title: 'Login Required',
//         text: 'Please login to contact the tutor',
//         icon: 'info',
//         showCancelButton: true,
//         confirmButtonText: 'Login',
//         cancelButtonText: 'Cancel'
//       }).then(result => {
//         if (result.isConfirmed) {
//           navigate('/login');
//         }
//       });
//       return;
//     }

//     if (!hasPaidForTutor) {
//       Swal.fire({
//         title: 'Subscription Required',
//         text: 'Please book this tutor first to get contact access',
//         icon: 'info',
//         showCancelButton: true,
//         confirmButtonText: 'Book Now',
//         cancelButtonText: 'Cancel'
//       }).then(result => {
//         if (result.isConfirmed) {
//           handleBookTutor();
//         }
//       });
//       return;
//     }

//     // Safeguard for invalid contactNumber
//     const cleanedNumber = tutor.contactNumber?.replace(/[^0-9]/g, '') || '';
//     if (!cleanedNumber) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'No valid contact number provided.',
//       });
//       return;
//     }

//     window.open(`https://wa.me/${cleanedNumber}`, '_blank');
//   };

//   if (tutorLoading || ratingsLoading || paymentsLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FFFFFF]"></div>
//       </div>
//     );
//   }

//   if (tutorError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//         <div className="text-white text-xl">Error: {tutorError.message}</div>
//       </div>
//     );
//   }

//   if (paymentsError) {
//     console.error('Payments error:', paymentsError);
//   }

//   if (!tutor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//         <div className="text-white text-xl">Tutor not found</div>
//       </div>
//     );
//   }

//   const averageRating = ratings?.length > 0 ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length : 0;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC]">
//       {/* Hero Section */}
//       <div className="relative bg-[#005482] text-white">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#005482] via-[#005482]/90 to-[#70C5D7]/20"></div>
//         <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="flex items-center justify-between mb-8">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-white hover:text-[#70C5D7] transition-colors duration-300"
//             >
//               <FaArrowLeft /> Back to Search
//             </button>
//             <div className="text-sm breadcrumbs">
//               <span className="opacity-75">Tutors</span>
//               <span className="mx-2">›</span>
//               <span>{tutor.name}</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//             <div className="lg:col-span-4">
//               <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
//                 <img
//                   src={tutor.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
//                   alt={tutor.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#005482] via-[#005482]/50 to-transparent"></div>
//               </div>
//             </div>
//             <div className="lg:col-span-8">
//               <div className="space-y-4">
//                 <h1 className="text-5xl font-bold mb-2 text-white bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">
//                   {tutor.name}
//                 </h1>
//                 <div className="flex items-center gap-3">
//                   <span className="text-xl text-[#70C5D7]">{tutor.subjects?.[0] || 'Not specified'}</span>
//                   <span className="w-2 h-2 rounded-full bg-[#70C5D7]/30"></span>
//                   <span className="text-white/80">{tutor.location || 'Location not specified'}</span>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-4 my-8">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
//                   <div className="text-sm text-[#70C5D7] mb-1">Experience</div>
//                   <div className="text-2xl font-bold text-white">{tutor.experience || 0} Years</div>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
//                   <div className="text-sm text-[#70C5D7] mb-1">Hourly Rate</div>
//                   <div className="text-2xl font-bold text-white">${tutor.hourlyRate || 0}</div>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
//                   <div className="text-sm text-[#70C5D7] mb-1">Rating</div>
//                   <div className="flex items-center gap-3">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar key={i} className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-white/30"} />
//                       ))}
//                     </div>
//                     <span className="text-xl font-bold text-white">({ratings?.length || 0})</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4 mt-8">
//                 <button
//                   onClick={handleBookTutor}
//                   className="px-8 py-3 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 >
//                   <FaCheckCircle className="text-sm" /> Book Now
//                 </button>
//                 <button
//                   onClick={handleContactClick}
//                   className={`px-8 py-3 border ${
//                     hasPaidForTutor
//                       ? 'border-white/30 hover:border-white text-white hover:bg-[#25D366] hover:border-[#25D366]'
//                       : 'border-white/10 text-white/50 cursor-not-allowed'
//                   } rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
//                   disabled={!hasPaidForTutor}
//                 >
//                   {hasPaidForTutor ? (
//                     <>
//                       <FaWhatsapp className="text-lg" /> Contact Me
//                     </>
//                   ) : (
//                     <>
//                       <FaLock className="text-sm" /> Contact Locked
//                     </>
//                   )}
//                 </button>
//                 <button
//                   className="w-10 h-10 flex items-center justify-center border border-white/30 hover:border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
//                 >
//                   <FaShare className="text-sm" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Sidebar */}
//           <div className="lg:col-span-4 space-y-6">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-6 sticky top-8"
//             >
//               <h3 className="text-xl font-bold text-[#005482] mb-6">Contact Information</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
//                     <FaEnvelope className="text-[#FCBB45]" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-gray-500">Email</div>
//                     {hasPaidForTutor ? (
//                       <div className="text-[#005482]">{tutor.email || 'Not provided'}</div>
//                     ) : (
//                       <div className="flex items-center gap-2 text-gray-400">
//                         <FaLock className="text-sm" />
//                         <span>Book tutor to view email</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
//                     <FaPhone className="text-[#FCBB45]" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-gray-500">Phone</div>
//                     {hasPaidForTutor ? (
//                       <div className="text-[#005482]">{tutor.contactNumber || 'Not provided'}</div>
//                     ) : (
//                       <div className="flex items-center gap-2 text-gray-400">
//                         <FaLock className="text-sm" />
//                         <span>Book tutor to view phone</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
//                     <FaMapMarkerAlt className="text-[#FCBB45]" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-gray-500">Location</div>
//                     <div className="text-[#005482]">{tutor.location || 'Location not specified'}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <h3 className="text-xl font-bold text-[#005482] mb-6">Languages</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {(tutor.languages || ['English']).map((language, index) => (
//                     <span
//                       key={index}
//                       className="bg-[#70C5D7]/10 text-[#005482] px-4 py-2 rounded-full text-sm font-medium"
//                     >
//                       {language}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <h3 className="text-xl font-bold text-[#005482] mb-6">Teaching Mode</h3>
//                 <div className="p-4 bg-[#70C5D7]/5 rounded-xl">
//                   <div className="flex items-center gap-3 mb-2">
//                     <FaChalkboardTeacher className="text-[#FCBB45]" />
//                     <span className="text-[#005482] font-medium">{tutor.teachingMode || 'Not specified'}</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Main Content Area */}
//           <div className="lg:col-span-8 space-y-8">
//             {/* About Section */}
//             <motion.section
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-8"
//             >
//               <h2 className="text-2xl font-bold text-[#005482] mb-6 flex items-center gap-3">
//                 <FaUserGraduate className="text-[#FCBB45]" /> Professional Summary
//               </h2>
//               <div className="prose max-w-none text-gray-600">
//                 <p className="text-lg leading-relaxed">{tutor.bio || 'No bio provided'}</p>
//               </div>
//             </motion.section>

//             {/* Expertise Section */}
//             <motion.section
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-8"
//             >
//               <h2 className="text-2xl font-bold text-[#005482] mb-6 flex items-center gap-3">
//                 <FaBook className="text-[#FCBB45]" /> Areas of Expertise
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-[#70C5D7]/5 rounded-xl p-6">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="p-3 bg-[#FCBB45]/10 rounded-lg">
//                       <FaUserGraduate className="text-2xl text-[#FCBB45]" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-[#005482]">Education</h3>
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-gray-700 font-medium">{tutor.educationalQualifications || 'Not specified'}</p>
//                     <p className="text-sm text-gray-500">{tutor.institution || 'Not specified'}</p>
//                   </div>
//                 </div>

//                 <div className="bg-[#70C5D7]/5 rounded-xl p-6">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="p-3 bg-[#FCBB45]/10 rounded-lg">
//                       <FaBook className="text-2xl text-[#FCBB45]" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-[#005482]">Teaching Subjects</h3>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {(tutor.subjects || []).map((subject, index) => (
//                       <span
//                         key={index}
//                         className="bg-[#005482] text-white px-4 py-2 rounded-full text-sm font-medium"
//                       >
//                         {subject}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.section>

//             {/* Reviews Section */}
//             <motion.section
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-sm p-8"
//             >
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-2xl font-bold text-[#005482] flex items-center gap-3">
//                   <FaStar className="text-[#FCBB45]" /> Student Reviews
//                 </h2>
//                 <div className="flex items-center gap-2">
//                   <div className="text-3xl font-bold text-[#005482]">{averageRating.toFixed(1)}</div>
//                   <div className="flex flex-col">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar key={i} className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-gray-200"} />
//                       ))}
//                     </div>
//                     <div className="text-sm text-gray-500">{ratings?.length || 0} reviews</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Add Rating Form */}
//               {user && !hasUserRated ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-8 p-6 bg-[#70C5D7]/5 rounded-xl"
//                 >
//                   <h3 className="text-xl font-bold text-[#005482] mb-4">Rate this Tutor</h3>
//                   <RatingForm tutorId={tutorId} />
//                 </motion.div>
//               ) : user && hasUserRated ? (
//                 <div className="mb-8 p-4 bg-yellow-50 rounded-xl text-yellow-700">
//                   You have already submitted a review for this tutor.
//                 </div>
//               ) : null}

//               {ratingsError && (
//                 <div className="text-[#DA3A60] bg-[#DA3A60]/10 p-4 rounded-xl">
//                   Failed to load reviews.
//                 </div>
//               )}

//               {ratings && ratings.length > 0 ? (
//                 <div className="space-y-6">
//                   {(showAllReviews ? ratings : ratings.slice(0, 2)).map((review, index) => (
//                     <div
//                       key={index}
//                       className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-[#70C5D7]/5"
//                     >
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-2">
//                           {[...Array(5)].map((_, i) => (
//                             <FaStar
//                               key={i}
//                               className={i < review.rating ? "text-[#FCBB45]" : "text-gray-300"}
//                             />
//                           ))}
//                           <span className="ml-2 text-[#005482] font-medium">
//                             {review.rating}/5
//                           </span>
//                         </div>
//                         <span className="text-sm text-gray-500">
//                           {new Date(review.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>

//                       <div className="flex items-start gap-4">
//                         <div className="p-3 bg-white rounded-xl">
//                           <FaQuoteLeft className="text-[#70C5D7] text-xl" />
//                         </div>
//                         <div>
//                           <p className="text-gray-700 italic mb-3">{review.comment}</p>
//                           <p className="text-sm text-[#005482] font-medium">
//                             {review.studentEmail}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   {ratings.length > 2 && (
//                     <div className="text-center mt-8">
//                       <button
//                         onClick={() => setShowAllReviews(!showAllReviews)}
//                         className="px-6 py-3 bg-[#005482] text-white rounded-lg hover:bg-[#004368] transition-all duration-300 inline-flex items-center gap-2"
//                       >
//                         {showAllReviews ? (
//                           <>Show Less <FaChevronUp className="text-sm" /></>
//                         ) : (
//                           <>View More Reviews ({ratings.length - 2}) <FaChevronDown className="text-sm" /></>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-16 bg-[#70C5D7]/5 rounded-xl">
//                   <FaStar className="text-[#FCBB45] text-5xl mx-auto mb-4" />
//                   <p className="text-xl text-[#005482] font-medium mb-2">No Reviews Yet</p>
//                   <p className="text-gray-500">Be the first to review this tutor</p>
//                 </div>
//               )}
//             </motion.section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const RatingForm = ({ tutorId }) => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [rating, setRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);

//   const onSubmit = async (data) => {
//     if (rating === 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Rating Required',
//         text: 'Please select a rating before submitting',
//       });
//       return;
//     }

//     try {
//       const existingRatings = await axiosSecure.get(`/ratings/${tutorId}`);
//       const hasRated = existingRatings.data.some(r => r.studentEmail === user.email);

//       if (hasRated) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Already Rated',
//           text: 'You have already submitted a review for this tutor.',
//         });
//         return;
//       }

//       const ratingData = {
//         tutorId,
//         studentEmail: user.email,
//         rating: rating,
//         comment: data.comment,
//         createdAt: new Date()
//       };

//       const res = await axiosSecure.post('/ratings', ratingData);
//       if (res.data) {
//         queryClient.invalidateQueries(['ratings', tutorId]);
//         Swal.fire({
//           icon: 'success',
//           title: 'Rating Submitted',
//           text: 'Thank you for your feedback!',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         setRating(0);
//         reset();
//       }
//     } catch (error) {
//       console.error('Rating submission failed', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to submit rating. Please try again.',
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((value) => (
//             <button
//               key={value}
//               type="button"
//               onClick={() => setRating(value)}
//               onMouseEnter={() => setHoveredRating(value)}
//               onMouseLeave={() => setHoveredRating(0)}
//               className="focus:outline-none"
//             >
//               <FaStar
//                 className={`text-3xl transition-colors duration-200 ${
//                   value <= (hoveredRating || rating)
//                     ? 'text-[#FCBB45]'
//                     : 'text-gray-300'
//                 }`}
//               />
//             </button>
//           ))}
//         </div>
//         {rating === 0 && (
//           <p className="text-sm text-red-500 mt-1">Please select a rating</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
//         <textarea
//           {...register('comment', {
//             required: 'Please write a review',
//             minLength: { value: 10, message: 'Review must be at least 10 characters' }
//           })}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent transition-all resize-none"
//           rows="4"
//           placeholder="Share your experience with this tutor..."
//         ></textarea>
//         {errors.comment && (
//           <p className="text-sm text-red-500 mt-1">{errors.comment.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full px-6 py-3 bg-[#005482] text-white rounded-lg hover:bg-[#004368] transition-all duration-300 flex items-center justify-center gap-2"
//       >
//         <FaStar className="text-sm" /> Submit Review
//       </button>
//     </form>
//   );
// };

// export default TeacherDetails;



import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import {
  FaUserGraduate, FaDollarSign, FaBook, FaChalkboardTeacher, FaStar, FaMapMarkerAlt,
  FaLanguage, FaArrowLeft, FaQuoteLeft, FaEnvelope, FaPhone, FaCheckCircle,
  FaWhatsapp, FaShare, FaChevronUp, FaChevronDown, FaLock, FaThumbsUp
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const TeacherDetails = () => {
  const { tutorId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [hasUserRated, setHasUserRated] = useState(false);
  const [hasPaidForTutor, setHasPaidForTutor] = useState(false);
  const [hasConfirmedService, setHasConfirmedService] = useState(false);

  const { data: tutor, isLoading: tutorLoading, error: tutorError } = useQuery({
    queryKey: ['tutor', tutorId],
    queryFn: async () => {
      if (!tutorId) throw new Error('Invalid tutor ID');
      const res = await axiosSecure.get(`/tutors/${tutorId}`);
      return res.data;
    },
  });

  const { data: ratings, isLoading: ratingsLoading, error: ratingsError } = useQuery({
    queryKey: ['ratings', tutorId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ratings/${tutorId}`);
      if (user) {
        const hasRated = res.data.some(rating => rating.studentEmail === user.email);
        setHasUserRated(hasRated);
      }
      return res.data;
    },
  });

  const { data: payments, isLoading: paymentsLoading, error: paymentsError } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  const { data: confirmations, isLoading: confirmationsLoading } = useQuery({
    queryKey: ['confirmations', user?.email, tutorId],
    enabled: !!user?.email && !!tutorId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/confirmations?email=${user.email}&tutorId=${tutorId}`);
      const hasConfirmed = res.data.some(confirmation => confirmation.tutorId === tutorId);
      setHasConfirmedService(hasConfirmed);
      return res.data;
    },
  });

  useEffect(() => {
    if (payments && tutor) {
      const paidTutorEmails = payments.flatMap(payment => payment.tutorEmails || []);
      setHasPaidForTutor(paidTutorEmails.includes(tutor.email));
    }
  }, [payments, tutor]);

  const handleBookTutor = async () => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to book a tutor.',
        confirmButtonText: 'Login',
      }).then(() => navigate('/login'));
      return;
    }

    try {
      const existingBooking = await axiosSecure.get(`/carts?email=${user.email}`);
      const alreadyBooked = existingBooking.data.find(item => item.tutorId === tutor._id);

      if (alreadyBooked) {
        Swal.fire({
          icon: 'info',
          title: 'Already Booked',
          text: 'You have already booked this tutor.',
        });
        return;
      }

      await axiosSecure.post('/carts', {
        email: user.email,
        tutorId: tutor._id,
        tutorName: tutor.name,
        subject: tutor.subjects?.[0] || 'Not specified',
        price: tutor.hourlyRate,
        status: 'Pending',
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tutor booked successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/dashboard/my-bookings');
    } catch (error) {
      console.error('Error booking tutor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to book tutor. Please try again.',
      });
    }
  };

  const handleContactClick = () => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to contact the tutor',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    if (!hasPaidForTutor) {
      Swal.fire({
        title: 'Subscription Required',
        text: 'Please book this tutor first to get contact access',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Book Now',
        cancelButtonText: 'Cancel'
      }).then(result => {
        if (result.isConfirmed) {
          handleBookTutor();
        }
      });
      return;
    }

    const cleanedNumber = tutor.contactNumber?.replace(/[^0-9]/g, '') || '';
    if (!cleanedNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No valid contact number provided.',
      });
      return;
    }

    window.open(`https://wa.me/${cleanedNumber}`, '_blank');
  };

  const handleConfirmService = async () => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to confirm the service.',
        confirmButtonText: 'Login',
      }).then(() => navigate('/login'));
      return;
    }

    if (!hasPaidForTutor) {
      Swal.fire({
        title: 'Booking Required',
        text: 'Please book this tutor first to confirm the service.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Book Now',
        cancelButtonText: 'Cancel'
      }).then(result => {
        if (result.isConfirmed) {
          handleBookTutor();
        }
      });
      return;
    }

    if (hasConfirmedService) {
      Swal.fire({
        icon: 'info',
        title: 'Already Confirmed',
        text: 'You have already confirmed the service for this tutor.',
      });
      return;
    }

    try {
      await axiosSecure.post('/confirmations', {
        email: user.email,
        tutorId: tutor._id,
        tutorName: tutor.name,
        confirmedAt: new Date(),
      });

      Swal.fire({
        icon: 'success',
        title: 'Service Confirmed',
        text: 'Thank you for confirming the service!',
        timer: 1500,
        showConfirmButton: false,
      });

      setHasConfirmedService(true);
    } catch (error) {
      console.error('Error confirming service:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to confirm service. Please try again.',
      });
    }
  };

  if (tutorLoading || ratingsLoading || paymentsLoading || confirmationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FFFFFF]"></div>
      </div>
    );
  }

  if (tutorError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
        <div className="text-white text-xl">Error: {tutorError.message}</div>
      </div>
    );
  }

  if (paymentsError) {
    console.error('Payments error:', paymentsError);
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005482] to-[#70C5D7]">
        <div className="text-white text-xl">Tutor not found</div>
      </div>
    );
  }

  const averageRating = ratings?.length > 0 ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="relative bg-[#005482] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#005482] via-[#005482]/90 to-[#70C5D7]/20"></div>
        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-[#70C5D7] transition-colors duration-300"
            >
              <FaArrowLeft /> Back to Search
            </button>
            <div className="text-sm breadcrumbs">
              <span className="opacity-75">Tutors</span>
              <span className="mx-2">›</span>
              <span>{tutor.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={tutor.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
                  alt={tutor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#005482] via-[#005482]/50 to-transparent"></div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold mb-2 text-white bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">
                  {tutor.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-xl text-[#70C5D7]">{tutor.subjects?.[0] || 'Not specified'}</span>
                  <span className="w-2 h-2 rounded-full bg-[#70C5D7]/30"></span>
                  <span className="text-white/80">{tutor.location || 'Location not specified'}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 my-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="text-sm text-[#70C5D7] mb-1">Experience</div>
                  <div className="text-2xl font-bold text-white">{tutor.experience || 0} Years</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="text-sm text-[#70C5D7] mb-1">Hourly Rate</div>
                  <div className="text-2xl font-bold text-white">${tutor.hourlyRate || 0}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="text-sm text-[#70C5D7] mb-1">Rating</div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-white/30"} />
                      ))}
                    </div>
                    <span className="text-xl font-bold text-white">({ratings?.length || 0})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={handleBookTutor}
                  className="px-8 py-3 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FaCheckCircle className="text-sm" /> Book Now
                </button>
                <button
                  onClick={handleContactClick}
                  className={`px-8 py-3 border ${
                    hasPaidForTutor
                      ? 'border-white/30 hover:border-white text-white hover:bg-[#25D366] hover:border-[#25D366]'
                      : 'border-white/10 text-white/50 cursor-not-allowed'
                  } rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
                  disabled={!hasPaidForTutor}
                >
                  {hasPaidForTutor ? (
                    <>
                      <FaWhatsapp className="text-lg" /> Contact Me
                    </>
                  ) : (
                    <>
                      <FaLock className="text-sm" /> Contact Locked
                    </>
                  )}
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center border border-white/30 hover:border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  <FaShare className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 sticky top-8"
            >
              <h3 className="text-xl font-bold text-[#005482] mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
                    <FaEnvelope className="text-[#FCBB45]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    {hasPaidForTutor ? (
                      <div className="text-[#005482]">{tutor.email || 'Not provided'}</div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaLock className="text-sm" />
                        <span>Book tutor to view email</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
                    <FaPhone className="text-[#FCBB45]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    {hasPaidForTutor ? (
                      <div className="text-[#005482]">{tutor.contactNumber || 'Not provided'}</div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaLock className="text-sm" />
                        <span>Book tutor to view phone</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FCBB45]/10 rounded-lg">
                    <FaMapMarkerAlt className="text-[#FCBB45]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="text-[#005482]">{tutor.location || 'Location not specified'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#005482] mb-6">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {(tutor.languages || ['English']).map((language, index) => (
                    <span
                      key={index}
                      className="bg-[#70C5D7]/10 text-[#005482] px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#005482] mb-6">Teaching Mode</h3>
                <div className="p-4 bg-[#70C5D7]/5 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <FaChalkboardTeacher className="text-[#FCBB45]" />
                    <span className="text-[#005482] font-medium">{tutor.teachingMode || 'Not specified'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Confirm Service Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-[#005482] mb-6 flex items-center gap-3">
                <FaThumbsUp className="text-[#FCBB45]" /> Confirm Service
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed mb-4">
                  Did you receive the tutoring service perfectly? Confirm below to let us know!
                </p>
                <button
                  onClick={handleConfirmService}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    hasPaidForTutor && !hasConfirmedService
                      ? 'bg-[#005482] text-white hover:bg-[#004368] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!hasPaidForTutor || hasConfirmedService}
                >
                  <FaThumbsUp className="text-sm" />
                  {hasConfirmedService ? 'Service Confirmed' : 'Confirm Service Received'}
                </button>
              </div>
            </motion.section>

            {/* About Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-[#005482] mb-6 flex items-center gap-3">
                <FaUserGraduate className="text-[#FCBB45]" /> Professional Summary
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed">{tutor.bio || 'No bio provided'}</p>
              </div>
            </motion.section>

            {/* Expertise Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-[#005482] mb-6 flex items-center gap-3">
                <FaBook className="text-[#FCBB45]" /> Areas of Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#70C5D7]/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#FCBB45]/10 rounded-lg">
                      <FaUserGraduate className="text-2xl text-[#FCBB45]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#005482]">Education</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700 font-medium">{tutor.educationalQualifications || 'Not specified'}</p>
                    <p className="text-sm text-gray-500">{tutor.institution || 'Not specified'}</p>
                  </div>
                </div>

                <div className="bg-[#70C5D7]/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#FCBB45]/10 rounded-lg">
                      <FaBook className="text-2xl text-[#FCBB45]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#005482]">Teaching Subjects</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(tutor.subjects || []).map((subject, index) => (
                      <span
                        key={index}
                        className="bg-[#005482] text-white px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Reviews Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#005482] flex items-center gap-3">
                  <FaStar className="text-[#FCBB45]" /> Student Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-[#005482]">{averageRating.toFixed(1)}</div>
                  <div className="flex flex-col">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(averageRating) ? "text-[#FCBB45]" : "text-gray-200"} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">{ratings?.length || 0} reviews</div>
                  </div>
                </div>
              </div>

              {/* Add Rating Form */}
              {user && !hasUserRated ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-[#70C5D7]/5 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-[#005482] mb-4">Rate this Tutor</h3>
                  <RatingForm tutorId={tutorId} />
                </motion.div>
              ) : user && hasUserRated ? (
                <div className="mb-8 p-4 bg-yellow-50 rounded-xl text-yellow-700">
                  You have already submitted a review for this tutor.
                </div>
              ) : null}

              {ratingsError && (
                <div className="text-[#DA3A60] bg-[#DA3A60]/10 p-4 rounded-xl">
                  Failed to load reviews.
                </div>
              )}

              {ratings && ratings.length > 0 ? (
                <div className="space-y-6">
                  {(showAllReviews ? ratings : ratings.slice(0, 2)).map((review, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-[#70C5D7]/5"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < review.rating ? "text-[#FCBB45]" : "text-gray-300"}
                            />
                          ))}
                          <span className="ml-2 text-[#005482] font-medium">
                            {review.rating}/5
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-xl">
                          <FaQuoteLeft className="text-[#70C5D7] text-xl" />
                        </div>
                        <div>
                          <p className="text-gray-700 italic mb-3">{review.comment}</p>
                          <p className="text-sm text-[#005482] font-medium">
                            {review.studentEmail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {ratings.length > 2 && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="px-6 py-3 bg-[#005482] text-white rounded-lg hover:bg-[#004368] transition-all duration-300 inline-flex items-center gap-2"
                      >
                        {showAllReviews ? (
                          <>Show Less <FaChevronUp className="text-sm" /></>
                        ) : (
                          <>View More Reviews ({ratings.length - 2}) <FaChevronDown className="text-sm" /></>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#70C5D7]/5 rounded-xl">
                  <FaStar className="text-[#FCBB45] text-5xl mx-auto mb-4" />
                  <p className="text-xl text-[#005482] font-medium mb-2">No Reviews Yet</p>
                  <p className="text-gray-500">Be the first to review this tutor</p>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

const RatingForm = ({ tutorId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const onSubmit = async (data) => {
    if (rating === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Rating Required',
        text: 'Please select a rating before submitting',
      });
      return;
    }

    try {
      const existingRatings = await axiosSecure.get(`/ratings/${tutorId}`);
      const hasRated = existingRatings.data.some(r => r.studentEmail === user.email);

      if (hasRated) {
        Swal.fire({
          icon: 'error',
          title: 'Already Rated',
          text: 'You have already submitted a review for this tutor.',
        });
        return;
      }

      const ratingData = {
        tutorId,
        studentEmail: user.email,
        rating: rating,
        comment: data.comment,
        createdAt: new Date()
      };

      const res = await axiosSecure.post('/ratings', ratingData);
      if (res.data) {
        queryClient.invalidateQueries(['ratings', tutorId]);
        Swal.fire({
          icon: 'success',
          title: 'Rating Submitted',
          text: 'Thank you for your feedback!',
          showConfirmButton: false,
          timer: 1500,
        });
        setRating(0);
        reset();
      }
    } catch (error) {
      console.error('Rating submission failed', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit rating. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <FaStar
                className={`text-3xl transition-colors duration-200 ${
                  value <= (hoveredRating || rating)
                    ? 'text-[#FCBB45]'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {rating === 0 && (
          <p className="text-sm text-red-500 mt-1">Please select a rating</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
        <textarea
          {...register('comment', {
            required: 'Please write a review',
            minLength: { value: 10, message: 'Review must be at least 10 characters' }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent transition-all resize-none"
          rows="4"
          placeholder="Share your experience with this tutor..."
        ></textarea>
        {errors.comment && (
          <p className="text-sm text-red-500 mt-1">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-[#005482] text-white rounded-lg hover:bg-[#004368] transition-all duration-300 flex items-center justify-center gap-2"
      >
        <FaStar className="text-sm" /> Submit Review
      </button>
    </form>
  );
};

export default TeacherDetails;