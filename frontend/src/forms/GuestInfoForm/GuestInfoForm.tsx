import React from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchCurrentUser } from "../../api-client";

type Props = {
  pricePerNight: number;
  shopcode: any;
  shoppoint: any;
  point: any;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  bottles: number;
  childCount: number;
};

const GuestInfoForm: React.FC<Props> = ({ pricePerNight, shopcode, shoppoint, point }) => {
  const search = useSearchContext();
  const { shopId } = useParams();
  const { isLoggedIn } = useAppContext(); // Get user from context
  const navigate = useNavigate();
  const location = useLocation();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      bottles: 1,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  
  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.bottles,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = async (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.bottles,
      data.childCount
    );

    if (isLoggedIn) {
      try {
        const user = await fetchCurrentUser();
        
        const response = await fetch(`http://localhost:7012/api/redeem`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?._id,
            shopId,
            Collection: 20,
            points: point,
          }),
        });
      
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      
        const result = await response.json();

        console.log("Redemption request created:", result);
      } catch (error) {
        console.log("Error creating redemption request:", error);
      }
    } else {
      navigate("/sign-in", { state: { from: location } });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-green-200">
      <h3 className="font-bold text-md">{pricePerNight} ksh</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid items-center grid-cols-1 gap-4">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full p-2 bg-white focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full p-2 bg-white focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex gap-2 px-2 py-1 bg-white">
            <label className="flex items-center">
              Bottles:
              <input
                className="w-full p-1 font-bold focus:outline-none"
                type="number"
                min={1}
                max={20000000}
                {...register("bottles", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>

            <label className="flex items-center">
              Points:
              <input
                className="w-full p-1 font-bold focus:outline-none"
                type="number"
                value={point}
                min={1}
                max={20000000000}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.bottles && (
              <span className="text-sm font-semibold text-red-500">
                {errors.bottles.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="h-full p-2 text-xl font-bold text-white bg-green-600 hover:bg-green-500">
              Redeem Now
              
            </button>
          ) : (
            <button className="h-full p-2 text-xl font-bold text-white bg-green-600 hover:bg-green-500">
              Sign in to Redeem
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
