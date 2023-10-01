import React from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import ProductForm from "./ProductForm";
import "./ProductForm.css";

const AddProduct = () => {
  return (
    <div>
      <Header />
      <div className="container productform">
        <h4 className="text-center bg-light p-4">Product Form</h4>
        <div className=" shadow p-5 mb-4">
          <ProductForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
