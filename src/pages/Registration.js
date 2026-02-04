import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/makitimaSlice";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    const { user } = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    // ✅ SET DISPLAY NAME
    await updateProfile(user, {
      displayName: form.name,
    });

    dispatch(
      setUserInfo({
        uid: user.uid,
        email: user.email,
        displayName: form.name,
        photoURL: user.photoURL,
      })
    );

    navigate("/", {
      replace: true,
      state: { success: "Account created successfully 🎉" },
    });
  };

  return (
    <form onSubmit={handleRegister}>
      <input name="name" placeholder="Full name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" onChange={handleChange} />
      <button type="submit">Create account</button>
    </form>
  );
};

export default Registration;
