import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/actions/productActions";
import { useRef } from "react";
import "./ProductForm.css";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const alert = useAlert();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    condition: "",
    description: "",
    dateOfPurchase: "",
    purchasePrice: "",
    askingPrice: "",
    productType: "",
    address: "",
  });

  const {
    name,
    category,
    quantity,
    condition,
    description,
    dateOfPurchase,
    purchasePrice,
    askingPrice,
    productType,
    address,
  } = product;

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // console.log(user);
  // let id;
  // if (isAuthenticated) {
  //  id = user;
  // }

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  //   // dispatch(getFavorites());
  // }, []);

  // console.log(id);
  const productSubmit = (e) => {
    if (!isAuthenticated) {
      alert.error("You need to be logged in first");
      navigate("/");
      return;
    }

    e.preventDefault();

    const productForm = new FormData();
    productForm.set("name", name);
    productForm.set("category", category);
    productForm.set("quantity", quantity);
    productForm.set("condition", condition);
    productForm.set("description", description);
    productForm.set("dateOfPurchase", dateOfPurchase);
    productForm.set("purchasePrice", purchasePrice);
    productForm.set("askingPrice", askingPrice);
    productForm.set("productType", productType.toLowerCase());
    productForm.set("address", address);
    productForm.set("userId", user?.id);
    // console.log(user.id);
    images.forEach((image) => {
      productForm.append("images", image);
    });
    dispatch(addProduct(productForm));
    alert.success("PRODUCT ADDED SUCCESSFULLY");
    setProduct({
      name: "",
      category: "",
      quantity: "",
      condition: "",
      description: "",
      dateOfPurchase: "",
      purchasePrice: "",
      askingPrice: "",
      productType: "",
    });
    setImages([]);
    setImagesPreview([]);
  };

  const productDataChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // console.log(address)

  return (
    <div>
      <div className="container productform">
        <form className="form-floating" onSubmit={productSubmit}>
          <div className="row ">
            <div className="col-md-6">
              <div className="form-group mb-4 flex">
                <div className="col-md-1 center pt-3">
                  <i class="fa-solid fa-box-archive"></i>
                </div>

                <input
                  className="form-control"
                  required
                  name="name"
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={productDataChange}
                />
              </div>

              <div className="form-group mb-4 flex">
                <div className="col-md-1 center pt-3">
                  <i className="fa fa-list"></i>
                </div>

                <select
                  id="productCategory"
                  name="category"
                  className="form-control"
                  value={category}
                  onChange={productDataChange}
                >
                  <option value="" disabled>
                    Select Product Category
                  </option>
                  <option>Book</option>
                  <option>Newspaper</option>
                  <option>Cell Phone</option>
                  <option>Bottle</option>
                  <option>Glass</option>
                  <option>Laptop</option>
                </select>
              </div>

              <div className="form-group mb-4 flex">
                <div className="col-md-1 center pt-3">
                  <i className="fa fa-cubes"></i>
                </div>

                <input
                  id="quantity"
                  name="quantity"
                  className="form-control"
                  type="text"
                  placeholder="Available Quantity"
                  value={quantity}
                  onChange={productDataChange}
                />
              </div>

              <div className="form-group mb-4 flex">
                <div className="col-md-1 center pt-3">
                  <i className="fa fa-map-marker"></i>
                </div>
                <input
                  id="address"
                  name="address"
                  className="form-control"
                  required
                  type="text"
                  placeholder="Enter Address here"
                  value={address}
                  onChange={productDataChange}
                />
              </div>

              <div className="form-group mb-4 flex">
                <div className="col-md-1 center pt-3">
                  <i className="fa fa-check-circle"></i>
                </div>
                <select
                  id="productCondition"
                  name="condition"
                  className="form-control"
                  value={condition}
                  onChange={productDataChange}
                >
                  <option value="" disabled>
                    Select Product Condition
                  </option>
                  <option>New</option>
                  <option>Used</option>
                </select>
              </div>

              {productType !== "Donation" && (
                <div>
                  <div className="form-group mb-4 flex">
                    <div className="col-md-1 center pt-3">
                      <i className="fa fa-money"></i>
                    </div>
                    <input
                      id="purchasePrice"
                      name="purchasePrice"
                      className="form-control"
                      type="number"
                      placeholder="Purchase Price"
                      value={purchasePrice}
                      onChange={productDataChange}
                    />
                  </div>
                  <div className="form-group mb-4 flex">
                    <div className="col-md-1 center pt-3">
                      <i className="fa fa-money"></i>
                    </div>
                    <input
                      id="askingPrice"
                      name="askingPrice"
                      className="form-control"
                      type="number"
                      placeholder="Asking Price"
                      value={askingPrice}
                      onChange={productDataChange}
                    />
                  </div>
                </div>
              )}
              <div className="form-group mb-4 flex">
                <div className="col-md-1 center pt-3">
                  <i className="fa fa-calendar"></i>
                </div>
                <input
                  id="dateOfPurchase"
                  name="dateOfPurchase"
                  ref={ref}
                  onFocus={() => (ref.current.type = "date")}
                  onBlur={() => (ref.current.type = "text")}
                  className="form-control"
                  required=""
                  type="text"
                  placeholder="Enter Date of Purchase"
                  value={dateOfPurchase}
                  onChange={productDataChange}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-4 flex">
                <div className="col-md-1 center pt-3">
                  <i className="fa fa-shopping-cart"></i>
                </div>
                <select
                  id="productType"
                  name="productType"
                  className="form-control text-primary"
                  value={productType}
                  onChange={productDataChange}
                  required
                >
                  <option value="" disabled id="initialTypeSelection">
                    Select Product Type
                  </option>
                  <option>Marketplace</option>
                  <option>Recycle</option>
                  <option>Donation</option>
                </select>
              </div>
              <div className="form-group mb-4 flex">
                <div className="col-md-1 center pt-3">
                  <i className="fa fa-info-circle"></i>
                </div>
                <textarea
                  className="mt-2 p-1"
                  id="productDescription"
                  name="description"
                  placeholder="Write Product Description here"
                  value={description}
                  rows="4"
                  cols="100"
                  onChange={productDataChange}
                ></textarea>
              </div>
              <div id="createProductFormFile" className="center">
                <label for="avatar" class="file-input-label">
                  <i class="fa fa-plus"></i>
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                  class="file-input"
                />
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product Preview"
                    width={400}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="btn btn-success addbtn w-40">
              <i className="fa fa-plus"></i> Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
