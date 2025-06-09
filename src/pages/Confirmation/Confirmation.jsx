// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaUserGraduate, FaEnvelope, FaClock, FaTimes, FaEye, FaSearch, FaTrash } from 'react-icons/fa';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// // Skeleton loader
// const SkeletonCard = () => (
//   <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
//     <div className="flex items-center space-x-4">
//       <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
//       <div className="space-y-2 flex-1">
//         <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
//         <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
//       </div>
//     </div>
//     <div className="space-y-3">
//       <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
//       <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
//     </div>
//   </div>
// );

// const Confirmation = () => {
//   const axiosSecure = useAxiosSecure();
//   const [selectedConfirmation, setSelectedConfirmation] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Fetch all confirmations
//   const { data: confirmations = [], isLoading, error, refetch } = useQuery({
//     queryKey: ['confirmations'],
//     queryFn: async () => {
//       console.log('Fetching all confirmations');
//       try {
//         const res = await axiosSecure.get('/confirmations');
//         console.log('Fetched confirmations:', res.data);
//         return res.data;
//       } catch (err) {
//         console.error('Error fetching confirmations:', err.response?.data || err.message);
//         throw new Error(err.response?.data?.message || 'Failed to fetch confirmations');
//       }
//     },
//     retry: 2,
//     retryDelay: 1000,
//     onError: (err) => {
//       console.error('useQuery error:', err);
//     },
//   });

//   // Delete confirmation mutation
//   const deleteMutation = useMutation({
//     mutationFn: async ({ confirmationId, email }) => {
//       console.log('Deleting confirmation:', confirmationId);
//       const res = await axiosSecure.delete(`/confirmations/${confirmationId}`, {
//         params: { email },
//       });
//       return res.data;
//     },
//     onSuccess: () => {
//       refetch();
//       alert('Confirmation deleted successfully');
//     },
//     onError: (error) => {
//       console.error('Error deleting confirmation:', error.response?.data || error.message);
//       alert('Failed to delete confirmation: ' + (error.response?.data?.message || error.message));
//     },
//   });

//   const handleDelete = (confirmationId, email) => {
//     if (window.confirm('Are you sure you want to delete this confirmation?')) {
//       deleteMutation.mutate({ confirmationId, email });
//     }
//   };

//   const handleViewDetails = (confirmation) => {
//     setSelectedConfirmation(confirmation);
//   };

//   const handleCloseDetails = () => {
//     setSelectedConfirmation(null);
//   };

