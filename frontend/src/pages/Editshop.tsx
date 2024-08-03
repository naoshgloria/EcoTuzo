import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageshopForm from "../forms/ManageshopForm/ManageshopForm";
import { useAppContext } from "../contexts/AppContext";

const Editshop = () => {
  const { shopId } = useParams();
  const { showToast } = useAppContext();

  const { data: shop } = useQuery(
    "fetchMyshopById",
    () => apiClient.fetchMyshopById(shopId || ""),
    {
      enabled: !!shopId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyshopById, {
    onSuccess: () => {
      showToast({ message: "shop Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving shop", type: "ERROR" });
    },
  });

  const handleSave = (shopFormData: FormData) => {
    mutate(shopFormData);
  };

  return (
    <ManageshopForm shop={shop} onSave={handleSave} isLoading={isLoading} />
  );
};

export default Editshop;
