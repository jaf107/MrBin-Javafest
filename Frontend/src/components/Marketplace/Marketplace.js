/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import Header from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Marketplace.css";
// import "./Card.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { useAlert } from "react-alert";
import { addToFavorite, getFavorites } from "../../redux/actions/userActions";
import FavoriteButton from "./Product/FavoriteButton";
import BidButton from "./Product/BidButton";
import Search from "../Marketplace/Search";
const Marketplace = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  // console.log(keyword);
  const { products } = useSelector((state) => state.products);
  // console.log(products);
  const { error } = useSelector((state) => state.favorites);
  const alert = useAlert();
  useEffect(() => {
    dispatch(getProducts(keyword));
    // dispatch(getFavorites());
  }, [dispatch, keyword]);

  const navigate = useNavigate();

  const onFavoriteClick = (product_id) => {
    dispatch(addToFavorite(product_id));
    if (!error) alert.success("PRODUCT ADDED TO FAVORITES");
    else alert.error("ALREADY ADDED TO FAVORITES");
  };

  return (
    <div>
      <Header />
      <div className="marketplace">
        <section id="" className=" container">
          <h4 className="  text-center bg-light p-4">MARKETPLACE</h4>
          <div className="container">
            {/* <Link className='btn btn-success myproductbtn' to={'/my/products'}>
              My Products
            </Link> */}
          </div>
          <div className="container">
            <div className="row">
              <div className=" ">
                <Search></Search>
              </div>

              <div className=" col">
                <div className="">
                  {products?.map((product) => (
                    <>
                      {!product.buyer &&
                        product.productType === "marketplace" && (
                          <span className="separate-card ">
                            <div className="card">
                              <Link to={`/product/${product.id}`}>
                                <img
                                  className="card-img-top"
                                  src={product.images[0]?.url || "/Profile.png"}
                                  alt="Card image cap"
                                />
                              </Link>

                              {/* {(product.images).length >1 ? (<Carousel images={product.images}/>):(<img
                                className="card-img-top"
                                src={product.images[0]?.url || ""}
                                alt="Card image cap"/>)} */}

                              <div className="card-body bg-light">
                                <div>
                                  <h6 className="card-title center">
                                    {product.name}
                                  </h6>
                                  <p className="card-text p-2">
                                    {product.description}{" "}
                                  </p>
                                  <p className="card-text text-center p-2">
                                    Price: {product.askingPrice}
                                  </p>
                                  <div />
                                </div>
                                <div className="d-flex">
                                  <div className="card-button border-0 btn btn-success">
                                    Buy
                                  </div>
                                  <FavoriteButton
                                    product_id={product._id}
                                  ></FavoriteButton>
                                  <BidButton
                                    product_id={product._id}
                                  ></BidButton>
                                </div>
                              </div>
                            </div>
                          </span>
                        )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Marketplace;
