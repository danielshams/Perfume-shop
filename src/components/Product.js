import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

export default function Product({ perfume }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (perfume) {
      navigate(`/product-details/${perfume.id}`);
    }
  };

  if (!perfume) {
    return null;
  }

  return (
    <section>
      <div className="product-box">
        <div className="products-details">
          <div className="product-image-container">
            <img
              className="product-image"
              src={perfume.image}
              alt="product"
            />
          </div>

          <p className="product-name">{perfume.name}</p>
          <p className="product-price">قیمت : {perfume.price}</p>
          <button className="product-but" onClick={handleClick}>
            مشاهده
          </button>
        </div>
      </div>
    </section>
  );
}
