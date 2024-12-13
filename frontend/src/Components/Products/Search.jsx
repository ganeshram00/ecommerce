import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [keyword, setkeyword] = useState("");
    const navigate = useNavigate()

    const handleSearch = () => {
        console.log("Searching for:", keyword);
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
            console.log(keyword);
            
        }
    };

    return (
        <div className="flex items-center justify-center p-6 w-full md:h-screen h-[40vh]">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setkeyword(e.target.value)}
                    className="w-full p-3 pl-4 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                    placeholder="Search..."
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Search;
