import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./UserAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MyProfile from "./MyProfile";
import Favorites from "./UserProduct/Favorites";
import MyProducts from "./UserProduct/MyProducts";
import EditAccount from "./EditAccount";
import { getFavorites } from "../../redux/actions/userActions";
import MyOrders from "./MyOrders";
import Priviledges from "./Priviledges";
function UserAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  // console.log(user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    dispatch(getFavorites());
  }, [dispatch, isAuthenticated]);
  const { products } = useSelector((state) => state.products);
  return (
    <div className=" userAccount">
      <Header />
      <div class="container mb-4">
        {user && (
          <div class="row">
            <div class="profile-nav col-md-3 m-1 p-2 mt-3 sectionMinHeight  shadow">
              <div class="panel">
                <div class="user-heading round headerMinHeight">
                  <img
                    src={user?.avatar?.publicId || "./Profile.png"}
                    alt=""
                    className="mb-2 rounded-circle shadow-sm border border-dark"
                    height={100}
                  />
                  <h4>{user.username}</h4>
                </div>

                <ul
                  class="nav nav-pills nav-stacked flex-column"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <li class="p-3">
                    <a
                      className="text-decoration nav-link"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      href="#v-pills-profile"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="true"
                    >
                      <i class="fa fa-user"></i> Profile
                    </a>
                  </li>
                  <li class="  p-3">
                    <a
                      className="text-decoration nav-link"
                      id="v-pills-order-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-order"
                      href="#v-pills-order"
                      role="tab"
                      aria-controls="v-pills-order"
                      aria-selected="true"
                    >
                      <i class="fa fa-box"></i> Orders
                    </a>
                  </li>
                  <li className="p-3">
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
                      <i class="fa fa-calendar"></i> My Products
                      <span class="label label-warning pull-right r-activity"></span>
                    </a>
                  </li>
                  {/* <li className="p-3 ">
                    <a
                      className="text-decoration-none nav-link"
                      id="v-pills-favorites-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-favorites"
                      href="#v-pills-favorites"
                      role="tab"
                      aria-controls="v-pills-favorites"
                      aria-selected="false"
                    >
                      <i class="fa fa-calendar"></i>
                      Favorites
                      <span class="label label-warning pull-right r-activity">
                        9
                      </span>
                    </a>
                  </li> */}
                  <li className="p-3">
                    <a
                      className="text-decoration-none nav-link"
                      id="v-pills-edit-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-edit-profile"
                      href="#v-pills-edit-profile"
                      role="tab"
                      aria-controls="v-pills-edit-profile"
                      aria-selected="false"
                    >
                      <i class="fa fa-edit"></i>
                      Edit profile
                    </a>
                  </li>
                  <li className="p-3">
                    <a
                      className="text-decoration-none nav-link"
                      id="v-pills-priviledge-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-priviledge"
                      href="#v-pills-priviledge"
                      role="tab"
                      aria-controls="v-pills-priviledge"
                      aria-selected="false"
                    >
                      <i class="fa fa-star"></i>
                      Priviledges
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="col-md-8 tab-content m-1 p-2 mt-3 sectionMinHeight shadow"
              id="v-pills-tabContent"
            >
              <div
                class="tab-pane fade show active  user_nav_pills"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <MyProfile user_data={user}></MyProfile>
              </div>
              <div
                class="tab-pane fade "
                id="v-pills-products"
                role="tabpanel"
                aria-labelledby="v-pills-products-tab"
              >
                <MyProducts user_data={user}></MyProducts>
              </div>
              <div
                class="tab-pane fade "
                id="v-pills-order"
                role="tabpanel"
                aria-labelledby="v-pills-order-tab"
              >
                <MyOrders />
              </div>
              {/* <div
                class="tab-pane fade "
                id="v-pills-favorites"
                role="tabpanel"
                aria-labelledby="v-pills-favorites-tab"
              >
                <Favorites user_data={user}></Favorites>
              </div> */}
              <div
                class="tab-pane fade "
                id="v-pills-edit-profile"
                role="tabpanel"
                aria-labelledby="v-pills-edit-profile-tab"
              >
                <EditAccount user_data={user}></EditAccount>
              </div>
              <div
                class="tab-pane fade "
                id="v-pills-priviledge"
                role="tabpanel"
                aria-labelledby="v-pills-priviledge-tab"
              >
                <Priviledges />
              </div>
            </div>
          </div>
        )}
      </div>{" "}
      <Footer />
    </div>
  );
}

export default UserAccount;
