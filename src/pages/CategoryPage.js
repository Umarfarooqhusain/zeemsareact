import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../sanityClient";
import styles from "../ui.module.css"; // Adjust the path to your CSS module

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "category" && _id == $id]{
          _id,
          name,
          "image": image.asset->url,
          "products": products[] {
            _id,
            name,
            "imageUrl": image.asset->url
          }
        }[0]`,
        { id }
      )
      .then((data) => setCategory(data))
      .catch(console.error);
  }, [id]);

  if (!category) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-8">
      {/* Category Title */}
      <div className="flex justify-center">
        <span
          className={`text-3xl font-semibold tracking-wide mt-10 md:mt-28 ${styles.nav}`}
        >
          {category.name}
        </span>
      </div>

      {/* Product Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {category.products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center border border-gray-200 shadow-md overflow-hidden transition-transform transform duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-400"
          >
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-cover max-w-[300px] max-h-[300px]"
            />
            <h3 className="text-sm mt-3 tracking-wide text-center">
              {product.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
