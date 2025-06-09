

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

   const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);
    console.log("Total Price:", totalPrice);
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    const secret = res.data?.clientSecret;
                    if (secret) {
                        setClientSecret(secret);
                    } else {
                        console.error("Missing clientSecret in response", res.data);
                    }
                })
                .catch(err => {
                    console.error("Failed to create payment intent", err);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);
        setError('');

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            setProcessing(false);
            return;
        }

       
const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
        card: card,
        billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
        }
    }
});

if (confirmError) {
    console.log("Confirm Error:", confirmError);
    setError(confirmError.message);
    setProcessing(false);
    return;
}
        if (confirmError) {
            setError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.menuId),
                status: 'pending'
            };

            try {
                const res = await axiosSecure.post('/payments', payment);
                refetch();

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory');
                }
            } catch (error) {
                console.error("Error saving payment:", error);
            }
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-sm btn-primary my-4"
            >
                {processing ? "Processing..." : "Pay"}
            </button>
            <p>price:{totalPrice} </p>
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;


// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useContext, useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useCart from "../../../hooks/useCart";
// import { FaMoneyBillWave, FaUserGraduate, FaCreditCard, FaSpinner, FaLock } from 'react-icons/fa';

// const CheckoutForm = () => {
//     const [error, setError] = useState('');
//     const [clientSecret, setClientSecret] = useState('');
//     const [transactionId, setTransactionId] = useState('');
//     const [processing, setProcessing] = useState(false);

//     const stripe = useStripe();
//     const elements = useElements();
//     const axiosSecure = useAxiosSecure();
//     const { user } = useContext(AuthContext);
//     const [cart, refetch] = useCart();
//     const navigate = useNavigate();

//     // Calculate total price
//     const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);

//     // Get tutor emails from cart
//     const tutorEmails = cart.map(item => item.tutorEmail).filter(email => !!email);

//     useEffect(() => {
//         if (totalPrice > 0) {
//             axiosSecure.post('/create-payment-intent', { price: totalPrice })
//                 .then(res => {
//                     const secret = res.data?.clientSecret;
//                     if (secret) {
//                         setClientSecret(secret);
//                     } else {
//                         console.error("Missing clientSecret in response", res.data);
//                     }
//                 })
//                 .catch(err => {
//                     console.error("Failed to create payment intent", err);
//                 });
//         }
//     }, [axiosSecure, totalPrice]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) return;

//         const card = elements.getElement(CardElement);
//         if (!card) return;

//         setProcessing(true);
//         setError('');

//         try {
//             const { error: paymentMethodError } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card,
//             });

//             if (paymentMethodError) {
//                 setError(paymentMethodError.message);
//                 setProcessing(false);
//                 return;
//             }

//             const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: card,
//                     billing_details: {
//                         email: user?.email || 'anonymous',
//                         name: user?.displayName || 'anonymous'
//                     }
//                 }
//             });

//             if (confirmError) {
//                 setError(confirmError.message);
//                 setProcessing(false);
//                 return;
//             }

//             if (paymentIntent.status === 'succeeded') {
//                 setTransactionId(paymentIntent.id);

//                 const payment = {
//                     email: user.email,
//                     price: totalPrice,
//                     transactionId: paymentIntent.id,
//                     date: new Date(),
//                     cartIds: cart.map(item => item._id),
//                     menuItemIds: cart.map(item => item.menuId),
//                     tutorEmails: tutorEmails,
//                     totalTutorEmails: tutorEmails.length,
//                     status: 'pending'
//                 };

//                 const res = await axiosSecure.post('/payments', payment);
//                 refetch();

//                 if (res.data?.paymentResult?.insertedId) {
//                     Swal.fire({
//                         icon: "success",
//                         title: "Payment Successful!",
//                         text: "Your booking has been confirmed.",
//                         showConfirmButton: false,
//                         timer: 2000
//                     });
//                     navigate('/dashboard/paymentHistory');
//                 }
//             }
//         } catch (err) {
//             console.error("Payment error:", err);
//             setError("An unexpected error occurred. Please try again.");
//         }

//         setProcessing(false);
//     };

