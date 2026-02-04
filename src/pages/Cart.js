import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  resetCart,
} from "../redux/makitimaSlice";
import { emptyCart } from "../assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* =========================
   🧩 CART ITEM
========================== */
const CartItem = ({ item, onIncrease, onDecrease, onDelete }) => (
  <div className="flex gap-6 py-6 border-b">
    <img
      src={item.image}
      alt={item.title}
      className="w-24 h-24 object-cover border"
    />

    <div className="flex flex-1 justify-between">
      <div className="space-y-2">
        <h4 className="font-medium text-lg">{item.title}</h4>

        <p className="text-sm text-gray-500 line-clamp-2 max-w-md">
          {item.description || "No description available"}
        </p>

        <p className="text-sm bg-gray-200 inline-block px-2 py-0.5 rounded-md">
          Unit Price: ${item.price.toFixed(2)}
        </p>

        <div className="flex items-center w-fit border rounded">
          <button
            disabled={item.quantity === 1}
            onClick={() => onDecrease(item.id)}
            className="px-3 py-1 hover:bg-gray-200 disabled:opacity-40"
          >
            −
          </button>
          <span className="px-4">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.id)}
            className="px-3 py-1 hover:bg-gray-200"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onDelete(item.id)}
          className="w-36 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
        >
          Delete item
        </button>
      </div>

      <div className="font-semibold text-lg">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  </div>
);

/* =========================
   🛒 CART PAGE
========================== */
const Cart = () => {
  const dispatch = useDispatch();

  // ✅ UPDATED STATE PATH
  const cart = useSelector((state) => state.makitimaReducer.cart);

  const totalAmount = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cart]
  );

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center items-center gap-6 py-16 bg-gray-100"
      >
        <img className="w-80 p-4" src={emptyCart} alt="Empty cart" />

        <div className="w-96 p-6 bg-white flex flex-col items-center rounded-md shadow-lg">
          <h1 className="font-titleFont text-xl font-bold text-center">
            Your cart is empty
          </h1>
          <p className="text-sm text-center text-gray-500 mt-2">
            Add books, electronics, videos, and more to make it happy.
          </p>

          <Link to="/">
            <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 px-8 py-2 rounded-md font-semibold">
              Continue Shopping
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="container mx-auto grid grid-cols-5 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-4 bg-white px-6">
          <h2 className="font-titleFont text-xl py-4 border-b border-gray-300">
            Cart Items
          </h2>

          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={(id) =>
                dispatch(increaseQuantity(id))
              }
              onDecrease={(id) =>
                dispatch(decreaseQuantity(id))
              }
              onDelete={(id) =>
                dispatch(removeFromCart(id))
              }
            />
          ))}

          <div className="flex justify-end py-4">
            <button
              onClick={() => dispatch(resetCart())}
              className="w-36 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-1 bg-white px-6 h-fit">
          <div className="font-titleFont flex items-center justify-between border-b border-blue-400 py-4">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-green-600" />
              <h2>Summary</h2>
            </div>
            <h4>{cart.length} items</h4>
          </div>

          <div className="py-4 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <Link to="/checkout">
              <button
                disabled={cart.length === 0}
                className={`w-full bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold ${
                  cart.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
