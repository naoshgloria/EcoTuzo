import { shopType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  shop: shopType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  shop,
}: Props) => {
  return (
    <div className="grid gap-4 p-5 border rounded-lg border-slate-300 h-fit">
      <h2 className="text-xl font-bold">Your Bottles Details</h2>
      <div className="py-2 border-b">
        Location:
        <div className="font-bold">{`${shop.name}, ${shop.city}, ${shop.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold"> {checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold"> {checkOut.toDateString()}</div>
        </div>
      </div>
       <div className="py-2 border-t border-b">
        Total number of  bottles:
        <div className="font-bold">{numberOfNights} bottles</div>
      </div> 

      <div>
        Rewards{" "}
        <div className="font-bold">
          {adultCount} bottles & {childCount} points
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
