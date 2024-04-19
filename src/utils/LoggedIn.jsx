import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "../Store/AuthSlice/AuthSlice.js";
import { auth } from "../Appwrite/Services/services.js";
function LoggedIn() {
  const [authenticated, setAuthenticated] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const user = async () => {
      try {
        const user = await auth.currentUser();
        const { name: userName, email: userEmail } = user;
        dispatch(setUser({ userName, userEmail }));
      } catch (error) {
        dispatch(logoutUser());
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    user();
  }, []);
  return (
    <>
      {loading ? (<div className="h-screen flex justify-center items-center">
        <CircularProgress color="info" size={40}  />
      </div>) : <Outlet />}
    </>
  );
}

export default LoggedIn;
