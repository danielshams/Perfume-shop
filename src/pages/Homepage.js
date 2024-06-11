import "./Homepage.css";
import NavBar from "../components/NavBar";
import Main from "../components/Main";
import ProductsList from "../components/ProductsList";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <Main>
        <ProductsList />
        <ScrollToTopButton />
      </Main>
        <Footer/>
    </>
  );
}
