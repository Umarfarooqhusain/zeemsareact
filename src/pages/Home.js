import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../sanityClient";
import ImageSlider from "../ui/imageSlider";
import styles from "../ui.module.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    // Fetch categories
    client
      .fetch(
        `*[_type == "category"]{
          _id,
          name,
          "imageUrl": image.asset->url
        }`
      )
      .then((data) => setCategories(data))
      .catch(console.error);

    // Fetch featured products
    client
      .fetch(
        `*[_type == "topitem"]{
          _id,
          name,
          "imageUrl": image.asset->url
        }`
      )
      .then((data) => setTopItems(data))
      .catch(console.error);
  }, []);

  return (
    <main>
      <ImageSlider />
      <div id="top-categories" className="flex justify-center">
        <h2
          className={`text-3xl font-semibold tracking-wide mt-9 ${styles.nav}`}
        >
          Top Categories
        </h2>
      </div>
      <div className="p-8 grid text-xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {categories.map((category) => (
          <div key={category._id} className="flex flex-col items-left">
            <Link
              to={`/category/${category._id}`}
              aria-label={`View category: ${category.name}`}
              className="flex items-center justify-center border border-gray-200 shadow-md overflow-hidden transition-transform transform duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-400"
              style={{ width: "300px", height: "300px" }}
            >
              <img
                src={category.imageUrl}
                alt={`Top category: ${category.name}`}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </Link>
            <h3 className="text-sm mt-3 tracking-wide">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Featured Items Section */}
      <div id="featured-products" className="flex justify-center">
        <h2
          className={`text-3xl font-semibold tracking-wide mt-9 ${styles.nav}`}
        >
          Featured Products
        </h2>
      </div>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {topItems.map((item) => (
          <div key={item._id} className="flex flex-col items-left">
            <Link
              to={`/topitem/${item._id}`}
              aria-label={`View featured product: ${item.name}`}
              className="flex items-center justify-center border border-gray-200 shadow-md overflow-hidden transition-transform transform duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-400"
              style={{ width: "300px", height: "300px" }}
            >
              <img
                src={item.imageUrl}
                alt={`Featured product: ${item.name}`}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </Link>
            <h3 className="text-sm tracking-wide mt-2">{item.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
