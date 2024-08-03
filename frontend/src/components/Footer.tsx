
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
const Footer = () => {
    return (
      <motion.div className="py-10 bg-green-950">
        
        <div className="container flex items-center justify-between mx-auto">
          <span className="text-3xl font-bold tracking-tight text-white">
            Ecotuzo@2024
          </span>
          <span className="flex gap-4 font-bold tracking-tight text-white">
           <Link to={"/About"}> <p className="cursor-pointer">About Us</p></Link>
           <Link to={"/HowItWorks"}> <p className="cursor-pointer">Recycling Tips</p></Link>
           <Link to={"/TermsofService"}> <p className="cursor-pointer">Terms of Service</p></Link>
           <Link to={"/Feedback"}> <p className="cursor-pointer">Feedback</p></Link>
          </span>
        </div>
      </motion.div>
    );
  };
  
  export default Footer;
  