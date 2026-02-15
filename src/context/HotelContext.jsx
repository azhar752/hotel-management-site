import React, { createContext, useState, useEffect } from "react";
export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem("hotels");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("hotels", JSON.stringify(hotels));
  }, [hotels]);

  // 1. Naya Hotel Add karne ke liye
  const addHotel = (newHotel) => {
    const hotelWithId = {
      ...newHotel,
      id: Date.now().toString(),
      // Gallery ko comma se alag karke array banana
      gallery: newHotel.gallery
        ? newHotel.gallery.split(",").map((s) => s.trim())
        : [newHotel.img],
      bidders: [],
    };
    setHotels([...hotels, hotelWithId]);
  };

  // 2. Hotel Delete karne ke liye
  const deleteHotel = (id) => setHotels(hotels.filter((h) => h.id !== id));

  // 3. Hotel UPDATE karne ke liye (Ye wala missing tha)
  const updateHotel = (id, updatedData) => {
    setHotels(
      hotels.map((h) =>
        h.id === id
          ? {
              ...h,
              ...updatedData,
              // Gallery ko handle karna ke wo string hai ya array
              gallery:
                typeof updatedData.gallery === "string"
                  ? updatedData.gallery.split(",").map((s) => s.trim())
                  : updatedData.gallery,
            }
          : h,
      ),
    );
  };

  // 4. Bidding update karne ke liye
  const updateHotelBids = (id, newBidders) => {
    setHotels(
      hotels.map((h) => (h.id === id ? { ...h, bidders: newBidders } : h)),
    );
  };

  return (
    <HotelContext.Provider
      // updateHotel ko yahan value mein add karna zaroori hai
      value={{ hotels, addHotel, deleteHotel, updateHotel, updateHotelBids }}
    >
      {children}
    </HotelContext.Provider>
  );
};
