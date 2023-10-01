import React, { useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import "./Favorites.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavorite,
  getFavorites,
} from "../../../redux/actions/userActions";
import { useAlert } from "react-alert";

const Favorites = (props) => {
  //const favorites = props.user_data.favorites
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const products = [
    {
      product_id: "1",
      name: "Laptop",
      price: "350",
      quantity: 3,
      date: "12/06/1999",
    },
    {
      product_id: "2",
      name: "Mobile",
      price: "350",
      quantity: 3,
      date: "12/06/1999",
    },
    {
      product_id: "3",
      name: "Book",
      price: "350",
      quantity: 3,
      date: "12/06/1999",
    },
  ];
  const favoritesList = products?.map((favorite, index) => (
    <FavoriteDetails
      favorite={favorite.product_id}
      index={index}
    ></FavoriteDetails>
  ));
  return (
    <div>
      <div className=" fav_box">
        <div class="bio-graph-heading ">My Favorite Products</div>
        <div class="panel-body bio-graph-info m-2 p-2">
          <div className="p-3 m-2">
            <table class="table table-stripped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Date</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>{favoritesList}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;

function FavoriteDetails(props) {
  const { products } = useSelector((state) => state.products);
  const temp = products.find((o) => o._id === props.favorite);
  const dispatch = useDispatch();
  const alert = useAlert();
  const onDeleteFavorite = () => {
    dispatch(deleteFavorite(props.favorite));
    dispatch(getFavorites());

    alert.success("PRODUCT DELETED FROM FAVORITES");
  };
  return (
    <tr>
      {temp && (
        <>
          <td>{props.index + 1}</td>
          <td
            style={{
              textAlign: "center",
            }}
          >
            <Link
              to={`/product/${props.favorite}`}
              className=" text-decoration-none fw-bold"
            >
              {temp.name}
            </Link>{" "}
          </td>
          <td>{temp.purchase_price} </td>
          <td>{temp.quantity} </td>
          <td>{temp.created_at} </td>
          <td>
            <button
              className="btn btn-danger "
              onClick={() => {
                onDeleteFavorite();
              }}
            >
              {" "}
              X{" "}
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
