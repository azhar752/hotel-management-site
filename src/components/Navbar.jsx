import React from "react";

const Navbar = () => {
  // Brand Name aap yahan change kar sakte hain
  const brandName = "Azhar";
  const firstLetter = brandName.charAt(0);

  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-black text-white shadow-xl">
      {/* Logo Section with Profile Circle */}
      <div className="flex items-center gap-4">
        {/* DP/Profile Circle - White background with Black text */}
        <div className="w-11 h-11 bg-white text-black rounded-full flex items-center justify-center font-bold text-2xl shadow-md">
          {firstLetter}
        </div>

        {/* Brand Name - White Text */}
        <div className="text-2xl font-bold tracking-tight uppercase">
          {brandName}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-12">
        <a
          href="/"
          className="text-gray-300 font-medium hover:text-white transition duration-300"
        >
          Home
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
