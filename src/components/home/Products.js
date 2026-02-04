import React from "react";
import { useLoaderData } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/makitimaSlice";

const Products = () => {
  const dispatch = useDispatch ()
  const productData = useLoaderData(); // expects an array of product objects

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4">
      {productData.map((item) => (
        <div
          key={item.id}
          className="bg-white h-auto border border-gray-200 py-8 z-30 hover:border-transparent shadow-none hover:shadow-lg duration-200 flex flex-col gap-4 relative"
        >
          {/* Category tag */}
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
            {item.category}
          </span>

          {/* Product image + overlay */}
          <div className="w-full h-auto flex items-center justify-center relative">
            <img
              className="w-52 h-64 object-contain"
              src={item.image}
              alt={item.title}
            />

            {/* Overlay icons */}
            <ul className="w-full h-36 bg-gray-100 absolute bottom-0 flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r opacity-0 hover:opacity-100 transition-opacity duration-200">
              <li className="productLi">
                Compare <span><ApiIcon /></span>
              </li>
              <li className="productLi">
                Add to Cart <span><ShoppingCartIcon /></span>
              </li>
              <li className="productLi">
                View Details <span><ArrowCircleRightIcon /></span>
              </li>
              <li className="productLi">
                Wishlist <span><FavoriteIcon /></span>
              </li>
            </ul>
          </div>

          {/* Product info */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between">
              <p className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                {item.title.substring(0, 20)}...
              </p>
              <p className="text-sm text-gray-600 font-semibold">${item.price}</p>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              {item.description.substring(0, 100)}...
            </p>

            {/* Star rating */}
            <div className="text-yellow-500 flex mt-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Add to cart button */}
            <button onClick={()=>dispatch(addToCart ({
           id: item.id,
           title: item.title,
           description: item.description,
           price: item.price,
           category: item.category,
          image: item.image,
          quantity: 1,
            }))} className="w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