//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleString('en-US', {
//         timeZone: 'Asia/Dhaka',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//       });
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   const filteredConfirmations = confirmations.filter(
//     (conf) =>
//       conf &&
//       conf.tutorName &&
//       conf.email &&
//       (conf.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         conf.email.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   console.log('Filtered confirmations:', filteredConfirmations);

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#005482]">Confirmations</h1>
//             <p className="text-gray-600 mt-1">
//               {filteredConfirmations.length} {filteredConfirmations.length === 1 ? 'confirmation' : 'confirmations'} found
//             </p>
//           </div>
//           <div className="relative w-full sm:w-auto">
//             <input
//               type="text"
//               placeholder="Search confirmations..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005482] focus:border-transparent"
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>

//         {/* Debug Button */}
//         <button
//           onClick={() => console.log('Confirmations:', confirmations)}
//           className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
//         >
//           Log Confirmations
//         </button>

//         {/* Confirmations Grid */}
//         {isLoading ? (
//           <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {[1, 2, 3].map((index) => (
//               <SkeletonCard key={index} />
//             ))}
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
//             <p className="font-medium">Error loading confirmations</p>
//             <p className="text-sm mt-1">{error.message}</p>
//           </div>
//         ) : filteredConfirmations.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//             <FaUserGraduate className="mx-auto text-4xl text-gray-400 mb-4" />
//             <p className="text-gray-500 text-lg">No confirmations found</p>
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="mt-4 text-[#005482] hover:text-[#70C5D7] transition-colors"
//               >
//                 Clear search
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {filteredConfirmations.map((confirmation) => (
//               <motion.div
//                 key={confirmation._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
//               >
//                 <div className="p-6 flex flex-col h-full">
//                   <div className="flex items-start gap-4 mb-6">
//                     <div className="w-12 h-12 bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
//                       <FaUserGraduate className="text-xl" />
//                     </div>
//                     <div className="flex-grow min-w-0">
//                       <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
//                         {confirmation.tutorName}
//                       </h3>
//                       <div className="flex items-center text-gray-600 truncate">
//                         <FaEnvelope className="mr-2 flex-shrink-0" />
//                         <span className="text-sm truncate">{confirmation.email}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex-grow">
//                     <div className="space-y-3">
//                       <div className="flex items-center text-gray-500">
//                         <FaClock className="mr-2 flex-shrink-0" />
//                         <span className="text-sm">{formatDate(confirmation.confirmedAt)}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
//                     <button
//                       onClick={() => handleViewDetails(confirmation)}
//                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#005482] bg-opacity-10 text-[#005482] rounded-lg hover:bg-opacity-20 transition-colors"
//                     >
//                       <FaEye /> View Details
//                     </button>
//                     <button
//                       onClick={() => handleDelete(confirmation._id, confirmation.email)}
//                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#DA3A60] bg-opacity-10 text-[#DA3A60] rounded-lg hover:bg-opacity-20 transition-colors"
//                     >
//                       <FaTrash /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Confirmation Details Modal */}
//         <AnimatePresence>
//           {selectedConfirmation && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto"
//               onClick={handleCloseDetails}
//             >
//               <motion.div
//                 initial={{ scale: 0.95, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.95, y: 20 }}
//                 className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="sticky top-0 bg-white px-6 sm:px-8 py-6 border-b border-gray-100 z-10">
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                     <div className="flex items-center gap-4">
//                       <div className="w-14 h-14 bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-xl flex items-center justify-center text-white shadow-lg">
//                         <FaUserGraduate className="text-2xl" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl sm:text-2xl font-bold text-[#005482]">
//                           {selectedConfirmation.tutorName}
//                         </h3>
//                         <p className="text-[#70C5D7] mt-1 flex items-center gap-2">
//                           <FaClock className="text-sm flex-shrink-0" />
//                           <span className="text-sm truncate">
//                             Confirmed {formatDate(selectedConfirmation.confirmedAt)}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={handleCloseDetails}
//                       className="absolute top-4 right-4 text-gray-400 hover:text-[#DA3A60] transition-colors p-2 hover:bg-gray-50 rounded-lg"
//                     >
//                       <FaTimes className="text-xl" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-6 sm:p-8 space-y-6">
//                   <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl overflow-hidden">
//                     <div className="px-6 py-4 bg-[#70C5D7] bg-opacity-10">
//                       <h4 className="text-lg font-semibold text-[#005482]">Confirmation Details</h4>
//                     </div>
//                     <div className="p-6 space-y-6">
//                       <div>
//                         <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
//                           Tutor Name
//                         </label>
//                         <p className="text-[#005482] font-medium">
//                           {selectedConfirmation.tutorName}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
//                           Email Address
//                         </label>
//                         <p className="text-[#005482] font-medium flex items-center gap-2 bg-white p-3 rounded-lg border border-[#70C5D7] border-opacity-20 break-all">
//                           <FaEnvelope className="text-[#DA3A60] flex-shrink-0" />
//                           {selectedConfirmation.email}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
//                           Confirmation Date
//                         </label>
//                         <p className="text-[#005482] font-medium">
//                           {formatDate(selectedConfirmation.confirmedAt)}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
//                           Tutor ID
//                         </label>
//                         <p className="text-[#005482] font-medium">
//                           {selectedConfirmation.tutorId}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="sticky bottom-0 bg-white px-6 sm:px-8 py-4 border-t border-gray-100">
//                   <div className="flex justify-end">
//                     <button
//                       onClick={handleCloseDetails}
//                       className="px-6 py-2.5 text-sm font-medium text-[#005482] hover:bg-[#70C5D7] hover:bg-opacity-10 rounded-lg transition-colors duration-200"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default Confirmation;


import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaEnvelope, FaClock, FaTimes, FaEye, FaSearch, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';

// Skeleton loader
const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
    </div>
  </div>
);

const Confirmation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [selectedConfirmation, setSelectedConfirmation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all confirmations
  const { data: confirmations = [], isLoading, error, refetch } = useQuery({
    queryKey: ['confirmations'],
    queryFn: async () => {
      console.log('Fetching all confirmations');
      try {
        const res = await axiosSecure.get('/confirmations');
        console.log('Fetched confirmations:', res.data);
        return res.data;
      } catch (err) {
        console.error('Error fetching confirmations:', err.response?.data || err.message);
        throw new Error(err.response?.data?.message || 'Failed to fetch confirmations');
      }
    },
    retry: 2,
    retryDelay: 1000,
    onError: (err) => {
      console.error('useQuery error:', err);
    },
  });

  // Delete confirmation mutation
 const deleteMutation = useMutation({
  mutationFn: async ({ confirmationId }) => {
    console.log('Sending DELETE request for confirmationId:', confirmationId);
    const res = await axiosSecure.delete(`/confirmations/${confirmationId}`);
    console.log('DELETE response:', res.data);
    return res.data;
  },
  onSuccess: () => {
    refetch();
    alert('Confirmation deleted successfully');
  },
  onError: (error) => {
    console.error('Error deleting confirmation:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      alert('Authentication error. Please log in again.');
    } else if (error.response?.status === 404) {
      alert('Confirmation not found. It may have been already deleted.');
    } else if (error.response?.status === 403) {
      alert('Forbidden: You are not authorized to delete this confirmation.');
    } else {
      alert('Failed to delete confirmation: ' + (error.response?.data?.message || error.message));
    }
  },
});

  const handleDelete = (confirmationId) => {
    if (!user?.email) {
      alert('Please log in to delete confirmations.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this confirmation?')) {
      console.log('Initiating delete for ID:', confirmationId);
      deleteMutation.mutate({ confirmationId });
    }
  };

  const handleViewDetails = (confirmation) => {
    setSelectedConfirmation(confirmation);
  };

  const handleCloseDetails = () => {
    setSelectedConfirmation(null);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const filteredConfirmations = confirmations.filter(
    (conf) =>
      conf &&
      conf.tutorName &&
      conf.email &&
      (conf.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conf.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  console.log('Filtered confirmations:', filteredConfirmations);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#005482]">Confirmations</h1>
            <p className="text-gray-600 mt-1">
              {filteredConfirmations.length} {filteredConfirmations.length === 1 ? 'confirmation' : 'confirmations'} found
            </p>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search confirmations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005482] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Debug Button */}
        <button
          onClick={() => console.log('Confirmations:', confirmations, 'User:', user)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
        >
          Log Confirmations
        </button>

        {/* Confirmations Grid */}
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Error loading confirmations</p>
            <p className="text-sm mt-1">{error.message}</p>
          </div>
        ) : filteredConfirmations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <FaUserGraduate className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No confirmations found</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#005482] hover:text-[#70C5D7] transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredConfirmations.map((confirmation) => (
              <motion.div
                key={confirmation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                      <FaUserGraduate className="text-xl" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                        {confirmation.tutorName}
                      </h3>
                      <div className="flex items-center text-gray-600 truncate">
                        <FaEnvelope className="mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{confirmation.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-500">
                        <FaClock className="mr-2 flex-shrink-0" />
                        <span className="text-sm">{formatDate(confirmation.confirmedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
                    <button
                      onClick={() => handleViewDetails(confirmation)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#005482] bg-opacity-10 text-[#005482] rounded-lg hover:bg-opacity-20 transition-colors"
                    >
                      <FaEye /> View Details
                    </button>
                    <button
                      onClick={() => handleDelete(confirmation._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#DA3A60] bg-opacity-10 text-[#DA3A60] rounded-lg hover:bg-opacity-20 transition-colors"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Confirmation Details Modal */}
        <AnimatePresence>
          {selectedConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto"
              onClick={handleCloseDetails}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-12 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white px-6 sm:px-8 py-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-xl flex items-center justify-center p-center text-white shadow-lg">
                        <FaUserGraduate className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-xl font-bold text-gray-800">
                          {selectedConfirmation.tutorName}
                        </h3>
                        <p className="text-[#70C5D7] mt-1 flex items-center gap-2">
                          <FaClock className="text-sm flex-shrink-0" />
                          <span className="text-sm truncate">
                            Confirmed {formatDate(selectedConfirmation.confirmedAt)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseDetails}
                      className="absolute top-4 right-4 text-gray-400 hover:text-[#DA3A60] transition-colors p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 bg-[#70C5D7] bg-opacity-10">
                      <h4 className="text-lg font-semibold text-[#005482]">Confirmation Details</h4>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
                          Tutor Name
                        </label>
                        <p className="text-[#005482] font-medium">
                          {selectedConfirmation.tutorName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
                          Email Address
                        </label>
                        <p className="text-[#005482] font-medium flex items-center gap-2 bg-white p-3 rounded-lg border border-[#70C5D7] border-opacity-20 break-all">
                          <FaEnvelope className="text-[#DA3A60] flex-shrink-0" />
                          {selectedConfirmation.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
                          Confirmation Date
                        </label>
                        <p className="text-[#005482] font-medium">
                          {formatDate(selectedConfirmation.confirmedAt)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
                          Tutor ID
                        </label>
                        <p className="text-[#005482] font-medium">
                          {selectedConfirmation.tutorId}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sticky bottom-0 bg-white px-6 sm:px-8 py-4 border-t border-gray-100">
                  <div className="flex justify-end">
                    <button
                      onClick={handleCloseDetails}
                      className="px-6 py-2.5 text-sm font-medium text-[#005482] hover:bg-[#70C5D7] hover:bg-opacity-10 rounded-lg transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Confirmation;

