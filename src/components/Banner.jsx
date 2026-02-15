import React from "react";

const Banner = () => {
  // Hum online image use kar rahe hain taaki aapko save na karni pade
  const onlineImage =
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="px-10 py-6">
      {/* Main Container */}
      <div className="relative w-full h-[350px] rounded-3xl overflow-hidden flex shadow-2xl border border-gray-200">
        {/* Left Side: Background Image Area */}
        <div className="relative w-3/5 h-full">
          <img
            src={onlineImage}
            alt="Relief"
            className="w-full h-full object-cover"
          />
          {/* Overlay color */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Hand Icon Section */}
          <div className="absolute left-0 top-0 h-full flex items-center pl-6">
            <div className="bg-white/90 w-20 h-40 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              {/* Hand SVG Icon */}
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#005a42"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Green Content Box */}
        <div className="w-2/5 bg-[#005a42] h-full flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-extrabold leading-tight">
            CEBU <br />
            EARTHQUAKE <br />
            RELIEF
          </h1>
          <p className="mt-6 text-[#ffc107] font-bold text-lg tracking-widest uppercase">
            BID NOW TO HELP PEOPLE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
