import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: shops } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!shops || shops.length === 0) {
    return <span>No bottle found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bottles</h1>
      {shops.map((shop) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={shop.imageUrls[0]}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {shop.name}
              <div className="text-xs font-normal">
                {shop.city}, {shop.country}
              </div>
            </div>
            {shop.bookings.map((booking) => (
              <div>
                <div>
                  <span className="mr-2 font-bold">Dates: </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="mr-2 font-bold">Rewards:</span>
                  <span>
                    {booking.adultCount} Bottles, {booking.childCount} Points
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
