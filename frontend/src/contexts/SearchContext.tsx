import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  code: number;
  childCount: number;
  shopId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    code: number,
    childCount: number
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
  );
  const [code, setCode] = useState<number>(() =>
    parseInt(sessionStorage.getItem("code") || "1")
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "1")
  );
  const [shopId, setshopId] = useState<string>(
    () => sessionStorage.getItem("shopID") || ""
  );

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    code: number,
    childCount: number,
    shopId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setCode(code);
    setChildCount(childCount);
    if (shopId) {
      setshopId(shopId);
    }

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("code", code.toString());
    sessionStorage.setItem("childCount", childCount.toString());

    if (shopId) {
      sessionStorage.setItem("shopId", shopId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        code,
        childCount,
        shopId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
