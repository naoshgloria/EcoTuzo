import { useFormContext } from "react-hook-form";
import { shopFormData } from "./ManageshopForm";

const DetailsSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<shopFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-3 text-3xl font-bold">Add Depots</h1>
      <label className="flex-1 text-sm font-bold text-green-700">
        Your Name/ Shop Name
        <input
          type="text"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="flex-1 text-sm font-bold text-green-700">
          Town/Location
          <input
            type="text"
            className="w-full px-2 py-1 font-normal border rounded"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-green-700">
          Country
          <input
            type="text"
            className="w-full px-2 py-1 font-normal border rounded"
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="flex-1 text-sm font-bold text-green-700">
        Description of your location
        <textarea
          rows={10}
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-green-700 text-sm font-bold max-w-[50%] hidden">
        Points Value
        <input
          type="number"
          min={1}
          max={10000000000}
          value={10}
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-green-700 text-sm font-bold max-w-[50%]">
        Enter Bottle Codes
        <input
          type="number"
          min={1}
          max={10000000000}

          className="w-full px-2 py-1 font-normal border rounded"
          {...register("code", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-green-700 text-sm font-bold max-w-[50%] hidden">
        Points per Bottle
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="w-full p-2 font-normal text-green-700 border rounded"
        >
          <option value={2} className="text-sm font-bold">
            2
          </option>
          {[10, 20, 30].map((num) => (
            
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
