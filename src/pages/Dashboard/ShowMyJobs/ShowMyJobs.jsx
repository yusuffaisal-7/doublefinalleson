import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaSearch, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaDollarSign, FaUserGraduate, FaSortAmountDown, FaBook, FaChalkboardTeacher } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Skeleton loader (reused from ShowAllJobs)
const SkeletonCard = () => (
  <div className="bg-[#ffffff] rounded-xl shadow-md overflow-hidden animate-pulse p-6">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
    </div>
  </div>
);

// DetailItem component (reused from ShowAllJobs)
const DetailItem = ({ icon, label, value }) => (
  <div className="bg-[#70C5D7] bg-opacity-10 p-4 rounded-xl">
    <div className="flex items-center gap-3 mb-2">
      <div className="text-[#DA3A60]">{icon}</div>
      <label className="text-sm font-medium text-[#005482]">{label}</label>
    </div>
    <p className="text-[#005482] font-medium pl-9">{value || 'Not specified'}</p>
  </div>
);

const ShowMyJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('postedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  // Fetch all jobs using react-query
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs', user?.email],
    queryFn: async () => (await axiosSecure.get('/jobs')).data,
    enabled: !!user?.email, // Only fetch if user email is available
  });

  // Filter jobs to show only those posted by the current user
  const myJobs = jobs.filter(job => job.email === user?.email);

  // Further filter and sort jobs based on search and sort options
  const filteredJobs = myJobs
    .filter(job => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          job.subject?.toLowerCase().includes(searchLower) ||
          job.topicsGoals?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      if (sortBy === 'postedAt') {
        return sortOrder === 'desc'
          ? new Date(bValue) - new Date(aValue)
          : new Date(aValue) - new Date(bValue);
      }
      return sortOrder === 'desc'
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-[#005482] mb-3">My Posts</h3>
            <p className="text-[#005482]">Loading your job listings...</p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <FaBriefcase className="text-[#DA3A60] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#DA3A60] mb-2">Error Loading Jobs</h3>
            <p className="text-[#DA3A60]">{error.message || 'Failed to fetch your jobs. Please try again later.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-3xl font-bold text-[#005482] mb-2">My Posts</h3>
              <p className="text-[#005482]">Total Jobs: {filteredJobs.length}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#005482]">Quick Stats:</span>
              <span className="px-4 py-2 bg-[#FCBB45] text-[#ffffff] rounded-lg text-sm font-medium">
                Active: {myJobs.filter(job => job.status === 'active').length}
              </span>
              <span className="px-4 py-2 bg-[#DA3A60] text-[#ffffff] rounded-lg text-sm font-medium">
                Pending: {myJobs.filter(job => job.status === 'pending').length}
              </span>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-[#70C5D7] rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="md:col-span-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by subject or goals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#ffffff] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-[#ffffff] text-[#005482]"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482] text-lg" />
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full appearance-none pl-12 pr-4 py-3 border border-[#ffffff] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-[#ffffff] text-[#005482]"
              >
                <option value="postedAt-desc">Newest First</option>
                <option value="postedAt-asc">Oldest First</option>
                <option value="subject-asc">Subject (A-Z)</option>
                <option value="subject-desc">Subject (Z-A)</option>
                <option value="budget-desc">Budget (High-Low)</option>
                <option value="budget-asc">Budget (Low-High)</option>
              </select>
              <FaSortAmountDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-[#ffffff] rounded-xl shadow-md p-12 text-center">
            <FaBriefcase className="text-5xl text-[#DA3A60] mx-auto mb-4" />
            <p className="text-[#005482] text-lg mb-2">No jobs found</p>
            <p className="text-[#005482]">You haven't posted any jobs yet or none match your criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#ffffff] rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  {/* Job Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#70C5D7] rounded-full flex items-center justify-center text-[#ffffff]">
                      <FaBriefcase className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#005482] mb-1">
                        {job.subject || 'Untitled Job'}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 ${
                          job.status === 'active' ? 'bg-[#FCBB45]' : 
                          job.status === 'pending' ? 'bg-[#DA3A60]' : 
                          'bg-[#70C5D7]'
                        } text-[#ffffff] rounded-full text-sm font-medium capitalize`}>
                          {job.status || 'Status N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
                      <FaGraduationCap className="text-[#DA3A60] flex-shrink-0" />
                      <span className="truncate">{job.topicsGoals || 'Goals not specified'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
                      <FaMapMarkerAlt className="text-[#DA3A60] flex-shrink-0" />
                      <span>{job.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#005482] bg-[#70C5D7] bg-opacity-10 p-3 rounded-lg">
                      <FaDollarSign className="text-[#DA3A60] flex-shrink-0" />
                      <span>Budget: ${job.budget || 'Not specified'} {job.openToNegotiation ? '(Negotiable)' : ''}</span>
                    </div>

                    {/* Key Information */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-[#005482]">
                        <FaCalendarAlt className="text-[#FCBB45]" />
                        <span className="text-sm">
                          {job.sessionsPerWeek || '0'} Sessions/Week
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#005482]">
                        <FaClock className="text-[#FCBB45]" />
                        <span className="text-sm">
                          {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-full bg-[#DA3A60] text-[#ffffff] py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors duration-200 mt-6"
                    >
                      View Complete Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Job Details Modal */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-[#ffffff] rounded-2xl shadow-xl max-w-4xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#005482] mb-2">
                      {selectedJob.subject || 'Untitled Job'}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 ${
                        selectedJob.status === 'active' ? 'bg-[#FCBB45]' : 
                        selectedJob.status === 'pending' ? 'bg-[#DA3A60]' : 
                        'bg-[#70C5D7]'
                      } text-white rounded-full text-sm font-medium capitalize`}>
                        {selectedJob.status || 'Status N/A'}
                      </span>
                      <span className="text-[#70C5D7] text-sm">
                        Posted {new Date(selectedJob.postedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-[#005482] hover:text-[#DA3A60] transition-colors p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Main Content */}
                <div className="space-y-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-[#70C5D7]/5 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#DA3A60] rounded-lg text-white">
                          <FaDollarSign className="text-xl" />
                        </div>
                        <span className="text-[#005482] font-semibold">
                          ${selectedJob.budget || '0'}
                        </span>
                      </div>
                      <p className="text-sm text-[#70C5D7]">
                        {selectedJob.openToNegotiation ? 'Negotiable' : 'Fixed Rate'}
                      </p>
                    </div>
                    <div className="bg-[#70C5D7]/5 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#FCBB45] rounded-lg text-white">
                          <FaCalendarAlt className="text-xl" />
                        </div>
                        <span className="text-[#005482] font-semibold">
                          {selectedJob.sessionsPerWeek || '0'}
                        </span>
                      </div>
                      <p className="text-sm text-[#70C5D7]">Sessions per Week</p>
                    </div>
                    <div className="bg-[#70C5D7]/5 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#005482] rounded-lg text-white">
                          <FaMapMarkerAlt className="text-xl" />
                        </div>
                        <span className="text-[#005482] font-semibold">
                          {selectedJob.location || 'Not Specified'}
                        </span>
                      </div>
                      <p className="text-sm text-[#70C5D7]">Location</p>
                    </div>
                    <div className="bg-[#70C5D7]/5 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#70C5D7] rounded-lg text-white">
                          <FaCalendarAlt className="text-xl" />
                        </div>
                        <span className="text-[#005482] font-semibold">
                          {new Date(selectedJob.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-[#70C5D7]">Start Date</p>
                    </div>
                  </div>

                  {/* Subject and Learning Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Subject Card */}
                    <div className="bg-[#70C5D7]/5 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#DA3A60] rounded-lg text-white">
                          <FaBook className="text-xl" />
                        </div>
                        <h4 className="text-lg font-semibold text-[#005482]">Subject</h4>
                      </div>
                      <p className="text-[#005482] font-medium text-lg mb-2">
                        {selectedJob.subject || 'Not Specified'}
                      </p>
                      <p className="text-sm text-[#70C5D7]">Primary Focus Area</p>
                    </div>

                    {/* Grade Level Card */}
                    <div className="bg-[#70C5D7]/5 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#FCBB45] rounded-lg text-white">
                          <FaGraduationCap className="text-xl" />
                        </div>
                        <h4 className="text-lg font-semibold text-[#005482]">Grade Level</h4>
                      </div>
                      <p className="text-[#005482] font-medium text-lg mb-2">
                        {selectedJob.gradeLevel || 'Not Specified'}
                      </p>
                      <p className="text-sm text-[#70C5D7]">Academic Level</p>
                    </div>

                    {/* Learning Model Card */}
                    <div className="bg-[#70C5D7]/5 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#005482] rounded-lg text-white">
                          <FaChalkboardTeacher className="text-xl" />
                        </div>
                        <h4 className="text-lg font-semibold text-[#005482]">Learning Model</h4>
                      </div>
                      <p className="text-[#005482] font-medium text-lg mb-2">
                        {selectedJob.modeOfLearning || 'Not Specified'}
                      </p>
                      <p className="text-sm text-[#70C5D7]">Preferred Teaching Method</p>
                    </div>
                  </div>

                  {/* Topics and Goals */}
                  <div className="bg-[#70C5D7]/5 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-[#005482] mb-4 flex items-center gap-2">
                      <FaGraduationCap className="text-[#DA3A60]" />
                      Topics & Goals
                    </h4>
                    <p className="text-[#005482] leading-relaxed">
                      {selectedJob.topicsGoals || 'No specific topics or goals provided.'}
                    </p>
                </div>

                  {/* Help Type Tags */}
                  {selectedJob.helpType && selectedJob.helpType.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-[#005482] mb-4">Help Type</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.helpType.map((type, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-[#005482]/5 text-[#005482] rounded-lg text-sm font-medium"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Applicants Section */}
                {selectedJob.applicants && selectedJob.applicants.length > 0 && (
                    <div className="border-t border-[#70C5D7]/20 pt-8">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-[#005482] flex items-center gap-2">
                          <FaUserGraduate className="text-[#DA3A60]" />
                          Teacher Applications ({selectedJob.applicants.length})
                        </h4>
                      </div>
                      <div className="bg-[#70C5D7]/5 rounded-2xl p-6">
                      <div className="grid gap-4">
                        {selectedJob.applicants.map((applicant, index) => (
                            <div 
                              key={index} 
                              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#005482] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                  {applicant.name?.[0]?.toUpperCase() || '?'}
                                </div>
                            <div>
                                  <h5 className="text-[#005482] font-semibold text-lg">
                                    {applicant.name || 'Unnamed Teacher'}
                                  </h5>
                                  <p className="text-sm text-[#70C5D7]">Applied Teacher</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          </div>
                      </div>
                    </div>
                  )}
                  </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShowMyJobs;