import React from "react";
import { logoutUser } from "../../action/authAction";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-blue-950 flex justify-between sticky top-0 px-5">
        <div className="flex">
          <Link className="p-2 text-3xl text-white font-bold" to="/">
            Dashboard
          </Link>
          {auth.isauth && (
            <Link className="p-3 text-gray-200 text-xl" to="/myblog">
              My Blog
            </Link>
          )}
        </div>
        <div className="flex">
          {auth.isauth ? (
            <button
              className="p-3 text-gray-200 text-lg inline-block align-middle"
              onClick={logout}
            >
              <span className="text-2xl font-bold">{auth.user.name}</span>{" "}
              Logout
            </button>
          ) : (
            <>
              <Link className="p-3 text-gray-200 text-lg" to="/login">
                Login
              </Link>
              <Link className="p-3 text-gray-200 text-lg" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
