import axios from "axios";
import React, { useState, useEffect } from "react";

const Categories = ({ onClick }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  async function filterCategories() {
    const { data } = await axios.get(
      `https://fakestoreapi.com/products/categories`
    );
    setCategories(["all", ...data]);
  }

  useEffect(() => {
    filterCategories();
  }, []);

  const handleClick = (item) => {
    setCategory(item);
    onClick(item === "all" ? "" : item);
  };

  return (
    <div className="flex gap-3 justify-center mt-10">
      {categories.map((item) => (
        <div onClick={() => handleClick(item)} key={item}>
          <h1
            className={`border-2 p-2 cursor-pointer rounded ${
              category === item ? "bg-blue-600" : ""
            }`}
          >
            {item}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Categories;
