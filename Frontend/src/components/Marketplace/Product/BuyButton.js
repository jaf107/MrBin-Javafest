import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createBid, getBid } from "../../../redux/actions/productActions";
import { placeOrder } from "../../../redux/actions/orderActions";

function BuyButton(props) {
  const { user } = useSelector((state) => state.user);
  const [hasBid, setHasBid] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();

  const buyRequest = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("buyer", user.username);
    myForm.set("product", props.product);

    dispatch(placeOrder({buyer: user.username, product: props.product}));
    // if (!hasBid) {
    //   dispatch(getBid(props.product._id));
    // dispatch(createBid(myForm, props.product._id));
    //   alert.success("BUY REQUEST MADE SUCCESSFULLY");
    // } else {
    //   alert.error("BID EXISTS FOR THE CURRENT PRODUCT");
    // }
    // setHasBid(true);
  };
  return (
    <span>
      <button
        type="button"
        className=" card-button flex-fill border-0 btn btn-success"
        onClick={buyRequest}
      >
        Buy
      </button>
    </span>
  );
}

export default BuyButton;
