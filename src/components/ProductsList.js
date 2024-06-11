import { useContext, useState } from "react";
import { SearchContext } from "../Context/SearchContext";
import "./ProductsList.css";
import { getPerfumes } from "../services/apiPerfumes";
import { useQuery } from "@tanstack/react-query";
import Product from "./Product";
import Spinner from "./Spinner";

export default function ProductsList() {
  const { searchTerm } = useContext(SearchContext);
  const [sortOrder, setSortOrder] = useState("default");
  const { isLoading, data: Perfumes } = useQuery({
    queryKey: ["perfume"],
    queryFn: getPerfumes,
  });

  let filteredPerfumes = Perfumes
    ? Perfumes.filter((perfume) => perfume.name.includes(searchTerm))
    : [];

  if (sortOrder === "highest") {
    filteredPerfumes.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "lowest") {
    filteredPerfumes.sort((a, b) => a.price - b.price);
  }

  if (isLoading)
    return (
      <p className="loading">
        <Spinner />
      </p>
    );

  return (
    <div className="products-container">
      <div className="sort-container">
        <p>مرتب سازی </p>
        <select
          className="order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">پیش فرض</option>
          <option value="highest">بیشترین قیمت</option>
          <option value="lowest">کمترین قیمت</option>
        </select>
      </div>
      <div className="grid-3-cols">
        {filteredPerfumes.map((perfume) => (
          <Product perfume={perfume} key={perfume.id} />
        ))}
      </div>
    </div>
  );
}
