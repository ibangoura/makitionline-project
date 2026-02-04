import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../components/home/Banner";
import Products from "../components/home/Products";

const Home = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!state?.success) return;

    setSuccessMsg(state.success);

    const timer = setTimeout(() => {
      setSuccessMsg("");
      navigate(".", { replace: true, state: null });
    }, 3000);

    return () => clearTimeout(timer);
  }, [state?.success, navigate]);

  return (
    <div>
      <Banner />

      {successMsg && (
        <div className="w-full flex justify-center mt-4">
          <p className="px-4 py-2 border border-green-500 text-green-600 rounded-md">
            {successMsg}
          </p>
        </div>
      )}

      <div className="w-full -mt-10 xl:-mt-36 py-10">
        <Products />
      </div>
    </div>
  );
};

export default Home;
