import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Contact = () => {
  return (
    <div className="min-h-screen  py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-12 text-center tracking-tight underline">
          Contact <span className="text-blue-600">Us</span>
        </h1>

        {/* Contact Info Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center text-gray-500">
          {/* Email Section */}
          <div className="flex flex-col items-center cursor-pointer">
            <div className="bg-blue-100 p-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-blue-200">
              <MdEmail className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Email Us</h3>
            <p className="text-blue-600 mt-2">support@yourshop.com</p>
          </div>

          {/* Phone Section */}
          <div className="flex flex-col items-center cursor-pointer">
            <div className="bg-blue-100 p-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-blue-200">
              <MdPhone className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Call Us</h3>
            <p className="text-blue-600 mt-2">+1 (123) 456-7890</p>
          </div>

          {/* Address Section */}
          <div className="flex flex-col items-center cursor-pointer">
            <div className="bg-blue-100 p-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-blue-200">
              <MdLocationOn className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Visit Us</h3>
            <p className="text-blue-600 mt-2 text-center">
              123 Main Street, Suite 100
              <br />
              Jaipur, Rajasthan
            </p>
          </div>
        </div>

        {/* Additional Note */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-blue-600">We’d Love to Hear From You</h2>
          <p className="text-lg text-blue-400 mt-4 max-w-xl mx-auto">
            Whether you have a question about products, shipping, or anything else, our team is ready to assist you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
