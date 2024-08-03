import { shopTypes } from "../config/shop-options-config";

type Props = {
  selectedshopTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const shopTypesFilter = ({ selectedshopTypes, onChange }: Props) => {
  return (
    <div className="pb-5 border-b border-slate-300">
      <h4 className="mb-2 font-semibold text-md">shop Type</h4>
      {shopTypes.map((shopType) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={shopType}
            checked={selectedshopTypes.includes(shopType)}
            onChange={onChange}
          />
          <span>{shopType}</span>
        </label>
      ))}
    </div>
  );
};

export default shopTypesFilter;
