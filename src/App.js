import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { setUserInfo, userSignOut } from "./redux/makitimaSlice";

import { productsData } from "./api/api";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Registration from "./pages/Registration";
import Cart from "./pages/Cart";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScrollRestoration />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const dispatch = useDispatch();

  // ✅ Persist logged-in user on page refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUserInfo({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split("@")[0],
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(userSignOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Home page */}
        <Route index element={<Home />} loader={productsData} />

        {/* Authentication */}
        <Route path="signin" element={<Signin />} />
        <Route path="registration" element={<Registration />} />

        {/* Cart (protected route) */}
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
