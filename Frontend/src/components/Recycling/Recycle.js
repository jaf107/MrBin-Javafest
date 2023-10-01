import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import "./Recycle.css";
import { getProducts } from "../../redux/actions/productActions";
import { getRecyclers } from "../../redux/actions/recyclerActions";
import { Link } from "react-router-dom";
import { placeRecycleOrder } from "../../redux/actions/orderActions";

function Recycle() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const recycleProducts = products.filter(
    (product) => product.productType === "recycle"
  );
  // console.log(user.roles);
  const { userProducts } = useSelector((state) => state.userProducts);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleAddNew, setToggleAddNew] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  // const onChooseProduct = (e) => {
  //   e.preventDefault();
  //   if (toggleForm === true) setToggleForm(false);
  //   else {
  //     const myForm = new FormData();
  //     myForm.set("selectedProduct", selectedProduct);
  //     setToggleForm(true);
  //   }
  // };
  // const handleAddNew = (e) => {
  //   setToggleAddNew(true);
  // };

  function getInputAskingPrice() {}

  useEffect(() => {
    if (isAuthenticated) {
      // dispatch(getUserProducts(id));
      dispatch(getRecyclers());
      dispatch(getProducts());
    }

    if (closeModal === true) {
      setSelectedProduct("");
      setToggleForm(false);
    }
  }, [dispatch, alert, isAuthenticated]);

  // const productList = userProducts?.map((products) => (
  //   <option key={products._id} value={products._id}>
  //     {products.name}
  //   </option>
  // ));

  // const selectedProductChange = (e) => {
  //   setSelectedProduct(e.target.value);
  //   // setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  //   //console.log(selectedProduct);
  // };

  const onCloseModal = (closeModal) => {
    setToggleForm(false);
    setCloseModal(closeModal);
  };

  const onRecycleRequest = (index, product) => {
    const price =
      document.querySelector(`#asking-price-input-${index}`).value || 0;
    const buyer = user.username;

    if (price) dispatch(placeRecycleOrder({ product, price, buyer }));
  };

  return (
    <div className="recycle">
      <Header />
      <h4 className="  text-center bg-light p-4">RECYCLE</h4>

      <div className="container recycle">
        <div className=" row counterRow text-center align-items-center text-white">
          <div className="col-md-4">
            <h6>Total Recyclers</h6>
            <h1>101</h1>
          </div>
          <div className="col-md-4">
            <h6>Total Items Recycled</h6>
            <h1>11,053</h1>
          </div>
          <div className="col-md-4">
            <h6>Total Users</h6>
            <h1>302</h1>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="row p-2">
              <div className="col-md-6 p-2">
                <div className="itemsCard text-center p-3">
                  <h6>Newspaper</h6>
                  <i class="fa-solid fa-newspaper fs-2 mt-3 mb-4"></i>
                </div>
              </div>
              <div className="col-md-6 p-2">
                <div className="itemsCard text-center p-3">
                  <h6>Plastic Bottles</h6>
                  <i class="fa-solid fa-bottle-water fs-2 mt-3 mb-4"></i>
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-6 p-2">
                <div className="itemsCard text-center p-3">
                  <h6>Electronics</h6>
                  <i class="fa-solid fa-mobile fs-2 mt-3 mb-4"></i>
                </div>
              </div>
              <div className="col-md-6 p-2">
                <div className="itemsCard text-center p-3">
                  <h6>Books</h6>
                  <i class="fa-solid fa-book fs-2 mt-3 mb-4"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mt-5">
            <Link
              className=" btn border-0 btn-lg fw-bold mt-5 p-4"
              to={"/addProduct"}
            >
              Recycle An Item
            </Link>

            {/* <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog  mw-100 w-75">
                <div class="modal-content container">
                  <div class="modal-header">
                    {toggleForm && (
                      <button
                        className=" btn btn-sm m-3"
                        onClick={onChooseProduct}
                      >
                        Previous
                      </button>
                    )}
                    <h5 class="modal-title d" id="exampleModalLabel">
                      Add Product
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    {!toggleForm && (
                      <div>
                        <div className="row">
                          <div className="col-md-5">
                            <form action="">
                              <div className="form-group mb-4">
                                <select
                                  id="select_product"
                                  className="form-control"
                                  onChange={selectedProductChange}
                                >
                                  <option value="" disabled selected>
                                    Select Products
                                  </option>
                                  {productList}
                                </select>
                              </div>
                              <button
                                type="submit"
                                className=" btn btn-primary m-2"
                                onClick={onChooseProduct}
                              >
                                Choose Product
                              </button>
                            </form>
                          </div>
                          <div className="col-md-2">
                            <h5> OR</h5>
                          </div>
                          <div className="col-md-5">
                            {!toggleAddNew && (
                              <button
                                className=" btn btn-success"
                                onClick={handleAddNew}
                              >
                                Add New
                              </button>
                            )}
                            {toggleAddNew && <ProductForm></ProductForm>}{" "}
                          </div>
                        </div>
                      </div>
                    )}
                    {toggleForm && (
                      <div>
                        <RecycleForm
                          product={selectedProduct}
                          closeModal={onCloseModal}
                        ></RecycleForm>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-md-4">
            <div className="row p-2">
              <div className="col-md-6 p-2">
                <div className="itemsCard text-center p-3">
                  <h6>Home Appliances</h6>
                  <i class="fa-solid fa-blender-phone fs-2 mt-3 mb-4"></i>
                </div>
              </div>
              <div className="col-md-6 p-2">
                <div className="itemsCard text-center p-3">
                  <h6>Furniture</h6>
                  <i class="fa-solid fa-chair fs-2 mt-3 mb-4"></i>
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-6 p-2">
                <div className="itemsCard text-center p-3">
                  <h6>Clothes</h6>
                  <i class="fa-solid fa-house-user fs-2 mt-3 mb-4"></i>
                </div>
              </div>
              <div className="col-md-6 p-2">
                <div className="itemsCard text-center p-3">
                  <h6>Others</h6>
                  <i class="fa-solid fa-shuffle fs-2 mt-3 mb-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" row  align-items-center h-100">
          {/* <RecycleOrders></RecycleOrders> */}
          {user &&
            user?.roles &&
            user?.roles.some((role) => role.name === "ROLE_RECYCLER") && (
              <div className=" col">
                <div className="container shadow-lg p-3">
                  <h4 className="text-center">Recycled Objects</h4>
                  <div className="">
                    {recycleProducts?.map((product, index) => (
                      <>
                        {!product.buyer && (
                          // product.productType === "recycle" &&
                          <div className="separate-card col-md-3">
                            <div className="card">
                              <Link to={`/product/${product.id}`}>
                                <img
                                  className="card-img-top"
                                  src={product.images[0]?.url || "/Profile.png"}
                                  alt="Card image cap"
                                />
                              </Link>

                              <div className="card-body bg-light">
                                <div>
                                  <h6 className="card-title center">
                                    {product.name}
                                  </h6>
                                  <p className="card-text p-2">
                                    {product.description}{" "}
                                  </p>

                                  <p className="card-text text-center p-2">
                                    Quantity: {product.quantity}
                                  </p>
                                  <div />
                                </div>
                                <div className="d-flex gap-2">
                                  <div class="input-group w-1">
                                    <span class="input-group-text">
                                      Ask for
                                    </span>
                                    <input
                                      type="text"
                                      id={`asking-price-input-${index}`}
                                      class="form-control"
                                      aria-label="Amount (to the nearest BDT)"
                                    />
                                    <span class="input-group-text">BDT</span>
                                  </div>
                                  <div
                                    className="card-button border-0 btn btn-success"
                                    onClick={() =>
                                      onRecycleRequest(index, product)
                                    }
                                  >
                                    Buy
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            )}
          <div className="col-md-12 text-center">
            <h3>Our Recyclers</h3>
            <div class="row g-4">
              <div class="col">
                <div class="card recycler-card">
                  <img
                    src={require("../../assets/recycler1.png")}
                    height={250}
                    width={250}
                    class="card-img-top"
                    alt="Recycler 1 Image"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Recycler 1</h5>
                    <p class="card-text">
                      Recycler 1 is an advanced waste management system designed
                      to efficiently handle recycling materials. It incorporates
                      cutting-edge technology for a cleaner environment.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card recycler-card">
                  <img
                    src={require("../../assets/recycler2.jpg")}
                    height={250}
                    width={250}
                    class="card-img-top"
                    alt="Recycler 2 Image"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Recycler 2</h5>
                    <p class="card-text">
                      Recycler 2 is a versatile recycling solution that can
                      handle various types of recyclable materials. It's
                      designed to be user-friendly and efficient.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card recycler-card">
                  <img
                    src={require("../../assets/recycler3.png")}
                    height={250}
                    width={250}
                    class="card-img-top"
                    alt="Recycler 3 Image"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Recycler 3</h5>
                    <p class="card-text">
                      Recycler 3 is an eco-friendly recycling system that
                      promotes a sustainable future. It's designed to reduce
                      waste and promote recycling practices.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card recycler-card">
                  <img
                    src={require("../../assets/recycler3.png")}
                    height={250}
                    width={250}
                    class="card-img-top"
                    alt="Recycler 4 Image"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Recycler 4</h5>
                    <p class="card-text">
                      Recycler 4 is a compact recycling solution that is perfect
                      for small spaces. It's designed for households and
                      businesses looking to contribute to recycling efforts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" row mb-3">
          <div className="col-md-12">
            <img
              src={require("../../assets/recycleBottom.png")}
              className="img-fluid img-cover"
              width={1300}
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Recycle;
