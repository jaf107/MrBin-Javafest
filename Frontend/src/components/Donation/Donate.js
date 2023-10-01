import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Donate.css";
import { getOrganizations } from "../../redux/actions/organizationActions";
import { placeDonationOrder } from "../../redux/actions/orderActions";
import { useEffect } from "react";

const Donate = () => {
  const { organizations } = useSelector((state) => state.organization);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const donationProducts = products.filter(
    (product) => product.productType === "donation"
  );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(products);
    // dispatch(getUserProducts(id));
    dispatch(getOrganizations());
  }, [dispatch, isAuthenticated]);

  function dispatchDonationRequest(selectedProduct) {
    const buyer = user.username;
    const product = selectedProduct;
    dispatch(placeDonationOrder({ buyer, product }));
  }
  return (
    <div>
      <Header />
      <h4 className="  text-center bg-light p-4 mb-2">DONATE</h4>

      <div className="container donate" style={{ height: "300px" }}>
        <div className=" row counterRowD text-center align-items-center text-white">
          <div className="col-md-4">
            <h6>Total Organizations</h6>
            <h1>100</h1>
          </div>
          <div className="col-md-4">
            <h6>Total Items Donated</h6>
            <h1>11,000</h1>
          </div>
          <div className="col-md-4">
            <h6>Total Users</h6>
            <h1>300</h1>
          </div>
        </div>
      </div>
      <div className="container donate">
        <Link
          className="btn border-info btn-lg fw-bold mt-5 p-4 middle "
          to={"/addProduct"}
        >
          Donate An Item
        </Link>
      </div>
      {user?.roles.some((role) => role.name === "ROLE_ORGANIZATION") && (
        <div className=" col">
          <div className="container shadow-lg p-3">
            <h4 className="text-center ">Donation Marketplace</h4>
            <div className="">
              <div className="row">
                {donationProducts?.map(
                  (product) =>
                    !product.buyer && (
                      <div className="col-md-3" key={product.id}>
                        <div className="card mb-3 p-2">
                          <Link to={`/product/${product.id}`}>
                            <img
                              className="card-img-top"
                              src={product.images[0]?.url || "/Profile.png"}
                              alt="Card image cap"
                              height={250}
                              // width={50}
                            />
                          </Link>
                          <div className="card-body bg-light">
                            <h6 className="card-title center">
                              {product.name}
                            </h6>
                            <p className="card-text p-2">
                              {product.description}
                            </p>
                            <p className="card-text text-center p-2">
                              Quantity: {product.quantity}
                            </p>
                            <div className="d-flex justify-content-center">
                              <div
                                className="card-button border-0 btn btn-success"
                                onClick={() => dispatchDonationRequest(product)}
                              >
                                Request
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container wheat p-4 mb-4">
        <h2 className="center">List of our enlisted Organizations</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Organization Name</th>
              {/* <th scope="col">Type</th> */}
              {/* <th scope="col">Company</th> */}
              <th scope="col">Location</th>
              <th scope="col">Contact No.</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((organization, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{organization.organization}</td>
                {/* <td>{organization.type}</td> */}
                <td>{organization.location}</td>
                <td>{organization.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Donate;
