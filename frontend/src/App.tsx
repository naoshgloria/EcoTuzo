import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Addshop from "./pages/Addshop";
import { useAppContext } from "./contexts/AppContext";
import Myshops from "./pages/Myshops";
import Editshop from "./pages/Editshop";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import PageTitle from "./components/PageTitle";
import ECommerce from "./pages/Dashboard/ECommerce";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import FormElements from "./pages/Form/FormElements";
import FormLayout from "./pages/Form/FormLayout";
import TermsofService from "./pages/TermsofService";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Rating from "./pages/Rating";
import User from "./pages/User";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import FAQ from "./components/FAQ";
import Vision from "./components/Vision";
import Mission from "./components/Mission";
import ContactUs from "./components/ContactUs";
import Feedback from "./components/Feedback";
import UserProfile from "./components/UserProfile";
const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/About"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/HowItWorks"
          element={
            <Layout>
              <HowItWorks />
            </Layout>
          }
        />
        <Route
          path="/TermsofService"
          element={
            <Layout>
              <TermsofService />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:shopId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
       
        
        {isLoggedIn && (
          <>
          <Route
          path="/FAQ"
          element={
            <Layout>
              <FAQ />
            </Layout>
          }
        />
        <Route
          path="/Vision"
          element={
            <Layout>
              <Vision />
            </Layout>
          }
        />
        <Route
          path="/Mission"
          element={
            <Layout>
              <Mission />
            </Layout>
          }
        />
        <Route
          path="/ContactUs"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/Feedback"
          element={
            <Layout>
              <Feedback />
            </Layout>
          }
        />
          <Route
          path="/UserProfile"
          element={
            <Layout>
              <UserProfile />
            </Layout>
          }/>
            <Route
              path="/shop/:shopId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
             <Route
              path="/user"
              element={
                <Layout>
                  <User/>
                </Layout>
              }
            /> 
            <Route
              path="/ECommerce"
              element={
                <Layout>
                  <ECommerce />
                </Layout>
              }
            />
            <Route
              path="/order"
              element={
                <Layout>
                  <Orders />
                </Layout>
              }
            />
            <Route
              path="/UserRating"
              element={
                <Layout>
                  <Rating />
                </Layout>
              }
            />

            
            <Route
              path="/admin/:adminId"
              element={
                <Layout>
                  <AdminDashboard adminId={useParams().adminId!} />
                </Layout>
              }
            />

            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Calendar />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Profile />
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormLayout />
                </>
              }
            />

            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Settings />
                </>
              }
            />

            <Route path="/users" element={<User />} />

            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <SignIn />
                </>
              }
            />

            <Route
              path="/add-shop"
              element={
                <Layout>
                  <Addshop />
                </Layout>
              }
            />
            <Route
              path="/edit-shop/:shopId"
              element={
                <Layout>
                  <Editshop />
                </Layout>
              }
            />
            <Route
              path="/my-shops"
              element={
                <Layout>
                  <Myshops />
                </Layout>
              }
            />

            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
