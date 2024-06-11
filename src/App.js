import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Homepage from "./pages/Homepage";
import MenPerfume from "./pages/MenPerfume";
import WomenPerfume from "./pages/WomenPerfume";
import AboutUs from "./pages/AboutUs";
import OriginalPerfume from "./pages/OriginalPerfume";
import ArabicPerfume from "./pages/ArabicPerfume";
import CompanyPerfume from "./pages/CompanyPerfume";
import BodySplashAndLotion from "./pages/BodySplashAndLotion";
import SprayAndMam from "./pages/SprayAndMam";
import MiniaturePerfume from "./pages/MiniaturePerfume";
import ShoppingCart from "./pages/ShoppingCart";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./Context/CartContext";
import { SearchProvider } from "./Context/SearchContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/originalperfume" element={<OriginalPerfume />} />
              <Route path="/menperfume" element={<MenPerfume />} />
              <Route path="/womenperfume" element={<WomenPerfume />} />
              <Route path="miniatureperfume" element={<MiniaturePerfume />} />
              <Route path="/companyperfume" element={<CompanyPerfume />} />
              <Route path="/arabicperfume" element={<ArabicPerfume />} />
              <Route
                path="/bodysplash&lotion"
                element={<BodySplashAndLotion />}
              />
              <Route path="/spray&mam" element={<SprayAndMam />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/shoppingcart" element={<ShoppingCart />} />
              <Route path="/loginForm" element={<LoginForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;
