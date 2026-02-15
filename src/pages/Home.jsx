import React, { useState, useContext } from "react";
import Banner from "../components/Banner.jsx";
import { useNavigate } from "react-router-dom";
import { HotelContext } from "../context/HotelContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { hotels } = useContext(HotelContext); // Seedha Context se data
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Banner />
      <div className="px-10 py-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black text-gray-800 tracking-tighter uppercase">
            Auction Items
          </h2>
          <input
            type="text"
            placeholder="Search by hotel name..."
            className="p-3 border rounded-2xl w-80 shadow-sm outline-none focus:ring-2 ring-[#005a42]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => navigate(`/hotel/${hotel.id}`)}
              className="bg-white border rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer relative"
            >
              <div className="absolute top-4 right-4 bg-[#008a6d] text-white text-[10px] font-black px-3 py-1 rounded-full z-10 uppercase shadow-md">
                Bid Now
              </div>
              <img
                src={hotel.img}
                className="w-full h-48 object-cover"
                alt={hotel.name}
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                {/* --- Added $ logos below --- */}
                <p className="text-gray-400 text-[10px] font-bold">
                  Reserve ${hotel.reserve} / FMV ${hotel.fmv}
                </p>
                <div className="flex justify-between mt-6 border-t pt-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black">
                      Start Bid
                    </p>
                    <p className="font-black text-xl text-[#005a42]">
                      ${hotel.startBid}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black">
                      Purchase
                    </p>
                    <p className="font-black text-xl">${hotel.purchasePrice}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
