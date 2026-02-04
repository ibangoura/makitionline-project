import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

import { makitilogo } from "../../assets";
import { allItems } from "../../constants";
import HeaderBottom from "./HeaderBottom";
import { userSignOut } from "../../redux/makitimaSlice";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.makitimaReducer.cart);
  const userInfo = useSelector((state) => state.makitimaReducer.userInfo);

  const [showAll, setShowAll] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userSignOut());
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="w-full sticky top-0 z-50">
      {/* TOP HEADER */}
      <div className="w-full bg-amazon_blue text-white px-4 py-3 flex items-center gap-4">

        {/* LOGO */}
        <Link to="/">
          <div className="headerHover">
            <img className="w-24 mt-2" src={makitilogo} alt="Makitilogo" />
          </div>
        </Link>

        {/* DELIVERY */}
        <div className="headerHover hidden mdl:inline-flex">
          <LocationOnOutlinedIcon />
          <p className="text-sm text-lightText font-light flex flex-col">
            Deliver to
            <span className="text-sm font-semibold -mt-1 text-white">
              Makitima
            </span>
          </p>
        </div>

        {/* SEARCH */}
        <div className="h-10 rounded-md flex flex-grow relative lgl:flex">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-14 h-full bg-gray-200 hover:bg-gray-300 cursor-pointer text-sm text-amazon_blue flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            All <ArrowDropDownOutlinedIcon />
          </span>

          {showAll && (
            <ul className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll bg-white text-black p-2 z-50 shadow-lg">
              {allItems.map((item) => (
                <li
                  key={item._id}
                  onClick={() => setShowAll(false)}
                  className="text-sm hover:border-b cursor-pointer"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            placeholder="Search Makiti..."
            className="h-full text-base text-amazon_blue flex-grow outline-none px-2"
          />

          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>

        {/* ACCOUNT / USER NAME */}
        {userInfo ? (
          <div className="flex flex-col headerHover">
            <p className="text-sm text-gray-100 font-medium">
              {userInfo.displayName || userInfo.email.split("@")[0]}
            </p>
            <p className="text-sm font-semibold -mt-1 text-white hidden mdl:inline-flex">
              Account
            </p>
          </div>
        ) : (
          <Link to="/signin">
            <div className="flex flex-col headerHover">
              <p className="text-sm text-white font-light">Hello, sign in</p>
              <p className="text-sm font-semibold -mt-1 text-white hidden mdl:inline-flex">
                Account
              </p>
            </div>
          </Link>
        )}

        {/* ORDERS */}
        <div className="hidden lgl:flex flex-col headerHover">
          <p className="text-sm font-semibold text-white">& Orders</p>
        </div>

        {/* CART */}
        <Link to="/cart">
          <div className="flex items-start headerHover relative">
            <ShoppingCartIcon />
            <span className="absolute -top-1 left-6 text-xs font-semibold h-4 w-4 bg-[#f3a847] text-amazon_blue rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          </div>
        </Link>

        {/* LOGOUT */}
        {userInfo && (
          <div
            onClick={handleLogout}
            className="flex flex-col items-center headerHover cursor-pointer"
          >
            <LogoutIcon />
            <p className="hidden mdl:inline-flex text-xs font-semibold">
              Logout
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM HEADER */}
      <HeaderBottom />
    </div>
  );
};

export default Header;
