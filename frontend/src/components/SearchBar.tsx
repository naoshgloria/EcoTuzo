import { FormEvent, useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [points, setPoints] = useState<any>(3);
  const [bottles, setBottles] = useState<any>(1);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [code, setCode] = useState<number>(search.code);
  const [childCount, setChildCount] = useState<number>(search.childCount);
 const handpoint = () =>{
  setPoints([ ...points, bottles*points]);
 }
 
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      code,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <motion.form
    initial={{opacity:0}}
    transition={{delay:2.3,duration:2.3}}
    animate={{opacity:1}}
      onSubmit={handleSubmit}
      className="grid items-center grid-cols-2 gap-4 p-3 -mt-8 bg-orange-100 rounded shadow-md lg:grid-cols-3 2xl:grid-cols-5"
    >
      <div className="flex flex-row items-center flex-1 p-2 bg-white">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you located?"
          className="w-full text-md focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex gap-2 px-2 py-1 bg-white ">
        <label className="flex items-center flex-1 gap-2">
          <span>Code:</span>
          <input
            className="w-full p-1 font-bold focus:outline-none"
            type="number"
             min={1}
             max={2000000000000000000000}
            value={bottles}
            
           onChange={(event) => setBottles(parseInt(event.target.value))}
          />
        </label>
        {/* <label className="items-center hidden">
          <span>Points: </span>
          
           <input
           disabled
            className="w-full p-1 font-bold focus:outline-none"
            type="number"
            // min={0}
            // max={20}
            value={points*bottles}
            //onChange={(event) => setChildCount(parseInt(event.target.value))}
          /> 
        </label> */}
      </div>
      
      <div className="flex items-end gap-1">
        <button className="w-2/3 h-full p-2 text-xl font-bold text-white bg-green-600 hover:bg-green-500">
          Search
        </button>
        
      </div>
    </motion.form>
  );
};

export default SearchBar;
