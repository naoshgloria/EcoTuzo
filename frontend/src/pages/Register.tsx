import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  PhoneNumber: number;
  password: string;
  confirmPassword: string;
  username:string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 mb-10" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col gap-5 md:flex-row">
        <label className="flex-1 text-sm font-bold text-green-700">
          First Name
          <input
            className="w-full px-2 py-1 font-normal border rounded"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-green-700">
          Last Name
          <input
            className="w-full px-2 py-1 font-normal border rounded"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="flex-1 text-sm font-bold text-gray-700">
          Username
          <input
            className="w-full px-2 py-1 font-normal border rounded"
            {...register("username", { required: "This field is required" })}
          ></input>
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </label>
      <label className="flex-1 text-sm font-bold text-green-700">
        Email
        <input
          type="email"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-green-700">
        Phone Number
        <input
          type="PhoneNumber"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("PhoneNumber", { required: "This field is required" })}
        ></input>
        {errors.PhoneNumber && (
          <span className="text-red-500">{errors.PhoneNumber.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-green-700">
        Password
        <input
          type="password"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-green-700">
        Confirm Password
        <input
          type="password"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="p-2 text-xl font-bold text-white bg-green-600 hover:bg-green-500"
        >
          Create Account
        </button>
      </span>
    </form>
    
  );
};

export default Register;
