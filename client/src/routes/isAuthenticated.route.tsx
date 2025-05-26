import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { type RootState } from "../store/store";
import { loginSuccess } from "@/store/reducers/auth.reducer";
import { checkAuth } from "@/service/checkAuth.service";
import Navbar from "@/components/Navbar";

function isAuthenticated() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    const checkIsAuth = async () => {
      const status = await checkAuth();
      console.log("isAuthenticated status", status.success);

      if (status.success) {
        dispatch(loginSuccess());
      } else {
        navigate("/welcome");
      }
    };

    checkIsAuth();
  }, [navigate, dispatch]);

  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <Outlet />;
      </>
    );
  }

  return null;
}

export default isAuthenticated;
