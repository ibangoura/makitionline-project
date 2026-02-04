import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword, signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, googleProvider } from "../firebase.config";
import { setUserInfo } from "../redux/makitimaSlice";
import { makitilogo } from "../assets";
import { RotatingLines } from "react-loader-spinner";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import GoogleIcon from "@mui/icons-material/Google";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Clear error messages
  const resetErrors = () => {
    setErrEmail("");
    setErrPassword("");
    setFirebaseErr("");
  };

  // Handle successful login
  const loginSuccess = (user) => {
    dispatch(
      setUserInfo({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL,
      })
    );

    navigate("/", {
      replace: true,
      state: { success: "Signed in successfully 🎉" },
    });
  };

  // ===== Form submit handler (email/password) =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    resetErrors();
    if (!email) setErrEmail("Email is required");
    if (!password) setErrPassword("Password is required");
    if (!email || !password) return;

    setLoading(true);

    try {
      // Check if the email is registered with Google
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length && !methods.includes("password")) {
        setFirebaseErr("This email is registered with Google. Please sign in using Google.");
        return;
      }

      const { user } = await signInWithEmailAndPassword(auth, email, password);
      loginSuccess(user);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setFirebaseErr("No account found with this email.");
          break;
        case "auth/wrong-password":
          setFirebaseErr("Incorrect password.");
          break;
        case "auth/invalid-email":
          setFirebaseErr("Invalid email address.");
          break;
        case "auth/too-many-requests":
          setFirebaseErr("Too many attempts. Try again later.");
          break;
        default:
          setFirebaseErr("Sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ===== Google login handler =====
  const handleGoogleLogin = async () => {
    if (loading) return;

    resetErrors();
    setLoading(true);

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      loginSuccess(user);
    } catch (error) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          setFirebaseErr("Google sign-in was cancelled.");
          break;
        case "auth/account-exists-with-different-credential":
          setFirebaseErr("Account exists with a different sign-in method.");
          break;
        default:
          setFirebaseErr("Google sign-in failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="py-6">
        <img src={makitilogo} alt="Makiti logo" className="w-32" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[350px] bg-white p-6 rounded-md shadow-md flex flex-col"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          disabled={loading}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrEmail("");
          }}
          className="border px-2 py-2 rounded-sm"
        />
        {errEmail && <p className="text-red-600 text-xs mt-1">{errEmail}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          disabled={loading}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrPassword("");
          }}
          className="border px-2 py-2 rounded-sm mt-3"
        />
        {errPassword && <p className="text-red-600 text-xs mt-1">{errPassword}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 py-2 rounded-md text-white flex items-center justify-center gap-2 ${loading ? "bg-gray-500" : "bg-black"}`}
        >
          {loading ? "Signing in..." : <>Sign In <ArrowRightIcon /></>}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-3 py-2 rounded-md border flex items-center justify-center gap-2"
        >
          <GoogleIcon /> Sign in with Google
        </button>

        {loading && (
          <div className="flex justify-center mt-3">
            <RotatingLines height="24" width="24" strokeColor="#e77600" />
          </div>
        )}

        {firebaseErr && (
          <p className="text-red-600 text-sm mt-3 text-center">{firebaseErr}</p>
        )}

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/registration" className="text-blue-600 font-semibold">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
