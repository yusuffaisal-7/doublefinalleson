
// import { createBrowserRouter } from "react-router-dom";

// import Main from "../Layout/Main";
// import Home from "../pages/Home/Home/Home";
// import Login from "../Login/Login";
// import SignUp from "../SignUp/SignUp";
// import Intro from "../pages/Dashboard/Intro/Intro";
// import TeacherHome from "../pages/Dashboard/TeacherHome/TeacherHome";
// import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
// import PrivateRoute from "./PrivateRoute";
// import Dashboard from "../Layout/Dashboard";
// import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
// import AddTutor from "../pages/Dashboard/AddTutor/AddTutor";
// import Tutors from "../pages/Dashboard/Tutors/Tutors";
// import PostJob from "../pages/PostJob/PostJob";
// import TutorProfile from "../pages/TutorProfile/TutorProfile";
// import Notifications from "../pages/Dashboard/Notification/Notification";
// import ManageSubjects from "../pages/Dashboard/ManageSubjects/ManageSubjects";
// import TeacherVerification from "../pages/Dashboard/TeacherVerification/TeacherVerification";
// import ManageLocations from "../pages/Dashboard/ManageLocation/ManageLocations";
// import ManagePayments from "../pages/Dashboard/ManagePayments/ManagePayments";
// import AdminAnalytics from "../pages/Dashboard/AdminAnalytics/AdminAnalytics";
// import PaymentForm from "../pages/Dashboard/PaymentForm/PaymentForm";
// import TutorRating from "../pages/Dashboard/TutorRating/TutorRating";
// import TutorJobApplications from "../pages/Dashboard/TutorJobApplications/TutorJobApplications";
// import ServiceListing from "../pages/ServiceListing/ServiceListing";
// import ManageServices from "../pages/Dashboard/ManageServices/ManageServices";
// import StudentProfile from "../pages/Dashboard/StudentProfile/StudentProfile";
// import ServiceDetails from "../pages/Dashboard/ServiceDetails/ServiceDetails";
// import TeacherDetails from "../pages/Home/Home/TeacherDetails";
// import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
// import Payment from "../pages/Dashboard/Payment/Payment";
// import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
// import JoinTeacher from "../pages/Dashboard/JoinTeacher/JoinTeacher";
// import ShowAllJobs from "../pages/Dashboard/ShowAllJobs.jsx/ShowAllJobs";
// import ShowAllMessage from "../pages/Dashboard/ShowAllMessage/ShowAllMessage";
// import ShowTeachersApplication from "../pages/Dashboard/ShowTeachersApplication/ShowTeachersApplication";
// import useAdmin from "../hooks/UseAdmin";
// import ShowStudent from "../pages/Dashboard/ShowStudent/ShowStudent";
// import ShowAllService from "../pages/Dashboard/ShowAllService/ShowAllService";
// import AddStory from "../pages/Dashboard/AddStory/AddStory";
// import Blog from "../pages/Blog/Blog";
// import AboutUs from "../pages/AboutUs/AboutUs";
// import ManageStories from "../pages/Dashboard/ManageStories/ManageStories";
// import AddBlog from "../pages/Dashboard/AddBlog/AddBlog";
// import AllBlog from "../pages/Dashboard/AllBlog/AllBlog";
// import FindTeacherGuide from "../pages/FindTeacherGuide/FindTeacherGuide";
// import BecomeTeacherGuide from "../pages/BecomeTeacherGuide/BecomeTeacherGuide";

