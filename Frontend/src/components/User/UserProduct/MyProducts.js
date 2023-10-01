import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  editBid,
  getProducts,
  getUserProducts,
  rejectBid,
} from "../../../redux/actions/productActions";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import "./MyProducts.css";
import { deleteProduct } from "../../../redux/actions/productActions";
const MyProducts = () => {
  const dispatch = useDispatch();
  const { userProducts } = useSelector((state) => state.userProducts);
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { username } = user;

  useEffect(() => {
    console.log(username);
    dispatch(getUserProducts(username));
    // dispatch(getProducts());
  }, [dispatch, username]);

  const productList = userProducts?.map((product, index) => (
    <ProductDetails product={product} index={index}></ProductDetails>
  ));

  return (
    <div>
      <div className="myproducts_box ">
        <div class="bio-graph-heading ">My Products</div>
        <div class="panel-body bio-graph-info mb-2 p-2"></div>

        <div className="p-3 m-2">
          <table class="table table-stripped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Date</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>{productList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;

function ProductDetails(props) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const onDeleteProduct = () => {
    dispatch(deleteProduct(props.product._id));
    alert.success("PRODUCT DELETED SUCCESSFULLY");
    dispatch(getUserProducts());
  };
  return (
    <tr>
      {
        <>
          <td>{props.index + 1}</td>
          <td
            style={{
              textAlign: "center",
            }}
          >
            <Link
              to={`/product/${props.product.id}`}
              className=" text-decoration-none fw-bold"
            >
              {props.product.name}
            </Link>{" "}
          </td>
          <td>{props.product.purchase_price} </td>
          <td>{props.product.quantity} </td>
          <td>{props.product.created_at} </td>
          <td>
            <Link
              className="btn btn-warning btn-sm"
              to={`/product/${props.product._id}/edit`}
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                onDeleteProduct();
              }}
            >
              Delete
            </button>
          </td>
        </>
      }
    </tr>
  );
}

// function ProductBidDetails(props) {
//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const { user } = useSelector((state) => state.user);
//   const [editAmount, setEditAmount] = useState("");
//   const bids = props.product.bids.find((item) => {
//     if (item.buyer_id === user._id) {
//       return item;
//     }
//   });
//   const onDeleteProduct = () => {
//     dispatch(deleteProduct(props.product._id));
//     alert.success("PRODUCT DELETED SUCCESSFULLY");
//     dispatch(getUserProducts());
//   };
//   const onEditBid = (e) => {
//     e.preventDefault();
//     //  const myForm = new FormData();
//     //  myForm.set("editAmount", editAmount);
//     bids.amount = editAmount;
//     dispatch(editBid(props.product._id, bids._id, editAmount));
//     alert.success("BID EDITED SUCCESSFULLY");
//   };

//   const onRemoveBid = () => {
//     dispatch(rejectBid(props.product._id, bids._id));
//     alert.success("BID REMOVED SUCCESSFULLY");
//   };

//   const onEditAmountChange = (e) => {
//     // setBidAmount({ ...bidAmount, [e.target.name]: e.target.value });
//     setEditAmount(e.target.value);
//     // console.log(bidAmount);
//     // setBidAmount({...bidAmount, e.target.name: e.target.value} );
//   };

//   return (
//     <tr>
//       {
//         <>
//           <td>{props.index + 1}</td>
//           <td
//             style={{
//               textAlign: "center",
//             }}
//           >
//             <Link
//               to={`/product/${props.product._id}`}
//               className=" text-decoration-none fw-bold"
//             >
//               {props.product.name}
//             </Link>{" "}
//           </td>
//           <td>{props.product.purchase_price} </td>
//           <td>{bids.amount} </td>
//           <td>{props.product.created_at} </td>
//           <td>
//             <button
//               type="button"
//               className=" card-button flex-fill border-0 btn btn-warning btn-sm"
//               data-bs-toggle="modal"
//               data-bs-target="#staticBackdrop"
//             >
//               Edit Bid
//             </button>
//             {/* <h4>
//        Your bidded amount is <strong>{bidAmount} </strong>{" "}
//       </h4> */}
//             <div
//               className="modal fade"
//               id="staticBackdrop"
//               data-bs-backdrop="static"
//               data-bs-keyboard="false"
//               tabindex="-1"
//               aria-labelledby="staticBackdropLabel"
//               aria-hidden="true"
//             >
//               <div className="modal-dialog">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title" id="staticBackdropLabel">
//                       Edit Bid
//                     </h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     ></button>
//                   </div>
//                   <div className="modal-body">
//                     <input
//                       type="number"
//                       name="bidAmount"
//                       onChange={onEditAmountChange}
//                       value={editAmount}
//                       placeholder="Enter your New bid Amount"
//                       class="form-control"
//                       id="inputZip"
//                     />
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       data-bs-dismiss="modal"
//                     >
//                       Close
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-success"
//                       data-bs-dismiss="modal"
//                       onClick={onEditBid}
//                     >
//                       Place Bid
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>{" "}
//           </td>
//           <td>
//             <button className="btn btn-danger btn-sm" onClick={onRemoveBid}>
//               Remove
//             </button>
//           </td>
//         </>
//       }
//     </tr>
//   );
// }
