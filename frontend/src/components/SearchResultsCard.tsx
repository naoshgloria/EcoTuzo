import { Link } from "react-router-dom";
import { shopType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
type Props = {
  shop: shopType;
};

const SearchResultsCard = ({ shop }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={shop.imageUrls[0]}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: shop.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{shop.type}</span>
          </div>
          <Link
            to={`/detail/${shop._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {shop.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{shop.description}</div>
        </div>

        <div className="grid items-end grid-cols-2 whitespace-nowrap">
          <div className="flex items-center gap-1">
            {shop.facilities.slice(0, 3).map((facility) => (
              <span className="p-2 text-xs font-bold rounded-lg bg-slate-300 whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {shop.facilities.length > 3 &&
                `+${shop.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-bold">£{shop?.pricePerNight} per bottle</span>
            <span className="font-bold">bootle Code:{shop?.code}</span>
            <Link
              to={`/detail/${shop._id}`}
              className="h-full p-2 text-xl font-bold text-white bg-green-600 max-w-fit hover:bg-green-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
