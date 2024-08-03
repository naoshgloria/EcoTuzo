import { useFormContext } from "react-hook-form";
import { shopTypes } from "../../config/shop-options-config";
import { shopFormData } from "./ManageshopForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<shopFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {shopTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-green-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-sm font-bold text-red-500">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
