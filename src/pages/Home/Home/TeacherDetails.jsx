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
        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <FaArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
              <span>Back to Search</span>
            </button>
            <div className="text-sm breadcrumbs text-white/60">
              <span>Tutors</span>
              <span className="mx-2">›</span>
              <span className="text-white">{tutor?.name}</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Profile Image */}
            <div className="lg:col-span-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={tutor?.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
                  alt={tutor?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <FaMapMarkerAlt className="text-[#FCBB45]" />
                    <span>{tutor?.location || 'Location not specified'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                    {tutor?.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <span className="text-xl text-[#FCBB45] font-semibold">{tutor?.subjects?.[0]}</span>
                    <div className="flex items-center gap-2">
                      <FaGraduationCap className="text-[#FCBB45]" />
                      <span className="text-lg text-white/90">{tutor?.educationalQualifications || 'Education not specified'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-sm text-[#FCBB45] mb-1 font-medium">Experience</div>
                    <div className="text-2xl font-bold">{tutor?.experience || 0} Years</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-sm text-[#FCBB45] mb-1 font-medium">Students</div>
                    <div className="text-2xl font-bold">{tutor?.totalStudents || 0}+</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-sm text-[#FCBB45] mb-1 font-medium">Rating</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                      <div className="flex items-center text-[#FCBB45]">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={index < Math.round(averageRating) ? 'text-[#FCBB45]' : 'text-white/30'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-sm text-[#FCBB45] mb-1 font-medium">Hourly Rate</div>
                    <div className="text-2xl font-bold">${tutor?.hourlyRate || 0}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={handleBookTutor}
                    disabled={isBookingLoading}
                    className="flex-1 sm:flex-none px-8 py-3 bg-[#DA3A60] text-white rounded-xl font-semibold hover:bg-[#DA3A60]/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 transform hover:-translate-y-0.5"
                  >
                    {isBookingLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <FaCalendarAlt />
                        <span>Book Now</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleContactClick}
                    className="flex-1 sm:flex-none px-8 py-3 bg-[#FCBB45] text-white rounded-xl font-semibold hover:bg-[#FCBB45]/90 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <FaWhatsapp />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {/* About Section */}
              <section className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-[#005482] mb-4 flex items-center gap-2">
                  <FaUser className="text-[#DA3A60]" />
                  About {tutor?.name}
                </h2>
                <p className="text-[#005482] leading-relaxed">
                  {tutor?.bio || 'No biography provided.'}
                </p>
              </section>

              {/* Subjects Section */}
              <section className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-[#005482] mb-4 flex items-center gap-2">
                  <FaBook className="text-[#DA3A60]" />
                  Subjects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tutor?.subjects?.map((subject, index) => (
                    <div
                      key={index}
                      className="bg-[#70C5D7]/10 rounded-xl p-4 flex items-center gap-3 transform hover:scale-105 transition-transform duration-300"
                    >
                      <FaGraduationCap className="text-[#DA3A60]" />
                      <span className="text-[#005482] font-medium">{subject}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Teaching Style */}
              <section className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-[#005482] mb-4 flex items-center gap-2">
                  <FaChalkboardTeacher className="text-[#DA3A60]" />
                  Teaching Style
                </h2>
                <div className="grid gap-4">
                  {tutor?.teachingStyle?.map((style, index) => (
                    <div
                      key={index}
                      className="bg-[#70C5D7]/10 rounded-xl p-4 flex items-start gap-3 transform hover:scale-105 transition-transform duration-300"
                    >
                      <FaCheckCircle className="text-[#DA3A60] mt-1" />
                      <span className="text-[#005482]">{style}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews Section */}
              <section className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#005482] flex items-center gap-2">
                    <FaStar className="text-[#DA3A60]" />
                    Student Reviews
                  </h2>
                  {!hasUserRated && hasPaidForTutor && (
                    <button
                      onClick={() => setShowRatingForm(true)}
                      className="px-4 py-2 bg-[#FCBB45] text-white rounded-xl text-sm font-medium hover:bg-[#FCBB45]/90 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Write a Review
                    </button>
                  )}
                </div>

                {ratings?.length > 0 ? (
                  <div className="space-y-6">
                    {(showAllReviews ? ratings : ratings.slice(0, 3)).map((rating, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0 hover:bg-[#70C5D7]/5 rounded-xl p-4 transition-colors duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#70C5D7] flex items-center justify-center text-white text-xl font-semibold">
                            {rating.studentName?.[0] || '?'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-[#005482]">{rating.studentName}</h3>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={i < rating.rating ? 'text-[#FCBB45]' : 'text-gray-200'}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-[#005482] mt-2">{rating.review}</p>
                            <div className="text-sm text-[#70C5D7] mt-2">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {ratings.length > 3 && (
                      <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="w-full text-center text-[#DA3A60] font-medium hover:text-[#DA3A60]/80 transition-colors py-2 rounded-xl hover:bg-[#DA3A60]/5"
                      >
                        {showAllReviews ? (
                          <span className="flex items-center justify-center gap-2">
                            <FaChevronUp />
                            Show Less Reviews
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <FaChevronDown />
                            Show All Reviews ({ratings.length})
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-[#70C5D7]/5 rounded-xl">
                    <div className="w-16 h-16 bg-[#70C5D7]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaStar className="text-2xl text-[#005482]" />
                    </div>
                    <p className="text-[#005482] font-medium text-lg">No Reviews Yet</p>
                    <p className="text-sm text-[#70C5D7] mt-1">Be the first to review this tutor!</p>
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-[#005482] mb-4">Contact Information</h3>
                {hasPaidForTutor ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#005482] group">
                      <FaEnvelope className="text-[#DA3A60] group-hover:scale-110 transition-transform" />
                      <a href={`mailto:${tutor?.email}`} className="hover:text-[#DA3A60] transition-colors">
                        {tutor?.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-[#005482] group">
                      <FaPhone className="text-[#DA3A60] group-hover:scale-110 transition-transform" />
                      <a href={`tel:${tutor?.contactNumber}`} className="hover:text-[#DA3A60] transition-colors">
                        {tutor?.contactNumber}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-[#005482] group">
                      <FaWhatsapp className="text-[#DA3A60] group-hover:scale-110 transition-transform" />
                      <a
                        href={`https://wa.me/${tutor?.contactNumber?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#DA3A60] transition-colors"
                      >
                        WhatsApp Chat
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#005482] mb-6">Book this tutor to view contact information</p>
                    <button
                      onClick={handleBookTutor}
                      className="w-full px-6 py-3 bg-[#DA3A60] text-white rounded-xl font-semibold hover:bg-[#DA3A60]/90 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                    >
                      <FaCalendarAlt />
                      Book Now
                    </button>
                  </div>
                )}
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-[#005482] mb-4 flex items-center gap-2">
                  <FaShare className="text-[#DA3A60]" />
                  Share Profile
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {/* Add share functionality */}}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#70C5D7]/10 rounded-xl text-[#005482] hover:bg-[#70C5D7]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => {/* Add share functionality */}}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#70C5D7]/10 rounded-xl text-[#005482] hover:bg-[#70C5D7]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <FaEnvelope />
                    Email
                  </button>
                </div>
              </div>
            </div>
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