import { useMutation } from "react-query";
import ManageshopForm from "../forms/ManageshopForm/ManageshopForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const Addshop = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyshop, {
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

  return <ManageshopForm onSave={handleSave} isLoading={isLoading} />;
};

export default Addshop;
