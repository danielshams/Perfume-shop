import React, { useContext } from "react";
import Swal from "sweetalert2";
import "./ShoppingCart.css";
import NavBar from "../components/NavBar";
import { CartContext } from "../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ShoppingCart() {
  const { cart, setCart } = useContext(CartContext);

  const removeFromCart = (id) => {
    Swal.fire({
      title: "آیا از حذف این محصول اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!بله، حذف کن",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(cart.filter((item) => item.id !== id));
        toast.success(".محصول با موفقیت حذف شد");
      }
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <ToastContainer/>
      <NavBar showSearch={false} />
      <div className="all-added-products">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="added-product" key={item.id}>
              <img
                className="added-product-image"
                src={item.image}
                alt={item.name}
              />
              <h2 className="added-product-name">{item.name}</h2>
              <p className="added-product-price">قیمت: {item.price}</p>
              <p className="added-product-quantity">{item.quantity} عدد</p>

              <button
                className="delete-added-product"
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="shoppingCart-title">سبد خرید شما در حال حاضر خالیست.</p>
        )}
        {cart.length > 0 && (
          <div className="total-cost">
            <h2 className="total-price">
              مجموع خرید شما: {calculateTotal()} تومان
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
