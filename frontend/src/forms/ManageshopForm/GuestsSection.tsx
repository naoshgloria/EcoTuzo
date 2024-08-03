import { useFormContext } from "react-hook-form";
import { shopFormData } from "./ManageshopForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<shopFormData>();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Rewards</h2>
      <div className="gap-5 p-6 bg-gray-300 ">
        <label className="flex-1 w-full text-sm font-semibold text-green-700">
          Bottles
          <input
            className="w-full px-3 py-2 font-normal border rounded"
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-sm text-red-500 fold-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        
      </div>
      <label className="hidden">
          Points
          <input
            className=""
            type="number"
            min={1}
        value={10}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-sm text-red-500 fold-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
    </div>
  );
};

export default GuestsSection;
