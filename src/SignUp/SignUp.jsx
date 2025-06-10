import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useLanguage } from "../providers/LanguageProvider";
import SocialLogin from "../components/SocialLogin";
import CustomAlert from "../components/CustomAlert";
import imge1 from '../assets/img-signup-PhotoRoom.png';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { translate } = useLanguage();
    const navigate = useNavigate();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if (!termsAccepted) {
            CustomAlert.warning(
                'Terms & Conditions Required',
                'Please accept the terms and conditions to continue'
            );
            return;
        }

        try {
            const result = await createUser(data.email, data.password);
            
            if (result.user) {
                await updateUserProfile(data.name, data.photoURL);
                
                try {
                    const saveUser = {
                        name: data.name,
                        email: data.email,
                        role: "student",
                    };
                    
                    const response = await fetch("https://lesonpaw-server.vercel.app/users", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(saveUser),
                    });
                    
                    if (response.ok) {
                        CustomAlert.success(
                            'Account Created Successfully!',
                            'A verification email has been sent. Please check your inbox.'
                        ).then(() => {
                            navigate('/login');
                        });
                        reset();
                    }
                } catch (error) {
                    CustomAlert.error(
                        'Database Error',
                        'Failed to save user information. Please try again.'
                    );
                }
            }
        } catch (error) {
            CustomAlert.error(
                'Sign Up Failed',
                error.message
            );
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#005482] flex fixed inset-0">
            {/* Left Section with Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#70C5D7] items-center justify-center p-12">
                <div className="max-w-lg">
                    <h2 className="text-4xl font-bold text-white mb-6">Join <span className="text-[#FCBB45]">LessonPaw</span> Today!</h2>
                    <p className="text-xl text-white/90">Connect with a community of educators and learners. Share knowledge, discover resources, and grow together.</p>
                    <div className="mt-8">
                        <img 
                            src={imge1} 
                            alt="Progress Illustration"
                            className="w-full max-w-md mx-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Right Section with Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center mt-8">
                        <h1 className="text-3xl font-bold text-[#005482] mb-2">Welcome!</h1>
                        <p className="text-gray-600">Create your account to get started</p>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your name *"
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
                                />
                                {errors.name && (
                                    <span className="text-[#DA3A60] text-sm mt-1">{errors.name.message}</span>
                                )}
                            </div>

                            {/* Photo Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Profile Photo
                                </label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register("photo")}
                                            className="hidden"
                                            id="photo-upload"
                                        />
                                        <label
                                            htmlFor="photo-upload"
                                            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70C5D7]"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Choose Photo
                                        </label>
                                        <span className="text-sm text-gray-500">or</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter photo URL"
                                        {...register("photoURL")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482] text-sm"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Upload a photo or provide an image URL
                                    </p>
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your email address *"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
                                />
                                {errors.email && (
                                    <span className="text-[#DA3A60] text-sm mt-1">{errors.email.message}</span>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create password *"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            },
                                            pattern: {
                                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                                message: "Password must include uppercase, lowercase, number and special character"
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="text-[#DA3A60] text-sm mt-1">{errors.password.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="w-4 h-4 border-gray-300 rounded text-[#DA3A60] focus:ring-[#DA3A60]"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                I have read and agree to all{' '}
                                <Link to="/terms" className="text-[#70C5D7] hover:text-[#005482]" target="_blank">
                                    Terms & conditions
                                </Link>
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={disabled || !termsAccepted}
                            className="w-full py-3 px-6 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <span>Sign up</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Google Sign In */}
                        <SocialLogin />

                        {/* Sign In Link */}
                        <div className="flex items-center justify-between mt-6 text-sm">
                            <Link to="/login" className="text-[#005482] hover:text-[#70C5D7] font-medium">
                                Sign in
                            </Link>
                            <Link to="/forgot-password" className="text-[#005482] hover:text-[#70C5D7]">
                                Lost password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;