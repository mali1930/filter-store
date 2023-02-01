import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Header from "./Header";
import Categories from "./Categories";
import Skeleton from "./Skeleton";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("women's clothing");

  const filteredProducts = useMemo(() => {
    if (!category) return products;
    return products.filter((p) => p.category === category);
  }, [category, products]);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await axios.get("https://fakestoreapi.com/products");
    setProducts(data);
    setLoading(false);
  }

  async function filterProducts(sort) {
    setLoading(true);
    const { data } = await axios.get(
      `https://fakestoreapi.com/products?sort=${sort}`
    );
    data.sort((a, b) => (sort === "desc" ? -1 : 1) * (a.price - b.price));
    data.sort(
      (a, b) => (sort === "rate" ? -1 : 1) * (a.rating.rate - b.rating.rate)
    );
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="mt-10 px-20">
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => filterProducts(e.target.value)}
        >
          <option value="">Default</option>
          <option value="asc">Price, Low to High</option>
          <option value="desc">Price, High to Low</option>
          <option value="rate">Most rating</option>
        </select>
      </div>
      <div>
        <Categories onClick={setCategory} />
      </div>
      <div className="flex flex-row justify-center w-full px-4 flex-wrap  gap-4  mt-10 ">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="mb-4 cursor-pointer max-w-sm flex flex-col py-5 items-center rounded-lg justify-center border-2 px-6"
          >
            <div className="max-w-[220px] ">
              <img className="w-60 h-60 object-fill" src={product.image} />

              <h1 className="md:text-lg mt-10 font-bold" key={product.id}>
                {product.title}
              </h1>

              <p>${product.price}</p>
              <p>{product.rating.rate}</p>
            </div>
          </div>
        ))}
      </div>
      )}
    </>
  );
};

export default Home;
