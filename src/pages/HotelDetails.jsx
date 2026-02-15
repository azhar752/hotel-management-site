import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HotelContext } from "../context/HotelContext.jsx";

const HotelDetails = () => {
  const { id } = useParams();
  const { hotels, updateHotelBids } = useContext(HotelContext);
  const hotel = hotels.find((h) => h.id === id);

  const [mainImg, setMainImg] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (hotel) setMainImg(hotel.img);
  }, [hotel]);

  if (!hotel)
    return (
      <div className="p-20 text-center font-black">Listing Not Found!</div>
    );

  const handleBidSubmit = () => {
    if (!bidAmount || !userName)
      return alert("Please enter both Name and Bid amount!");

    const amount = parseInt(bidAmount);
    const currentTopBid =
      hotel.bidders && hotel.bidders.length > 0 ? hotel.bidders[0].amount : 0;

    if (amount <= currentTopBid) {
      return alert(
        `Bid must be higher than the current top bid of $${currentTopBid}!`,
      );
    }

    const newBids = [{ name: userName, amount }, ...(hotel.bidders || [])]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    updateHotelBids(hotel.id, newBids);
    setBidAmount("");
    setUserName("");
  };

  return (
    <div className="px-16 py-8 max-w-7xl mx-auto bg-white font-sans text-gray-800">
      <nav className="text-[11px] font-bold mb-6 text-gray-400 uppercase tracking-tighter">
        <span className="text-[#005a42] cursor-pointer">Home</span> &nbsp; &gt;
        &nbsp; {hotel.name}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <img
            src={mainImg}
            className="w-full h-[450px] object-cover rounded-[3rem] shadow-sm"
            alt="Hotel"
          />
          <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
            {hotel.gallery?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setMainImg(img)}
                className={`w-24 h-20 object-cover rounded-2xl cursor-pointer border-2 transition-all ${
                  mainImg === img ? "border-[#005a42]" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="px-2">
            <h1 className="text-5xl font-black tracking-tighter leading-tight text-[#1a1a1a]">
              {hotel.name}
            </h1>
            <p className="text-gray-400 font-bold text-sm mt-2 uppercase tracking-widest">
              Reserve ${hotel.reserve} / FMV ${hotel.fmv}
            </p>
          </div>

          <div className="flex justify-between items-center py-5 px-2 border-y border-gray-100">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                Starting Bid
              </p>
              <p className="text-3xl font-black text-[#005a42] tracking-tighter">
                ${hotel.startBid}
              </p>
            </div>
            <div className="w-[1px] h-10 bg-gray-200"></div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                Purchase Price
              </p>
              <p className="text-3xl font-black text-gray-800 tracking-tighter">
                ${hotel.purchasePrice}
              </p>
            </div>
          </div>

          <div className="bg-gray-50/50 p-8 rounded-[3rem] border border-gray-100 shadow-sm">
            <p className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] mb-1">
              Current Bid
            </p>
            <p className="text-6xl font-black text-gray-900 mb-8 tracking-tighter">
              ${hotel.bidders?.[0]?.amount || hotel.startBid}
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:ring-1 ring-[#005a42]"
              />
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full p-3.5 pl-8 bg-white border border-gray-200 rounded-2xl text-sm font-black outline-none"
                  />
                </div>
                <button
                  onClick={handleBidSubmit}
                  className="bg-[#008a6d] text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase hover:bg-black transition-all"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="mt-2 px-2">
            <h3 className="font-black text-sm text-gray-900 mb-4 uppercase tracking-widest">
              Top Bidding
            </h3>
            <div className="space-y-1">
              {hotel.bidders && hotel.bidders.length > 0 ? (
                hotel.bidders.map((b, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2.5 border-b border-gray-50 text-[13px] font-bold"
                  >
                    <span
                      className={`${i === 0 ? "text-[#008a6d]" : "text-gray-400"}`}
                    >
                      ▲ {i + 1}. {b.name}
                    </span>
                    <span className="text-gray-900 font-black">
                      ${b.amount}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-gray-400 font-bold uppercase">
                  No bids yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-20 border-t pt-16">
        <h2 className="text-center text-3xl font-black uppercase tracking-widest mb-12">
          Description
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 text-[15px] text-gray-600 leading-relaxed font-medium">
            {hotel.description}
          </div>
          <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
            <h3 className="font-black text-sm uppercase mb-6 tracking-widest">
              Includes
            </h3>
            <div className="text-xs space-y-3 font-bold text-gray-500 leading-relaxed italic">
              {hotel.includes}
            </div>
            <h3 className="font-black text-sm uppercase mt-10 mb-4 text-red-600 tracking-widest">
              Notes
            </h3>
            <p className="text-[11px] italic font-bold text-red-800/70 leading-relaxed">
              {hotel.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