// // Custom wrapper to restrict routes to admins
// const AdminRoute = ({ children }) => {
//   const [isAdmin, isAdminLoading] = useAdmin();
//   if (isAdminLoading) return <div>Loading...</div>;
//   if (!isAdmin) return <div className="text-center py-10 text-red-500">Access Denied: Admins Only</div>;
//   return children;
// };

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/tutor/:tutorId",
//         element: <TeacherDetails />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "signup",
//         element: <SignUp />,
//       },
//       {
//         path: "blog",
//         element: <Blog />,
//       },
//       {
//         path: "about",
//         element: <AboutUs />,
//       },
//       {
//         path: "find-teacher",
//         element: <FindTeacherGuide />,
//       },
//       {
//         path: "become-teacher",
//         element: <BecomeTeacherGuide />,
//       }
//     ],
//   },
//   {
//     path: "dashboard",
//     element: (
//       <PrivateRoute>
//         <Dashboard />
//       </PrivateRoute>
//     ),
//     children: [
//       // Normal user routes
//       {
//         path: "all-jobs",
//         element: <ShowAllJobs />,
//       },
//       {
//         path: "post-job",
//         element: <PostJob />,
//       },
//       {
//         path: "my-bookings",
//         element: <MyBookings />,
//       },
//       {
//         path: "payment",
//         element: <Payment />,
//       },
//       {
//         path: "paymentHistory",
//         element: <PaymentHistory />,
//       },
//       {
//         path: "tutors",
//         element: <Tutors />,
//       },
//       {
//         path: "tutorProfile",
//         element: <TutorProfile />,
//       },
//       {
//         path: "students",
//         element: <ShowStudent></ShowStudent>,
//       },
//       {
//         path: "studentProfile",
//         element: <StudentProfile />,
//       },
//       {
//         path: "joinTeacher",
//         element: <JoinTeacher />,
//       },
//       // Teacher routes
//       {
//         path: "teacherProfile",
//         element: <TeacherHome />,
//       },
//       {
//         path: "tutor-jobs",
//         element: <TutorJobApplications />,
//       },
//       {
//         path: "manage-services",
//         element: <ManageServices />,
//       },
//       {
//         path: "services",
//         element: <ServiceListing />,
//       },
//       {
//         path: "manage-subjects",
//         element: <ManageSubjects />,
//       },
//       {
//         path: "manage-locations",
//         element: <ManageLocations />,
//       },
//       // Admin routes
//       {
//         path: "adminHome",
//         element: (
//           <AdminRoute>
//             <AdminHome />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "manage-users",
//         element: (
//           <AdminRoute>
//             <ManageUsers />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "add-tutor",
//         element: (
//           <AdminRoute>
//             <AddTutor />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "message",
//         element: (
//           <AdminRoute>
//             <ShowAllMessage />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "service",
//         element: (
//           <AdminRoute>
//             <ShowAllService></ShowAllService>
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "teacher-applications",
//         element: (
//           <AdminRoute>
//             <ShowTeachersApplication />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "manage-payments",
//         element: (
//           <AdminRoute>
//             <ManagePayments />
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "admin-analytics",
//         element: (
//           <AdminRoute>
//             <AdminAnalytics />
//           </AdminRoute>
//         ),
//       },
//        {
//         path: "story",
//         element: (
//           <AdminRoute>
//             <AddStory></AddStory>
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "manageStory",
//         element: (
//           <AdminRoute>
//            <ManageStories></ManageStories>
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "addBlog",
//         element: (
//           <AdminRoute>
//            <AddBlog></AddBlog>
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "editBlog",
//         element: (
//           <AdminRoute>
//            <AllBlog></AllBlog>
//           </AdminRoute>
//         ),
//       },
//       {
//         path: "notifications",
//         element: (
//           <AdminRoute>
//             <Notifications />
//           </AdminRoute>
//         ),
//       },
//       // Payment and Rating routes
//       {
//         path: "payment/:jobId",
//         element: <PaymentForm />,
//       },
//       {
//         path: "rate-tutor/:tutorId",
//         element: <TutorRating />,
//       },
//       // Tutor public profile route (accessible to all)
//       {
//         path: "tutors/:email",
//         element: <TutorProfile />,
//       },
//     ],
//   },
// ]);

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Intro from "../pages/Dashboard/Intro/Intro";
import TeacherHome from "../pages/Dashboard/TeacherHome/TeacherHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AddTutor from "../pages/Dashboard/AddTutor/AddTutor";
import Tutors from "../pages/Dashboard/Tutors/Tutors";
import PostJob from "../pages/PostJob/PostJob";
import TutorProfile from "../pages/TutorProfile/TutorProfile";
import Notifications from "../pages/Dashboard/Notification/Notification";
import ManageSubjects from "../pages/Dashboard/ManageSubjects/ManageSubjects";
import TeacherVerification from "../pages/Dashboard/TeacherVerification/TeacherVerification";
import ManageLocations from "../pages/Dashboard/ManageLocation/ManageLocations";
import ManagePayments from "../pages/Dashboard/ManagePayments/ManagePayments";
import AdminAnalytics from "../pages/Dashboard/AdminAnalytics/AdminAnalytics";
import PaymentForm from "../pages/Dashboard/PaymentForm/PaymentForm";
import TutorRating from "../pages/Dashboard/TutorRating/TutorRating";
import TutorJobApplications from "../pages/Dashboard/TutorJobApplications/TutorJobApplications";
import ServiceListing from "../pages/ServiceListing/ServiceListing";
import ManageServices from "../pages/Dashboard/ManageServices/ManageServices";
import StudentProfile from "../pages/Dashboard/StudentProfile/StudentProfile";
import ServiceDetails from "../pages/Dashboard/ServiceDetails/ServiceDetails";
import TeacherDetails from "../pages/Home/Home/TeacherDetails";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import JoinTeacher from "../pages/Dashboard/JoinTeacher/JoinTeacher";
import ShowAllJobs from "../pages/Dashboard/ShowAllJobs.jsx/ShowAllJobs";
import ShowAllMessage from "../pages/Dashboard/ShowAllMessage/ShowAllMessage";
import ShowTeachersApplication from "../pages/Dashboard/ShowTeachersApplication/ShowTeachersApplication";
import useAdmin from "../hooks/UseAdmin";
import ShowStudent from "../pages/Dashboard/ShowStudent/ShowStudent";
import ShowAllService from "../pages/Dashboard/ShowAllService/ShowAllService";
import AddStory from "../pages/Dashboard/AddStory/AddStory";
import Blog from "../pages/Blog/Blog";
import AboutUs from "../pages/AboutUs/AboutUs";
import ManageStories from "../pages/Dashboard/ManageStories/ManageStories";
import AddBlog from "../pages/Dashboard/AddBlog/AddBlog";
import AllBlog from "../pages/Dashboard/AllBlog/AllBlog";
import FindTeacherGuide from "../pages/FindTeacherGuide/FindTeacherGuide";
import BecomeTeacherGuide from "../pages/BecomeTeacherGuide/BecomeTeacherGuide";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound/NotFound";
import Confirmation from "../pages/Confirmation/Confirmation";
import ShowMyJobs from "../pages/Dashboard/ShowMyJobs/ShowMyJobs";

