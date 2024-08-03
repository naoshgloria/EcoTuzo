import { useFormContext } from "react-hook-form";
import { shopFacilities } from "../../config/shop-options-config";
import { shopFormData } from "./ManageshopForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<shopFormData>();

  return (
    <div>
      {/* Facilities */}
      <h2 className="mb-3 text-2xl font-bold">Bottle Size</h2>
      <div className="grid grid-cols-5 gap-3">
        {shopFacilities.map((facility) => (
          <label className="flex gap-1 text-sm text-green-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-sm font-bold text-red-500">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
