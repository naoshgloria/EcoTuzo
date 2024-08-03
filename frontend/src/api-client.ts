import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  shopSearchResponse,
  shopType,
  PaymentIntentResponse,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";
import axios from "axios";
const api = axios.create({
  baseURL: 'http://localhost:7012',
});

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`http://localhost:7012/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};
export const fetchAllUsers = async (): Promise<UserType[]> => {
  const response = await fetch(`http://localhost:7012/api/users/allUser`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching All Users");
  }
  return response.json();
};
export const fetchUserById = async (userId:any) : Promise<UserType[]> => {
  const response = await fetch(`http://localhost:7012/api/users/find/${userId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`http://localhost:7012/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`http://localhost:7012/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`http://localhost:7012/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`http://localhost:7012/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyshop = async (shopFormData: FormData) => {
  const response = await fetch(`http://localhost:7012/api/my-shops`, {
    method: "POST",
    credentials: "include",
    body: shopFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add shop");
  }

  return response.json();
};

export const fetchMyshops = async (): Promise<shopType[]> => {
  const response = await fetch(`http://localhost:7012/api/my-shops`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching shops");
  }

  return response.json();
};

export const fetchMyshopById = async (shopId: string): Promise<shopType> => {
  const response = await fetch(`http://localhost:7012/api/my-shops/${shopId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching shops");
  }

  return response.json();
};

export const updateMyshopById = async (shopFormData: FormData) => {
  const response = await fetch(
    `http://localhost:7012/api/my-shops/${shopFormData.get("shopId")}`,
    {
      method: "PUT",
      body: shopFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update shop");
  }

  return response.json();
};
export const updateUser = async (userDataa: any) => {
  
  console.log(userDataa)
  const response = await fetch(`http://localhost:7012/api/users/update/${userDataa._id}`, {
    method: "PUT",
    body: userDataa,
    credentials: "include",
    
  });
  console.log(userDataa.email)
  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

export const fetchShop = async (): Promise<Shop[]> => {
  const response = await api.get('/shops');
  return response.data;
};




export const fetchShopsByAdmin = async (adminId: string): Promise<Shop[]> => {
  const response = await api.get(`/shops/admin/${adminId}`);
  return response.data;
};

export const deleteShop = async (id: string): Promise<void> => {
  await api.delete(`/shops/${id}`);
};
export interface Shop {
  _id: string;
  name: string;
  city: string;
  country: string;
  type: string;
  bottleCode: string;
  rating: number;
  payment: number;
  collection: number;
  location: string;
  adminId: string; 
}



export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchshops = async (
  searchParams: SearchParams
): Promise<shopSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `http://localhost:7012/api/shops/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching shops");
  }

  return response.json();
};

export const fetchshops = async (): Promise<shopType[]> => {
  const response = await fetch(`http://localhost:7012/api/shops`);
  if (!response.ok) {
    throw new Error("Error fetching shops");
  }
  return response.json();
};

export const fetchshopById = async (shopId: string): Promise<shopType> => {
  const response = await fetch(`http://localhost:7012/api/shops/${shopId}`);
  if (!response.ok) {
    throw new Error("Error fetching shops");
  }

  return response.json();
};
export const fetchshopByIddelete = async (shopId: string): Promise<void> => {
  try {
    
    await axios.delete(`http://localhost:7012/api/shops/delete/${shopId}`);
    // If the deletion is successful, simply return void (no need to return anything)
  } catch (error) {
    // If there's an error, handle it appropriately
    console.error('Error deleting shop:', error);
    throw new Error('Error deleting shop');
  }
};

export const createPaymentIntent = async (
  shopId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `http://localhost:7012/api/shops/${shopId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `http://localhost:7012/api/shops/${formData.shopId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<shopType[]> => {
  const response = await fetch(`http://localhost:7012/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};



