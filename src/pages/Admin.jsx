import React, { useContext, useState } from "react";
import { HotelContext } from "../context/HotelContext.jsx";

const Admin = () => {
  const { hotels, addHotel, deleteHotel, updateHotel } =
    useContext(HotelContext);

  // --- LOGIN STATES ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    startBid: "",
    purchasePrice: "",
    reserve: "",
    fmv: "",
    description: "",
    includes: "",
    notes: "",
    gallery: "",
  });

  // Login Handle
  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "azhar" && pass === "azhar@123") {
      setIsLoggedIn(true);
    } else {
      alert("Wrong Password!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Firebase ke liye data prepare karna
    const dataToSave = {
      ...formData,
      // Gallery agar string hai toh array banao, warna wese hi rehne do
      gallery:
        typeof formData.gallery === "string"
          ? formData.gallery.split(",").map((s) => s.trim())
          : formData.gallery,
    };

    if (editId) {
      updateHotel(editId, dataToSave);
      setEditId(null);
    } else {
      addHotel(dataToSave);
    }

    // Form clear karna
    setFormData({
      name: "",
      img: "",
      startBid: "",
      purchasePrice: "",
      reserve: "",
      fmv: "",
      description: "",
      includes: "",
      notes: "",
      gallery: "",
    });
  };

  const handleEdit = (hotel) => {
    setEditId(hotel.id);
    // Edit karte waqt gallery array ko wapas string banana taake input mein dikhe
    const galleryString = Array.isArray(hotel.gallery)
      ? hotel.gallery.join(", ")
      : hotel.gallery;
    setFormData({ ...hotel, gallery: galleryString });
    window.scrollTo(0, 0);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-6">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-gray-100 text-center"
        >
          <h2 className="text-3xl font-black text-[#005a42] mb-2 uppercase tracking-tighter">
            Admin Portal
          </h2>
          <p className="text-gray-400 text-xs font-bold mb-8 uppercase tracking-widest">
            Enter credentials to manage listings
          </p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-4 border rounded-2xl outline-none focus:ring-2 ring-[#005a42]"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border rounded-2xl outline-none focus:ring-2 ring-[#005a42]"
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-[#005a42] text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-[#005a42] uppercase tracking-tighter">
            {editId ? "📝 Edit Listing" : "➕ Admin Dashboard"}
          </h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-black text-[10px] uppercase hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <input
              type="text"
              placeholder="Hotel Name"
              className="p-3 border rounded-xl"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Main Image URL"
              className="p-3 border rounded-xl"
              value={formData.img}
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Gallery (Comma separated)"
              className="p-3 border rounded-xl"
              value={formData.gallery}
              onChange={(e) =>
                setFormData({ ...formData, gallery: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Start Bid"
              className="p-3 border rounded-xl"
              value={formData.startBid}
              onChange={(e) =>
                setFormData({ ...formData, startBid: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Purchase Price"
              className="p-3 border rounded-xl"
              value={formData.purchasePrice}
              onChange={(e) =>
                setFormData({ ...formData, purchasePrice: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Reserve"
              className="p-3 border rounded-xl"
              value={formData.reserve}
              onChange={(e) =>
                setFormData({ ...formData, reserve: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="p-3 border rounded-xl md:col-span-3 h-24"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <textarea
              placeholder="Includes"
              className="p-3 border rounded-xl md:col-span-2 h-20"
              value={formData.includes}
              onChange={(e) =>
                setFormData({ ...formData, includes: e.target.value })
              }
            />
            <textarea
              placeholder="Notes"
              className="p-3 border rounded-xl h-20"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-[#005a42] text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all"
          >
            {editId ? "Update Hotel" : "Add New Listing"}
          </button>
        </form>

        {/* --- LIVE TOP 3 BIDS SECTION --- */}
        <div className="mb-12">
          <h2 className="text-xl font-black text-gray-800 mb-6 uppercase tracking-widest">
            🏆 Top 3 Bidders Per Hotel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map(
              (hotel) =>
                hotel.bidders &&
                hotel.bidders.length > 0 && (
                  <div
                    key={hotel.id}
                    className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-4 border-b pb-3">
                      <img
                        src={hotel.img}
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                        alt=""
                      />
                      <h3 className="font-black text-[12px] text-[#005a42] truncate uppercase tracking-tight">
                        {hotel.name}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {[...hotel.bidders]
                        .sort((a, b) => b.amount - a.amount)
                        .slice(0, 3)
                        .map((bid, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between items-center p-3 rounded-xl ${idx === 0 ? "bg-green-50 border border-green-100" : "bg-gray-50"}`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ${idx === 0 ? "bg-[#008a6d] text-white" : "bg-gray-200 text-gray-500"}`}
                              >
                                {idx + 1}
                              </span>
                              <p className="font-bold text-gray-800 text-xs">
                                {bid.name}
                              </p>
                            </div>
                            <p
                              className={`font-black text-xs ${idx === 0 ? "text-[#008a6d]" : "text-gray-600"}`}
                            >
                              ${bid.amount}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>

        {/* --- MANAGE LISTINGS --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6 bg-gray-50 border-b font-black text-[10px] text-gray-400 uppercase tracking-widest">
            All Hotels
          </div>
          {hotels.map((h) => (
            <div
              key={h.id}
              className="flex justify-between items-center p-6 border-b hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={h.img}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <span className="font-bold text-gray-700 text-sm">
                  {h.name}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(h)}
                  className="text-blue-600 font-black text-[10px] uppercase bg-blue-50 px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHotel(h.id)}
                  className="text-red-500 font-black text-[10px] uppercase bg-red-50 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
