import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPerfume } from "../services/apiPerfumes";
import "./ProductDetails.css";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../Context/CartContext";
import Spinner from "../components/Spinner";

export default function ProductDetails() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [buttonText, setButtonText] = useState("افزودن به سبد خرید");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const { data: perfume, isLoading } = useQuery({
    queryKey: ["perfume", id],
    queryFn: fetchPerfume,
  });

  useEffect(() => {
    if (perfume) {
      const productInCart = cart.find((item) => item.id === perfume.id);
      if (productInCart) {
        setButtonText("اضافه شد به سبد خرید");
        setIsAddedToCart(true);
      }
    }
  }, [cart, perfume]);

  const addToCart = () => {
    const productInCart = cart.find((item) => item.id === perfume.id);
    if (!productInCart) {
      setCart([...cart, { ...perfume, quantity: count }]);
      setButtonText("اضافه شد به سبد خرید");
      setIsAddedToCart(true);
      toast.success("محصول با موفقیت به سبد خرید اضافه شد");
    }
  };

  if (isLoading)
    return (
      <p className="loading">
        <Spinner />
      </p>
    )

  if (!perfume) {
    return "Product not found";
  }

  return (
    <>
      <NavBar showSearch={false} />
      <ToastContainer />
      <div className="product-details">
        <img className="product-details-img" src={perfume.image} />
        <div className="product-details-options ">
          <h2 className="product-details-name">{perfume.name}</h2>
          <p className="product-details-des">{perfume.description}</p>
          <p>نت اولیه: {perfume.firstnote}</p>
          <p>دومین نت: {perfume.secondnote}</p>
          <p>نت پایه: {perfume.mainnote}</p>
          <p className="product-details-capacity">
            تعداد موجود در انبار : {perfume.Capacity} عدد
          </p>
          <p className="product-prices">قیمت : {perfume.price}</p>
          <div className="product-details-count-but">
            <div className="product-details-count">
              <button
                className="decrease-but"
                disabled={count <= 1}
                onClick={() => setCount(count - 1)}
              >
                -
              </button>
              {count}
              <button
                className="increase-but"
                disabled={count >= perfume.Capacity}
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
            </div>
            <button
              className="add-to-cart-but"
              onClick={addToCart}
              disabled={isAddedToCart}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