//     return (
//         <div className="flex flex-col space-y-6">
//             {/* Security Notice */}
//             <div className="flex items-center gap-2 text-[#70C5D7] text-sm">
//                 <FaLock className="text-[#DA3A60]" />
//                 <span>Payments are secure and encrypted</span>
//             </div>

//             {/* Order Summary */}
//             <div className="bg-[#F8FBFF] rounded-xl p-6">
//                 <h3 className="text-xl font-semibold text-[#005482] mb-4">Order Summary</h3>
//                 <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                             <FaUserGraduate className="text-[#FCBB45]" />
//                             <span className="text-[#005482]">Total Tutors</span>
//                         </div>
//                         <span className="font-medium text-[#005482]">{tutorEmails.length}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                             <FaMoneyBillWave className="text-[#DA3A60]" />
//                             <span className="text-[#005482]">Total Amount</span>
//                         </div>
//                         <span className="font-medium text-[#005482]">${totalPrice.toFixed(2)}</span>
//                     </div>
//                     <div className="pt-4 border-t border-[#70C5D7]/20">
//                         <div className="flex items-center justify-between text-lg font-semibold">
//                             <span className="text-[#005482]">Total to Pay</span>
//                             <span className="text-[#DA3A60]">${totalPrice.toFixed(2)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Card Details */}
//             <div>
//                 <div className="flex items-center gap-2 mb-4">
//                     <FaCreditCard className="text-[#70C5D7]" />
//                     <h3 className="text-xl font-semibold text-[#005482]">Card Details</h3>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="bg-white border border-[#70C5D7]/20 p-4 rounded-xl mb-6">
//                         <CardElement
//                             options={{
//                                 style: {
//                                     base: {
//                                         fontSize: '16px',
//                                         color: '#005482',
//                                         '::placeholder': {
//                                             color: '#70C5D7',
//                                         },
//                                         backgroundColor: 'white',
//                                     },
//                                     invalid: {
//                                         color: '#DA3A60',
//                                     },
//                                 },
//                             }}
//                         />
//                     </div>

//                     {error && (
//                         <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-6 text-sm">
//                             {error}
//                         </div>
//                     )}

//                     {transactionId && (
//                         <div className="bg-green-50 text-green-800 p-4 rounded-xl mb-6">
//                             <p className="font-medium">Payment Successful!</p>
//                             <p className="text-sm mt-1">Transaction ID: {transactionId}</p>
//                         </div>
//                     )}

//                     <button
//                         type="submit"
//                         disabled={!stripe || !clientSecret || processing}
//                         className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-medium transition-colors
//                             ${!stripe || !clientSecret || processing
//                                 ? 'bg-[#DA3A60]/50 text-white cursor-not-allowed'
//                                 : 'bg-[#DA3A60] text-white hover:bg-opacity-90'
//                             }`}
//                     >
//                         {processing ? (
//                             <>
//                                 <FaSpinner className="animate-spin" />
//                                 Processing...
//                             </>
//                         ) : (
//                             <>
//                                 Pay ${totalPrice.toFixed(2)}
//                             </>
//                         )}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CheckoutForm;



// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useContext, useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useCart from "../../../hooks/useCart";
// import { FaMoneyBillWave, FaUserGraduate, FaCreditCard, FaSpinner, FaLock, FaMobileAlt } from 'react-icons/fa';

// const CheckoutForm = () => {
//     const [error, setError] = useState('');
//     const [clientSecret, setClientSecret] = useState('');
//     const [transactionId, setTransactionId] = useState('');
//     const [processing, setProcessing] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState('stripe'); // New state for payment method

//     const stripe = useStripe();
//     const elements = useElements();
//     const axiosSecure = useAxiosSecure();
//     const { user } = useContext(AuthContext);
//     const [cart, refetch] = useCart();
//     const navigate = useNavigate();

//     // Calculate total price
//     const totalPrice = cart.reduce((total, item) => total + (item.price || 0), 0);

//     // Get tutor emails from cart
//     const tutorEmails = cart.map(item => item.tutorEmail).filter(email => !!email);

//     useEffect(() => {
//         if (totalPrice > 0 && paymentMethod === 'stripe') {
//             axiosSecure.post('/create-payment-intent', { price: totalPrice })
//                 .then(res => {
//                     const secret = res.data?.clientSecret;
//                     if (secret) {
//                         setClientSecret(secret);
//                     } else {
//                         console.error("Missing clientSecret in response", res.data);
//                     }
//                 })
//                 .catch(err => {
//                     console.error("Failed to create payment intent", err);
//                 });
//         }
//     }, [axiosSecure, totalPrice, paymentMethod]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setProcessing(true);
//         setError('');

//         if (paymentMethod === 'stripe') {
//             if (!stripe || !elements) {
//                 setProcessing(false);
//                 return;
//             }

//             const card = elements.getElement(CardElement);
//             if (!card) {
//                 setProcessing(false);
//                 return;
//             }

//             try {
//                 const { error: paymentMethodError } = await stripe.createPaymentMethod({
//                     type: 'card',
//                     card,
//                 });

//                 if (paymentMethodError) {
//                     setError(paymentMethodError.message);
//                     setProcessing(false);
//                     return;
//                 }

//                 const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//                     payment_method: {
//                         card: card,
//                         billing_details: {
//                             email: user?.email || 'anonymous',
//                             name: user?.displayName || 'anonymous'
//                         }
//                     }
//                 });

//                 if (confirmError) {
//                     setError(confirmError.message);
//                     setProcessing(false);
//                     return;
//                 }

//                 if (paymentIntent.status === 'succeeded') {
//                     setTransactionId(paymentIntent.id);

//                     const payment = {
//                         email: user.email,
//                         price: totalPrice,
//                         transactionId: paymentIntent.id,
//                         date: new Date(),
//                         cartIds: cart.map(item => item._id),
//                         menuItemIds: cart.map(item => item.menuId),
//                         tutorEmails: tutorEmails,
//                         totalTutorEmails: tutorEmails.length,
//                         status: 'pending',
//                         paymentType: 'stripe',
//                     };

//                     const res = await axiosSecure.post('/payments', payment);
//                     refetch();

//                     if (res.data?.paymentResult?.insertedId) {
//                         Swal.fire({
//                             icon: "success",
//                             title: "Payment Successful!",
//                             text: "Your booking has been confirmed.",
//                             showConfirmButton: false,
//                             timer: 2000
//                         });
//                         navigate('/dashboard/paymentHistory');
//                     }
//                 }
//             } catch (err) {
//                 console.error("Payment error:", err);
//                 setError("An unexpected error occurred. Please try again.");
//             }
//         } else if (paymentMethod === 'moncash') {
//             try {
//                 const response = await axiosSecure.post('/create-moncash-payment', {
//                     amount: totalPrice,
//                 });

//                 const { paymentUrl, orderId } = response.data;

//                 // Store payment data temporarily
//                 const payment = {
//                     email: user.email,
//                     price: totalPrice,
//                     orderId,
//                     date: new Date(),
//                     cartIds: cart.map(item => item._id),
//                     menuItemIds: cart.map(item => item.menuId),
//                     tutorEmails: tutorEmails,
//                     totalTutorEmails: tutorEmails.length,
//                     status: 'pending',
//                     paymentType: 'moncash',
//                 };

//                 await axiosSecure.post('/payments', payment);

//                 // Redirect to MonCash payment page
//                 window.location.href = paymentUrl;
//             } catch (err) {
//                 console.error("MonCash payment error:", err);
//                 setError("Failed to initiate MonCash payment. Please try again.");
//             }
//         }

//         setProcessing(false);
//     };

//     return (
//         <div className="flex flex-col space-y-6">
//             {/* Security Notice */}
//             <div className="flex items-center gap-2 text-[#70C5D7] text-sm">
//                 <FaLock className="text-[#DA3A60]" />
//                 <span>Payments are secure and encrypted</span>
//             </div>

