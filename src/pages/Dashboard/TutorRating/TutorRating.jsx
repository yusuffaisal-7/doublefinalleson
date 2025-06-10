import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaStar } from 'react-icons/fa';

const TutorRating = () => {
  const { user } = useContext(AuthContext);
  const { tutorId: paramTutorId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasUserRated, setHasUserRated] = useState(false);

  // Fetch all tutors and check if user has rated
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutorsRes, ratingsRes] = await Promise.all([
          axiosSecure.get('/tutors'),
          paramTutorId ? axiosSecure.get(`/ratings/${paramTutorId}`) : Promise.resolve({ data: [] })
        ]);
        
        setTutors(tutorsRes.data);
        
        if (paramTutorId) {
          const hasRated = ratingsRes.data.some(rating => rating.studentEmail === user.email);
          setHasUserRated(hasRated);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load data. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure, paramTutorId, user.email]);

  const onSubmit = async (data) => {
    if (rating === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Rating Required',
        text: 'Please select a rating before submitting',
      });
      return;
    }

    const tutorId = data.selectedTutor || paramTutorId;
    
    try {
      // Check if user has already rated this tutor
      const existingRatings = await axiosSecure.get(`/ratings/${tutorId}`);
      const hasAlreadyRated = existingRatings.data.some(rating => rating.studentEmail === user.email);
      
      if (hasAlreadyRated) {
        Swal.fire({
          icon: 'error',
          title: 'Already Rated',
          text: 'You have already submitted a rating for this tutor.',
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
        Swal.fire({
          icon: 'success',
          title: 'Rating Submitted',
          text: 'Thank you for your feedback!',
          showConfirmButton: false,
          timer: 1500,
        });
        setRating(0);
        setHasUserRated(true);
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

  if (hasUserRated) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="p-4 bg-yellow-50 rounded-xl text-yellow-700">
              You have already submitted a review for this tutor.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-[#005482] mb-6">Rate Tutor</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!paramTutorId && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Tutor</label>
                <select 
                  {...register('selectedTutor', { required: 'Please select a tutor' })} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent"
                >
                  <option value="">-- Choose a Tutor --</option>
                  {loading ? (
                    <option disabled>Loading tutors...</option>
                  ) : (
                    tutors.map((tutor) => (
                      <option key={tutor._id} value={tutor._id}>
                        {tutor.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea 
                {...register('comment', {
                  required: 'Please provide a comment',
                  minLength: { value: 10, message: 'Comment must be at least 10 characters long' }
                })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#70C5D7] focus:border-transparent resize-none"
                placeholder="Share your experience with this tutor..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#005482] text-white rounded-lg hover:bg-[#004368] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaStar className="text-sm" /> Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorRating;