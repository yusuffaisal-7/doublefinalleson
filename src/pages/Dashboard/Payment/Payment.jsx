import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// import CheckoutFrom from './CheckoutFrom';
// TODO Add Publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div>
            <h2>Payment page</h2>
            <div>
                <Elements stripe={stripePromise}>
                 {/* <CheckoutFrom></CheckoutFrom> */}
                 <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;

// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';
// import { FaCreditCard } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

// const Payment = () => {
//     return (
//         <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="min-h-screen bg-[#FFFFFF]"
//         >
//             <div className="max-w-lg mx-auto px-4 py-6">
//                 {/* Header Section */}
//                 <motion.div 
//                     initial={{ y: -20 }}
//                     animate={{ y: 0 }}
//                     className="mb-6"
//                 >
//                     <div className="flex items-center gap-3 mb-2">
//                         <div className="w-12 h-12 flex items-center justify-center bg-[#DA3A60]/10 rounded-xl">
//                             <FaCreditCard className="text-[#DA3A60] text-2xl" />
//                         </div>
//                         <h2 className="text-2xl md:text-3xl font-bold text-[#005482]">Secure Payment</h2>
//                     </div>
//                     <p className="text-[#70C5D7] text-lg">Complete your booking with secure payment</p>
//                 </motion.div>

//                 {/* Payment Form Section */}
//                 <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.1 }}
//                     className="bg-white rounded-2xl shadow-sm border border-[#70C5D7]/10 overflow-hidden"
//                 >
//                     <div className="p-6">
//                         <Elements stripe={stripePromise}>
//                             <CheckoutForm />
//                         </Elements>
//                     </div>
//                 </motion.div>
//             </div>
//         </motion.div>
//     );
// };

// export default Payment;

// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';
// import { FaCreditCard, FaMobileAlt } from 'react-icons/fa'; // Added FaMobileAlt
// import { motion } from 'framer-motion';

// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

// const Payment = () => {
//     return (
//         <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="min-h-screen bg-[#FFFFFF]"
//         >
//             <div className="max-w-lg mx-auto px-4 py-6">
//                 {/* Header Section */}
//                 <motion.div 
//                     initial={{ y: -20 }}
//                     animate={{ y: 0 }}
//                     className="mb-6"
//                 >
//                     <div className="flex items-center gap-3 mb-2">
//                         <div className="w-12 h-12 flex items-center justify-center bg-[#DA3A60]/10 rounded-xl">
//                             <FaCreditCard className="text-[#DA3A60] text-2xl" />
//                         </div>
//                         <h2 className="text-2xl md:text-3xl font-bold text-[#005482]">Secure Payment</h2>
//                     </div>
//                     <p className="text-[#70C5D7] text-lg">Complete your booking with secure payment</p>
//                 </motion.div>

//                 {/* Payment Form Section */}
//                 <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.1 }}
//                     className="bg-white rounded-2xl shadow-sm border border-[#70C5D7]/10 overflow-hidden"
//                 >
//                     <div className="p-6">
//                         <Elements stripe={stripePromise}>
//                             <CheckoutForm />
//                         </Elements>
//                     </div>
//                 </motion.div>
//             </div>
//         </motion.div>
//     );
// };

// export default Payment;