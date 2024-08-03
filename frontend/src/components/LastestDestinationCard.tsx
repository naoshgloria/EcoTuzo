import { Link } from "react-router-dom";
import { shopType } from "../../../backend/src/shared/types";

type Props = {
  shop: shopType;
};

const LatestDestinationCard = ({ shop }: Props) => {
  return (
    <Link
      to={`/detail/${shop._id}`}
      className="relative overflow-hidden rounded-md cursor-pointer"
    >
      <div className="h-[300px]">
        <img
          src={shop?.imageUrls[0]}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="absolute bottom-0 w-full p-4 bg-green-959 bg-opacity-50 rounded-b-md">
        <span className="text-3xl font-bold tracking-tight text-white">
          {shop?.name}
        </span>
      </div>
      <div className="absolute bottom-0 w-full p-4 bg-green-950 bg-opacity-50 rounded-b-md">
        <span className="text-3xl font-bold tracking-tight text-white">
          Bottle code
          {shop?.code}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
