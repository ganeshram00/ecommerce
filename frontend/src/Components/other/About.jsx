import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center tracking-tight underline">
          About <span className="text-blue-600">Us</span>
        </h1>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Section: Image */}
          <div className="flex-1">
            <div className="relative w-full">
              <img
                src="/images/shoping.png"
                alt="About us"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute -top-6 -left-6 bg-blue-200 rounded-full h-16 w-16"></div>
              <div className="absolute -bottom-6 -right-6 bg-blue-400 rounded-full h-12 w-12"></div>
            </div>
          </div>

          {/* Right Section: Content */}
          <div className="flex-1 text-gray-700">
            <p className="mb-6 text-lg leading-relaxed">
              Welcome to <span className="font-semibold text-blue-600">YourShop</span>, your number one source for all
              things fashion. We're dedicated to providing you with the very best of clothing and accessories, focusing
              on quality, customer service, and uniqueness.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              Founded in 2023, YourShop has grown from a small home office into a trusted brand, driven by a passion for
              eco-friendly and stylish products.
            </p>
            <p className="text-lg leading-relaxed">
              We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or
              comments, please don't hesitate to <span className="text-blue-600 underline">contact us</span>.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            To deliver high-quality, stylish, and sustainable products that align with your personality and lifestyle.
          </p>
        </div>

        {/* Values Section */}
        <div className="mt-16 bg-white shadow-lg rounded-lg p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Core Values</h2>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657A8 8 0 118.343 7.343a8 8 0 019.314 9.314z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12h.01M12 15h.01M9 12h.01M12 9h.01"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Innovation</h3>
              <p className="text-gray-600 mt-2">
                Continuously improving to provide you with the latest trends.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h11M9 21V3m7 14h3m-3-6h3"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Sustainability</h3>
              <p className="text-gray-600 mt-2">
                Ensuring our products are eco-friendly and sustainable.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16h8M8 12h8m-6 4v8m4-8v8m-7-6H4a2 2 0 012-2V4a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 002 2h3"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Excellence</h3>
              <p className="text-gray-600 mt-2">
                Providing high-quality products and customer service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
