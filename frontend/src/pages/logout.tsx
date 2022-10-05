import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOutUser());
    navigate("/home");
  }, []);
  return <div>Logout</div>;
};

export default Logout;
