import "./Main.css";

export default function Main({ children }) {
  return (
    <div className="main">
      <p className="products-text">محصولات</p>
      {children}
    </div>
  );
}
