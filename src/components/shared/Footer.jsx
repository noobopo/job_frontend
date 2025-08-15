import React from "react";

const Footer = () => {
  return (
    <footer className="border-t shadow py-4 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* Left - Brand */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-orange-400">JobPortal</h2>
          <p className="text-sm text-gray-600">Find your dream job here.</p>
        </div>

        <div className=" border-gray-300 pt-3 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>

        {/* Middle - Contact */}
        <div className="text-sm text-center sm:text-right text-gray-600">
          <p>Email: kishalaydas971@gmail.com</p>
          <p>Phone: +91 93305 71275</p>
        </div>
      </div>

      {/* Bottom - Copyright */}
    </footer>
  );
};

export default Footer;
