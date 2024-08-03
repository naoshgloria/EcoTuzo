import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { shopId } = useParams();

  const { data: shop } = useQuery(
    "fetchshopById",
    () => apiClient.fetchshopById(shopId || ""),
    {
      enabled: !!shopId,
    }
  );

  if (!shop) {
    return <></>;
  }
  const point = shop?.pricePerNight * shop?.childCount;
  return (
    <div className="space-y-6">
      <div key={shop._id}>
        <span className="flex">
          {Array.from({ length: shop?.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{shop.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {shop?.imageUrls.map((image, index) => (
          <div className="h-[300px] " key={index}>
            <img
              src={image}
              alt={shop.name}
              className="object-cover object-center w-full h-full rounded-md"
            />
          </div>
        ))}
        <div className="block gap-3">
          <div className="m-5 text-2xl center">
            Bottle code Number {shop?._id}
          </div>
          <div className="m-5 text-2xl center">
            Bottle Price {shop?.pricePerNight}
          </div>
          <div className="m-5 text-2xl center">Rewards {point}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
        {shop.facilities.map((facility) => (
          <div className="p-3 border rounded-sm border-slate-300">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{shop.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={shop?.pricePerNight}
            shopcode={shop?.code}
            shoppoint={shop?.childCount}
            point={shop?.adultCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
