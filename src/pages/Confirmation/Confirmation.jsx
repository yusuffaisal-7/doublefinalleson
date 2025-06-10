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
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        {/* Header Section */}
        <div className="bg-[#005482] rounded-xl overflow-hidden mb-8">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            {/* Header Content */}
            <div className="relative px-8 py-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {/* Title and Stats Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      Confirmations Dashboard
                    </h1>
                    <div className="h-1 w-24 bg-[#FCBB45] rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white bg-opacity-10 rounded-lg px-4 py-2 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <FaUserGraduate className="text-[#FCBB45]" />
                        <span className="text-[#70C5D7] font-medium">
                          {filteredConfirmations.length}
                        </span>
                        <span className="text-white opacity-90">
                          {filteredConfirmations.length === 1 ? 'Confirmation' : 'Confirmations'}
                        </span>
                      </div>
                    </div>
                    <div className="h-6 w-px bg-white opacity-10"></div>
                    <span className="text-[#70C5D7] text-sm">Last updated {new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Search Section */}
                <div className="w-full md:w-auto">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Search confirmations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-72 pl-12 pr-4 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:border-[#FCBB45] focus:ring-2 focus:ring-[#FCBB45] focus:ring-opacity-30 transition-all"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-60 group-focus-within:text-[#FCBB45] transition-colors">
                      <FaSearch />
                    </div>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-60 hover:opacity-100 transition-opacity"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                  {searchQuery && (
                    <div className="mt-2 text-[#70C5D7] text-sm">
                      Found {filteredConfirmations.length} matching results
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Button - Hidden in production */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => console.log('Confirmations:', confirmations, 'User:', user)}
            className="bg-[#70C5D7] bg-opacity-10 text-[#005482] px-4 py-2 rounded-lg mb-6"
          >
            Log Confirmations
          </button>
        )}

        {/* Confirmations Grid */}
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-[#DA3A60] bg-opacity-10 border border-[#DA3A60] rounded-lg p-6 text-[#DA3A60]">
            <p className="font-medium">Error loading confirmations</p>
            <p className="text-sm mt-1 opacity-80">{error.message}</p>
          </div>
        ) : filteredConfirmations.length === 0 ? (
          <div className="text-center py-16 bg-[#70C5D7] bg-opacity-5 rounded-xl border border-[#70C5D7] border-opacity-10">
            <div className="w-16 h-16 mx-auto bg-[#FCBB45] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <FaUserGraduate className="text-[#FCBB45] text-2xl" />
            </div>
            <p className="text-[#005482] text-lg font-medium">No confirmations found</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#DA3A60] hover:text-[#DA3A60] hover:underline transition-all"
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
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-[#70C5D7] border-opacity-10"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#FCBB45] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <FaUserGraduate className="text-xl" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-semibold text-[#005482] mb-1 truncate">
                        {confirmation.tutorName}
                      </h3>
                      <div className="flex items-center text-[#70C5D7] truncate">
                        <FaEnvelope className="mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{confirmation.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="space-y-3">
                      <div className="flex items-center text-[#005482]">
                        <FaClock className="mr-2 flex-shrink-0 text-[#FCBB45]" />
                        <span className="text-sm">{formatDate(confirmation.confirmedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#70C5D7] border-opacity-10 flex gap-3">
                    <button
                      onClick={() => handleViewDetails(confirmation)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#70C5D7] bg-opacity-10 text-[#005482] rounded-lg hover:bg-opacity-20 transition-all"
                    >
                      <FaEye className="text-[#FCBB45]" /> View Details
                    </button>
                    <button
                      onClick={() => handleDelete(confirmation._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#DA3A60] text-white rounded-lg hover:bg-opacity-90 transition-all"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#005482] bg-opacity-80 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm"
              onClick={handleCloseDetails}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-12 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#005482] px-6 sm:px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#FCBB45] rounded-xl flex items-center justify-center text-white">
                        <FaUserGraduate className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {selectedConfirmation.tutorName}
                        </h3>
                        <p className="text-[#70C5D7] mt-1 flex items-center gap-2">
                          <FaClock className="text-sm" />
                          <span className="text-sm">
                            Confirmed {formatDate(selectedConfirmation.confirmedAt)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseDetails}
                      className="text-white hover:text-[#DA3A60] transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
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
                        <p className="text-[#005482] font-medium bg-white p-3 rounded-lg border border-[#70C5D7] border-opacity-20">
                          {selectedConfirmation.tutorName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
                          Email Address
                        </label>
                        <p className="text-[#005482] font-medium flex items-center gap-2 bg-white p-3 rounded-lg border border-[#70C5D7] border-opacity-20 break-all">
                          <FaEnvelope className="text-[#FCBB45]" />
                          {selectedConfirmation.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
                          Confirmation Date
                        </label>
                        <p className="text-[#005482] font-medium bg-white p-3 rounded-lg border border-[#70C5D7] border-opacity-20">
                          {formatDate(selectedConfirmation.confirmedAt)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#005482] opacity-70 block mb-2">
                          Tutor ID
                        </label>
                        <p className="text-[#005482] font-medium bg-white p-3 rounded-lg border border-[#70C5D7] border-opacity-20">
                          {selectedConfirmation.tutorId}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#70C5D7] bg-opacity-5 px-6 sm:px-8 py-4 border-t border-[#70C5D7] border-opacity-10">
                  <div className="flex justify-end">
                    <button
                      onClick={handleCloseDetails}
                      className="px-6 py-2.5 text-white bg-[#DA3A60] rounded-lg hover:bg-opacity-90 transition-all font-medium"
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

