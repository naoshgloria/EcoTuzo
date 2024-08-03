import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import {  BiMoney, BiStar } from "react-icons/bi";

const Myshops = () => {
  const { data: shopData } = useQuery(
    "fetchMyshops",
    apiClient.fetchMyshops,
    {
      onError: () => {},
    }
  );

  if (!shopData) {
    return <span>No bottle found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Depots</h1>
        <Link
          to="/add-shop"
          className="flex p-2 text-xl font-bold text-white bg-green-600 hover:bg-green-500"
        >
          Add Bottle
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {shopData.map((shop) => (
          <div
            data-testid="shop-card"
            className="flex flex-col justify-between gap-5 p-8 border rounded-lg border-slate-300"
          >
            <h2 className="text-2xl font-bold">{shop.name}</h2>
            <div className="whitespace-pre-line">{shop.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="flex items-center p-3 border rounded-sm border-slate-300">
                <BsMap className="mr-1" />
                {shop.city}, {shop.country}
              </div>
              <div className="flex items-center p-3 border rounded-sm border-slate-300">
                <BsBuilding className="mr-1" />
                {shop.type}
              </div>
              <div className="flex items-center p-3 border rounded-sm border-slate-300">
                <BiMoney className="mr-1" />£{shop.pricePerNight} per day
              </div>
              <div className="flex items-center p-3 border rounded-sm border-slate-300">
                <h2 className="mr-1" />
                {shop.adultCount} Bottle, {shop.childCount} Points
              </div>
              <div className="flex items-center p-3 border rounded-sm border-slate-300">
                <BiStar className="mr-1" />
                {shop.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-shop/${shop._id}`}
                className="flex p-2 text-xl font-bold text-white bg-green-600 hover:bg-green-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myshops;
