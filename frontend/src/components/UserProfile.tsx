import { useState, useEffect } from "react";
import { fetchCurrentUser } from "../api-client";



const UserProfile = () => {
  const [user, setUser] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await fetchCurrentUser();
        setUser(fetchedUser);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="my-8 relative">
      <h1 className="text-3xl font-bold text-center text-green-700">My Profile</h1>
      <div className="max-w-md gap-5 p-4 mx-auto bg-green-200 rounded-md shadow-md mt-9">
        <h2 className="font-semibold">Username: {user?.username}</h2>
        <h2 className="mt-2 font-semibold">Email Address: {user?.email}</h2>
        <h2 className="mt-2 font-semibold">Status: {user?.status}</h2>
        <h2 className="mt-2 font-semibold">Phone Number:0712089000 {user?.Phone}</h2>
        <h2 className="mt-2 font-semibold">Points: 98 {user?.points}</h2>

        <button onClick={() =>setOpen(!open)} className="" ><h3 className="text-2xl font-bold text-center text-green-700">
          Reedem Points</h3></button>
      </div>
      {
        open&&(
          <div className="absolute top-[-80px] left-[-80px] right-[-80px] bottom-[-80px] bg-slate-300 opacity-100 items-center -z-100">
            <div className="items-center justify-center w-[50%] max-h-max bg-green-950 m-auto mb-10">
              <div onClick={() => setOpen(false)} className="p-10 m-9 text-red-600 items-end top-[-10] h-14 "> ❌</div>
            <div>
              <div>
                <img src="" />
                <div className=" items-center w-[50%] h-[50%] justify-center m-auto mb-10 text-center font-bold text-2xl text-white">Kindly Visit the customer care desk to get a voucher for your shopping. Thank you for recycling</div>
              </div>
            </div>
            </div>
          </div>
        )
      }
    </section>
    
  );
};

export default UserProfile;
