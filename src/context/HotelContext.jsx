import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, push, remove } from "firebase/database";

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);

  // Firebase se data load karna
  useEffect(() => {
    const hotelsRef = ref(db, "hotels");
    onValue(hotelsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setHotels(list);
      } else {
        setHotels([]);
      }
    });
  }, []);

  // Naya Hotel Firebase mein add karna
  const addHotel = (newHotel) => {
    const hotelsRef = ref(db, "hotels");
    const processedHotel = {
      ...newHotel,
      gallery:
        typeof newHotel.gallery === "string"
          ? newHotel.gallery.split(",").map((s) => s.trim())
          : newHotel.gallery || [newHotel.img],
      bidders: [],
    };
    push(hotelsRef, processedHotel);
  };

  // --- YE WALA FUNCTION MISSING THA, ISE ADD KAR DIYA HAI ---
  const deleteHotel = (id) => {
    const hotelDoc = ref(db, `hotels/${id}`);
    remove(hotelDoc);
  };

  return (
    <HotelContext.Provider value={{ hotels, addHotel, deleteHotel }}>
      {children}
    </HotelContext.Provider>
  );
};
