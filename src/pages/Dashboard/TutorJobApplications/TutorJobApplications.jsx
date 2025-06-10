import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import CustomAlert from '../../../components/CustomAlert';
import {
  FaGraduationCap,
  FaBook,
  FaClock,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaUserTie,
  FaChalkboardTeacher,
  FaSearch,
} from 'react-icons/fa';

const TutorJobApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [applying, setApplying] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['available-jobs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/jobs/available');
      return res.data;
    },
  });

  const handleApply = async (jobId) => {
    setApplying(jobId);
    try {
      await axiosSecure.post(`/jobs/apply/${jobId}`);
      CustomAlert.success(
        'Applied Successfully!',
        'Your application has been submitted.'
      );
    } catch (error) {
      CustomAlert.error(
        'Application Failed',
        error.response?.data?.message || 'Failed to apply to job.'
      );
    } finally {
      setApplying(null);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      job.subject?.toLowerCase().includes(query) ||
      job.topicsGoals?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#70C5D7]"></div>
        </div>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="min-h-screen bg-[#ffffff] p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-[#70C5D7] bg-opacity-10 rounded-xl p-8">
            <FaUserTie className="text-[#DA3A60] text-5xl mx-auto mb-4" />
            <p className="text-[#005482] text-lg font-semibold mb-4">Please log in to view available jobs</p>
            <a
              href="/login"
              className="inline-block bg-[#DA3A60] text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#005482] mb-4 text-center sm:text-left">Available Tutoring Jobs</h2>
          <div className="bg-[#70C5D7] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-[#ffffff] focus:outline-none focus:border-[#DA3A60] bg-white text-[#005482]"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#005482] text-lg" />
            </div>
            <span className="text-white font-medium text-sm sm:text-base whitespace-nowrap">Total Jobs: {filteredJobs.length}</span>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-[#70C5D7] bg-opacity-10 rounded-xl p-6 sm:p-8 text-center">
            <FaBook className="text-[#DA3A60] text-4xl sm:text-5xl mx-auto mb-4" />
            <p className="text-[#005482] text-base sm:text-lg font-semibold">No available jobs found</p>
            <p className="text-[#005482] mt-2 text-sm sm:text-base">Check back later for new opportunities</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#70C5D7] bg-opacity-10 rounded-xl flex items-center justify-center">
                      <FaChalkboardTeacher className="text-xl sm:text-2xl text-[#70C5D7]" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#005482] mb-0.5 sm:mb-1 line-clamp-1">{job.subject}</h3>
                      <p className="text-[#DA3A60] font-medium text-sm sm:text-base">${job.budget}/hr</p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FaGraduationCap className="text-[#70C5D7] text-base sm:text-lg flex-shrink-0" />
                      <span className="text-[#005482] text-sm sm:text-base truncate">{job.gradeLevel || 'Grade not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FaMapMarkerAlt className="text-[#70C5D7] text-base sm:text-lg flex-shrink-0" />
                      <span className="text-[#005482] text-sm sm:text-base truncate">{job.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <FaClock className="text-[#70C5D7] text-base sm:text-lg flex-shrink-0" />
                      <span className="text-[#005482] text-sm sm:text-base">{job.sessionsPerWeek} sessions/week</span>
                    </div>
                  </div>

                  <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <h4 className="font-semibold text-[#005482] mb-1 sm:mb-2 text-sm sm:text-base">Learning Goals</h4>
                    <p className="text-[#005482] text-xs sm:text-sm line-clamp-2">{job.topicsGoals || 'Goals not specified'}</p>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-full bg-[#70C5D7] bg-opacity-10 text-[#005482] py-2 sm:py-2.5 px-4 rounded-xl hover:bg-opacity-20 transition-colors font-medium text-sm sm:text-base"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApply(job._id)}
                      disabled={applying === job._id || job.applicants?.includes(user.email)}
                      className={`w-full py-2 sm:py-2.5 px-4 rounded-xl font-medium transition-colors text-sm sm:text-base ${
                        applying === job._id || job.applicants?.includes(user.email)
                          ? 'bg-[#FCBB45] text-white cursor-not-allowed'
                          : 'bg-[#DA3A60] text-white hover:bg-opacity-90'
                      }`}
                    >
                      {applying === job._id
                        ? 'Applying...'
                        : job.applicants?.includes(user.email)
                        ? 'Already Applied'
                        : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
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
                className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#005482]">Job Details</h3>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-[#005482] hover:text-[#DA3A60] text-2xl p-2"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-4 border-b border-gray-100 gap-2 sm:gap-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#005482]">{selectedJob.subject}</h4>
                      <p className="text-[#DA3A60] font-medium mt-1 text-sm sm:text-base">
                        ${selectedJob.budget}/hr{' '}
                        {selectedJob.openToNegotiation === 'Yes' && '(Negotiable)'}
                      </p>
                    </div>
                    <div className="bg-[#70C5D7] bg-opacity-10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl">
                      <span className="text-[#005482] font-medium text-sm sm:text-base">{selectedJob.modeOfLearning}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <DetailItem icon={<FaGraduationCap />} label="Grade Level" value={selectedJob.gradeLevel} />
                    <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={selectedJob.location} />
                    <DetailItem icon={<FaClock />} label="Sessions/Week" value={selectedJob.sessionsPerWeek} />
                    <DetailItem
                      icon={<FaCalendarAlt />}
                      label="Start Date"
                      value={
                        selectedJob.startDate
                          ? new Date(selectedJob.startDate).toLocaleDateString()
                          : 'Not specified'
                      }
                    />
                  </div>

                  <div className="bg-[#70C5D7] bg-opacity-5 rounded-xl p-4 sm:p-6">
                    <h4 className="font-semibold text-[#005482] mb-2 sm:mb-3 text-sm sm:text-base">Learning Goals</h4>
                    <p className="text-[#005482] text-xs sm:text-sm">{selectedJob.topicsGoals || 'Not specified'}</p>
                  </div>

                  <button
                    onClick={() => {
                      handleApply(selectedJob._id);
                      setSelectedJob(null);
                    }}
                    disabled={applying === selectedJob._id || selectedJob.applicants?.includes(user.email)}
                    className={`w-full py-2.5 sm:py-3 rounded-xl font-medium transition-colors text-sm sm:text-base ${
                      applying === selectedJob._id || selectedJob.applicants?.includes(user.email)
                        ? 'bg-[#FCBB45] text-white cursor-not-allowed'
                        : 'bg-[#DA3A60] text-white hover:bg-opacity-90'
                    }`}
                  >
                    {applying === selectedJob._id
                      ? 'Applying...'
                      : selectedJob.applicants?.includes(user.email)
                      ? 'Already Applied'
                      : 'Apply Now'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// DetailItem Component
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-[#70C5D7]">{icon}</div>
    <div>
      <p className="text-sm text-[#005482] font-semibold">{label}</p>
      <p className="text-[#005482]">{value || 'Not specified'}</p>
    </div>
  </div>
);

export default TutorJobApplications;