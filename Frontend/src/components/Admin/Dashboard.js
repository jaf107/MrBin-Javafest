import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../redux/actions/userActions";
import { logout } from "../../redux/actions/userActions";
import { useAlert } from "react-alert";
import UserList from "./Lists/UserList";
import ProductList from "./Lists/ProductList";
import RecyclerList from "./Lists/RecyclerList";
import OrganizationList from "./Lists/OrganizationList";
import RecycleOrder from "./Orders/RecycleOrder";
import DonationOrder from "./Orders/DonationOrder";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getOrders } from "../../redux/actions/orderActions";
import RequestList from "./Lists/RequestList";
function Dashboard() {
  const user = {
    name: "Admin",
  };
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const updateTime = () => {
    setCurrentDateTime(new Date());
  };

  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Format date and time
  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toLocaleDateString();

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      dispatch(getOrders());
    }
  }, [dispatch, error, alert, isAuthenticated]);

  function logoutUser() {
    dispatch(logout());
    console.log(isAuthenticated);
    alert.success("Logout Successfully");
    navigate("/");
  }
  function toHome() {
    navigate("/");
  }

  return (
    <div className="admin-dash container">
      <nav class="navbar navbar-light  shadow p-2 mb-2 mt-2 mt-3">
        <div class="container-fluid ">
          <p class="navbar-brand">ADMIN PANEL</p>
          <div class="d-flex btn-group align-items-center justify-content-center">
            <div className="container m-2">
              <h4 className="time">{formattedTime}</h4>
              <h5 className="date">{formattedDate}</h5>
            </div>
            <button className="btn btn-custom m-1" onClick={toHome}>
              Home
            </button>
            <button className="btn btn-custom-danger m-1" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div class="">
        <div class="row">
          <div class="profile-nav col-md-3 sectionMinHeight bg-light shadow">
            <div class="panel">
              <div class="user-heading ">
                <h1>Mr. Bin</h1>
              </div>

              <ul
                className="nav nav-stacked flex-column  justify-content-center"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <li className="nav-item custom-nav-item  p-3">
                  <a
                    className="text-decoration-none nav-link active"
                    id="v-pills-user-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-user"
                    href="#v-pills-user"
                    role="tab"
                    aria-controls="v-pills-user"
                    aria-selected="true"
                  >
                    <i class="fa fa-user"></i>
                    Users
                  </a>
                </li>
                <li className="nav-item custom-nav-item p-3">
                  <a
                    className="text-decoration-none nav-link"
                    id="v-pills-products-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-products"
                    href="#v-pills-products"
                    role="tab"
                    aria-controls="v-pills-products"
                    aria-selected="false"
                  >
                    <i class="fa fa-bag-shopping"></i>
                    Products
                    <span class="label label-warning pull-right r-activity"></span>
                  </a>
                </li>
                <li className="nav-item custom-nav-item p-3">
                  <a
                    className="text-decoration-none nav-link"
                    id="v-pills-approval-requests-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-approval-requests"
                    href="#v-pills-approval-requests"
                    role="tab"
                    aria-controls="v-pills-approval-requests"
                    aria-selected="false"
                  >
                    <i class="fa fa-user-pen"></i>
                    Requests
                    <span class="label label-warning pull-right r-activity"></span>
                  </a>
                </li>
                <li className="nav-item custom-nav-item p-3">
                  <a
                    className="text-decoration-none nav-link"
                    id="v-pills-recycler-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-recycler"
                    href="#v-pills-recycler"
                    role="tab"
                    aria-controls="v-pills-recycler"
                    aria-selected="false"
                  >
                    <i class="fa fa-recycle"></i>
                    Recyclers
                  </a>
                </li>
                <li className="nav-item custom-nav-item p-3">
                  <a
                    className="text-decoration-none nav-link"
                    id="v-pills-organization-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-organization"
                    href="#v-pills-organization"
                    role="tab"
                    aria-controls="v-pills-organization"
                    aria-selected="false"
                  >
                    <i class="fa fa-building-ngo"></i>
                    Organizations
                  </a>
                </li>
                {/* <li className="nav-item custom-nav-item p-3">
                  <a
                    className="text-decoration-none nav-link"
                    id="v-pills-order-recyclers-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-order-recyclers"
                    href="#v-pills-order-recyclers"
                    role="tab"
                    aria-controls="v-pills-order-recyclers"
                    aria-selected="false"
                  >
                    <i class="fa fa-building-ngo"></i>
                    Recycle Orders
                  </a>
                </li>
                <li className="nav-item custom-nav-item p-3">
                  <a
                    className="text-decoration-none nav-link"
                    id="v-pills-order-donation-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-order-donation"
                    href="#v-pills-order-donation"
                    role="tab"
                    aria-controls="v-pills-order-donation"
                    aria-selected="false"
                  >
                    <i class="fa fa-building-ngo"></i>
                    Donation Orders
                  </a>
                </li> */}
              </ul>
            </div>
          </div>

          <div
            class=" profile-info col-md-9 sectionMinHeight tab-content  shadow"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active "
              id="v-pills-user"
              role="tabpanel"
              aria-labelledby="v-pills-user-tab"
            >
              <UserList />
            </div>
            <div
              className="tab-pane fade "
              id="v-pills-products"
              role="tabpanel"
              aria-labelledby="v-pills-products-tab"
            >
              <ProductList />
            </div>
            <div
              className="tab-pane fade "
              id="v-pills-approval-requests"
              role="tabpanel"
              aria-labelledby="v-pills-approval-requests-tab"
            >
              <RequestList />
            </div>

            <div
              className="tab-pane fade "
              id="v-pills-recycler"
              role="tabpanel"
              aria-labelledby="v-pills-recycler-tab"
            >
              <RecyclerList />
            </div>
            <div
              className="tab-pane fade "
              id="v-pills-organization"
              role="tabpanel"
              aria-labelledby="v-pills-organization-tab"
            >
              <OrganizationList />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-order-recyclers"
              role="tabpanel"
              aria-labelledby="v-pills-order-recyclers-tab"
            >
              <RecycleOrder />
            </div>

            <div
              className="tab-pane fade"
              id="v-pills-order-donation"
              role="tabpanel"
              aria-labelledby="v-pills-order-donation-tab"
            >
              <DonationOrder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
