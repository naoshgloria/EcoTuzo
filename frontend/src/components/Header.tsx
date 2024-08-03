import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../api-client";
import banner from "../assets/banner.png";

const Header = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await fetchCurrentUser();
        setUser(fetchedUser);
      } catch (error) {
        console.log("")
      }
    };
    fetchData();
  }, []);
  const { isLoggedIn } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleComponentRender = (component: any) => {
    setActiveComponent(component);
    navigate(component);
    setDropdownOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100vw" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1, duration: 1.5, type: "spring" }}
      className="relative py-6 pb-16 mb-3 bg-transparent"
    >
      <div className="relative w-full h-64 overflow-hidden">
        <img src={banner}
          className="absolute top-0 left-0 z-10 flex flex-col items-center justify-between w-full h-full "
        />
        <div className="absolute top-0 left-0 z-10 flex flex-col items-center justify-between w-full h-full">
          <div className="container flex justify-between mx-auto mt-4">
            <motion.span
              initial={{ opacity: 0.4, y: "-100vw" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                duration: 0.5,
                stiffness: 50,
              }}
              className="text-3xl font-bold tracking-tight text-white"
            >
              
            </motion.span>
            <span className="relative flex space-x-2">
              {isLoggedIn && user?.role === "user" ? (
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-3 font-bold text-green-950 rounded-md hover:bg-green-600"
                >
                  <FaBars className="ml-2" />
                </button>
              ):null}

              {isLoggedIn && dropdownOpen && user?.role === "user" ? (
                <div className="absolute right-0 z-20 w-full max-h-fit bg-white rounded-md shadow-lg mt-9">
                  <button
                    onClick={() => handleComponentRender("UserProfile")}
                    className="flex items-center w-full px-4 py-2 text-left text-green-950 hover:bg-gray-200"
                  >
                    My Profile
                  </button>
                  
                  <button
                    onClick={() => handleComponentRender("Vision")}
                    className="flex items-center w-full px-4 py-2 text-left text-green-950 hover:bg-gray-200"
                  >
                    Vision
                  </button>
                  <button
                    onClick={() => handleComponentRender("Mission")}
                    className="flex items-center w-full px-4 py-2 text-left text-green-950 hover:bg-gray-200"
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => handleComponentRender("FAQ")}
                    className="flex items-center w-full px-4 py-2 text-left text-green-950 hover:bg-gray-200"
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => handleComponentRender("ContactUs")}
                    className="flex items-center w-full px-4 py-2 text-left text-green-950 hover:bg-gray-200"
                  >
                    Contact Us
                  </button>
                  
                  <button
                    onClick={() => handleComponentRender("Feedback")}
                    className="flex items-center w-full px-4 py-2 text-left text-green-950 hover:bg-gray-200"
                  >
                    Feedback
                  </button>

                </div>
              ):null}
              {isLoggedIn ? (
                <>
                  
                  {user?.role === "user" && (
                    <>
                      {/* <Link
                        className="flex items-center px-3 font-bold text-black rounded-md hover:bg-blue-600"
                        to="/my-bookings"
                      >
                        My Bottles
                      </Link> */}
                      <Link
                        className="flex items-center px-3 font-bold text-green-950 rounded-md hover:bg-green-600"
                        to="/my-shops"
                      >
                        My-Deport
                      </Link>
                    </>
                  )}
                  
                  <Link
                    className="flex items-center px-3 font-bold text-green-950 rounded-md hover:bg-green-600"
                    to="/ECommerce"
                  >
                    Dashboard
                  </Link>

                  <SignOutButton />
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    className="flex items-center px-3 font-bold text-green-600 bg-white rounded-md hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </span>
          </div>
          <div className="container flex flex-col gap-2 mx-auto mt-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: "-100vw" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.9,
                duration: 1.5,
                type: "spring",
                stiffness: 40,
              }}
              className="text-5xl font-bold font-thin text-green-700"
            >
              
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 2.2 }}
              className="mb-4 text-2xl font-semibold text-green-950"
            >
              
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