//             {/* Order Summary */}
//             <div className="bg-[#F8FBFF] rounded-xl p-6">
//                 <h3 className="text-xl font-semibold text-[#005482] mb-4">Order Summary</h3>
//                 <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                             <FaUserGraduate className="text-[#FCBB45]" />
//                             <span className="text-[#005482]">Total Tutors</span>
//                         </div>
//                         <span className="font-medium text-[#005482]">{tutorEmails.length}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                             <FaMoneyBillWave className="text-[#DA3A60]" />
//                             <span className="text-[#005482]">Total Amount</span>
//                         </div>
//                         <span className="font-medium text-[#005482]">${totalPrice.toFixed(2)}</span>
//                     </div>
//                     <div className="pt-4 border-t border-[#70C5D7]/20">
//                         <div className="flex items-center justify-between text-lg font-semibold">
//                             <span className="text-[#005482]">Total to Pay</span>
//                             <span className="text-[#DA3A60]">${totalPrice.toFixed(2)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Payment Method Selector */}
//             <div className="bg-white rounded-xl p-6 border border-[#70C5D7]/20">
//                 <h3 className="text-xl font-semibold text-[#005482] mb-4">Select Payment Method</h3>
//                 <div className="flex gap-4">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                             type="radio"
//                             name="paymentMethod"
//                             value="stripe"
//                             checked={paymentMethod === 'stripe'}
//                             onChange={() => setPaymentMethod('stripe')}
//                             className="form-radio text-[#DA3A60]"
//                         />
//                         <FaCreditCard className="text-[#70C5D7]" />
//                         <span className="text-[#005482]">Credit/Debit Card (Stripe)</span>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                             type="radio"
//                             name="paymentMethod"
//                             value="moncash"
//                             checked={paymentMethod === 'moncash'}
//                             onChange={() => setPaymentMethod('moncash')}
//                             className="form-radio text-[#DA3A60]"
//                         />
//                         <FaMobileAlt className="text-[#70C5D7]" />
//                         <span className="text-[#005482]">MonCash</span>
//                     </label>
//                 </div>
//             </div>

//             {/* Payment Form */}
//             <div>
//                 <div className="flex items-center gap-2 mb-4">
//                     <FaCreditCard className="text-[#70C5D7]" />
//                     <h3 className="text-xl font-semibold text-[#005482]">
//                         {paymentMethod === 'stripe' ? 'Card Details' : 'Proceed with MonCash'}
//                     </h3>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     {paymentMethod === 'stripe' && (
//                         <div className="bg-white border border-[#70C5D7]/20 p-4 rounded-xl mb-6">
//                             <CardElement
//                                 options={{
//                                     style: {
//                                         base: {
//                                             fontSize: '16px',
//                                             color: '#005482',
//                                             '::placeholder': {
//                                                 color: '#70C5D7',
//                                             },
//                                             backgroundColor: 'white',
//                                         },
//                                         invalid: {
//                                             color: '#DA3A60',
//                                         },
//                                     },
//                                 }}
//                             />
//                         </div>
//                     )}

//                     {error && (
//                         <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-6 text-sm">
//                             {error}
//                         </div>
//                     )}

//                     {transactionId && paymentMethod === 'stripe' && (
//                         <div className="bg-green-50 text-green-800 p-4 rounded-xl mb-6">
//                             <p className="font-medium">Payment Successful!</p>
//                             <p className="text-sm mt-1">Transaction ID: {transactionId}</p>
//                         </div>
//                     )}

//                     <button
//                         type="submit"
//                         disabled={(!stripe && paymentMethod === 'stripe') || (!clientSecret && paymentMethod === 'stripe') || processing}
//                         className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-medium transition-colors
//                             ${(!stripe && paymentMethod === 'stripe') || (!clientSecret && paymentMethod === 'stripe') || processing
//                                 ? 'bg-[#DA3A60]/50 text-white cursor-not-allowed'
//                                 : 'bg-[#DA3A60] text-white hover:bg-opacity-90'
//                             }`}
//                     >
//                         {processing ? (
//                             <>
//                                 <FaSpinner className="animate-spin" />
//                                 Processing...
//                             </>
//                         ) : (
//                             <>
//                                 {paymentMethod === 'stripe' ? `Pay $${totalPrice.toFixed(2)}` : 'Proceed to MonCash'}
//                             </>
//                         )}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CheckoutForm;