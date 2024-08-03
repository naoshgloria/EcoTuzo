import Footer from "../components/Footer";
import Header from "../components/Header";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ backgroundColor: "white", opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ delay: 0.9, duration: 2.9 }}
      className="flex flex-col min-h-screen bg-lime-100"
    >
      <Header />
      <motion.div className="container mx-auto bg-lime-100">
        <SearchBar /> 
      </motion.div>
      <div className="container flex-1 py-10 mx-auto bg-white">
        <div className="">{children}</div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Layout;
