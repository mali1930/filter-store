import axios from "axios";
import React, { useState } from "react";

const Header = () => {
  // const [query, setQuery] = useState(" ");

  // const handleSearch() => {
  //   if(query==="Enter")
  // }

  // async function search{
  //   const { data } = await axios.get("https://fakestoreapi.com/products")
    
  // }
  
  return (
    <div className="bg-black gap-4 max-w-full flex items-center justify-between px-2 text-white h-24 mb-2">
      <div>Home</div>
      <div className="max-w-[100%]">
        <input
          // onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="search..."
          className="outline-none px-2 text-black py-2 max-w-[100%] rounded-md w-[200px] md:w-[550px]"
        />
      </div>
    </div>
  );
};

export default Header;
