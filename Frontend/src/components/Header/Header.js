import { Link } from "react-router-dom";
import "./Header.css";
import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../redux/actions/userActions";
import { logout } from "../../redux/actions/userActions";
import { useAlert } from "react-alert";
import { Notification } from "./Notifications";
function Header() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, isAuthenticated, user } = useSelector((state) => state.user);

  // Check Authentication
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, isAuthenticated]);

  function logoutUser() {
    dispatch(logout());
    // console.log(isAuthenticated);
    alert.success("Logout Successfully");
    //navigate('/login');
  }
  // console.log(user.roles);
  return (
    <div className="container header z-index-n1 ">
      <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white box-shadow mb-3">
        <Link class="navbar-brand" to="/">
          <img src={require("../../assets/logo.png")} alt="logo" width={70} />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav  fw-normal">
            <li class="nav-item  m-1 p-1">
              <Link class="nav-link" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item p-1 m-1">
              <Link class="nav-link" to="/marketplace">
                Marketplace
              </Link>
            </li>
            <li class="nav-item p-1 m-1">
              <Link class="nav-link" to="/recycle">
                Recycle
              </Link>
            </li>
            <li class="nav-item p-1 m-1">
              <Link class="nav-link" to="/donate">
                Donate
              </Link>
            </li>
            <li class="nav-item p-1 m-1">
              <Link
                class="nav-link btn-danger ai_button"
                to="/object-detection"
                style={{
                  color: "white",
                }}
              >
                AI
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav mr-auto ">
            <li class="nav-item p-1 btn-warning nav-pill">
              <Link class="nav-link " to="/addproduct">
                + Product
              </Link>
            </li>
          </ul>
          {!isAuthenticated && (
            <ul class="navbar-nav mr-auto">
              <li class="nav-item p-1">
                <Link class="nav-link " to="/login">
                  <i class="fa-solid fa-right-to-bracket fs-4"></i>
                </Link>
              </li>
              <li class="nav-item p-1">
                <Link class="nav-link " to="/register">
                  <i class="fa-solid fa-user-plus fs-4"></i>
                </Link>
              </li>
            </ul>
          )}
          {isAuthenticated && (
            <ul class="navbar-nav mr-auto">
              <li class="nav-item p-2 pt-3" style={{ width: "54px" }}>
                <Notification></Notification>
              </li>
              <li class="nav-item p-2 pt-3">
                <Link to="/account" className=" nav-link">
                  <i className="fa-solid fa-user fs-4"></i>
                </Link>
              </li>
              {user &&
                user.roles &&
                user.roles.some((role) => role.name === "ROLE_ADMIN") && (
                  <li className="nav-item p-2 mt-2" style={{ width: "54px" }}>
                    <Link
                      className="nav-link admin_button"
                      to="/admin/dashboard"
                    >
                      <i className="fab fa-adn fs-4"></i>
                    </Link>
                  </li>
                )}
              <li class="nav-item p-1 m-1">
                <button class="nav-link btn  fw-bold" onClick={logoutUser}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
