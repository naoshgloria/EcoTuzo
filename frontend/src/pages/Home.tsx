import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";

const Home = () => {
  const { data: shops } = useQuery("fetchQuery", () =>
    apiClient.fetchshops()
  );

  const topRowshops = shops?.slice(0, 2) || [];
  const bottomRowshops = shops?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent depots added by our bottle Collectors</p>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {topRowshops.map((shop) => (
            <LatestDestinationCard shop={shop} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {bottomRowshops.map((shop) => (
            <LatestDestinationCard shop={shop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