// Custom wrapper to restrict routes to admins
const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  if (isAdminLoading) return <div>Loading...</div>;
  if (!isAdmin) return <div className="text-center py-10 text-red-500">Access Denied: Admins Only</div>;
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tutor/:tutorId",
        element: <TeacherDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "blogs",
        element: <Blog />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "find-teacher",
        element: <FindTeacherGuide />,
      },
      {
        path: "become-teacher",
        element: <BecomeTeacherGuide />,
      },
      {
        path: "contact",
        element: <Contact />,
      }
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // Normal user routes
      {
        path: "all-jobs",
        element: <ShowAllJobs />,
      },
      {
        path: "myJobs",
        element: <ShowMyJobs></ShowMyJobs>,
      },
      {
        path: "post-job",
        element: <PostJob />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "tutors",
        element: <Tutors />,
      },
      {
        path: "tutorProfile",
        element: <TutorProfile />,
      },
      {
        path: "students",
        element: <ShowStudent></ShowStudent>,
      },
      {
        path: "studentProfile",
        element: <StudentProfile />,
      },
      {
        path: "joinTeacher",
        element: <JoinTeacher />,
      },
      // Teacher routes
      {
        path: "teacherProfile",
        element: <TeacherHome />,
      },
      {
        path: "tutor-jobs",
        element: <TutorJobApplications />,
      },
      {
        path: "manage-services",
        element: <ManageServices />,
      },
      {
        path: "services",
        element: <ServiceListing />,
      },
      {
        path: "manage-subjects",
        element: <ManageSubjects />,
      },
      {
        path: "manage-locations",
        element: <ManageLocations />,
      },
      // Admin routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "add-tutor",
        element: (
          <AdminRoute>
            <AddTutor />
          </AdminRoute>
        ),
      },
      {
        path: "message",
        element: (
          <AdminRoute>
            <ShowAllMessage />
          </AdminRoute>
        ),
      },
      {
        path: "service",
        element: (
          <AdminRoute>
            <ShowAllService></ShowAllService>
          </AdminRoute>
        ),
      },
      {
        path: "teacher-applications",
        element: (
          <AdminRoute>
            <ShowTeachersApplication />
          </AdminRoute>
        ),
      },
      {
        path: "manage-payments",
        element: (
          <AdminRoute>
            <ManagePayments />
          </AdminRoute>
        ),
      },
      {
        path: "admin-analytics",
        element: (
          <AdminRoute>
            <AdminAnalytics />
          </AdminRoute>
        ),
      },
       {
        path: "story",
        element: (
          <AdminRoute>
            <AddStory></AddStory>
          </AdminRoute>
        ),
      },
      {
        path: "manageStory",
        element: (
          <AdminRoute>
           <ManageStories></ManageStories>
          </AdminRoute>
        ),
      },
      {
        path: "addBlog",
        element: (
          <AdminRoute>
           <AddBlog></AddBlog>
          </AdminRoute>
        ),
      },
      {
        path: "editBlog",
        element: (
          <AdminRoute>
           <AllBlog></AllBlog>
          </AdminRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <AdminRoute>
            <Notifications />
          </AdminRoute>
        ),
      },
      {
        path: "confirmation",
        element: (
          <AdminRoute>
            <Confirmation></Confirmation>
          </AdminRoute>
        ),
      },
      // Payment and Rating routes
      {
        path: "payment/:jobId",
        element: <PaymentForm />,
      },
      {
        path: "rate-tutor/:tutorId",
        element: <TutorRating />,
      },
      // Tutor public profile route (accessible to all)
      {
        path: "tutors/:email",
        element: <TutorProfile />,
      },
      // Add 404 route for unmatched paths
    {
    path: "*",
    element: <NotFound />,
  }
    ],
  },
]);