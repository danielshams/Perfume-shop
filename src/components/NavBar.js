import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../Context/SearchContext";
import { CartContext } from "../Context/CartContext";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import useUser from "../authentication/useUser";

export default function NavBar({ showSearch = true }) {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { cart } = useContext(CartContext);
  const [isClicked, setIsClicked] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useUser();
  const navbarRef = useRef();

  function handleCloseMenu() {
    setIsClicked(false);
  }

  function handleClick() {
    setIsClicked((isClicked) => !isClicked);
  }

  function handleSearchClick() {
    setIsSearchOpen((isSearchOpen) => !isSearchOpen);
    setIsClicked(false);
  }

  function handleClose(e) {
    if (!navbarRef.current.contains(e.target)) {
      setIsClicked(false);
      setIsSearchOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  return (
    <>
      <header ref={navbarRef}>
        <div className="left-icons">
          <div className="shop-counts">
            <p className="cart-length">{cart.length}</p>
            <NavLink to="/shoppingcart">
              <i className="fa-solid fa-bag-shopping" id="cart-btn"></i>
            </NavLink>
          </div>
          {showSearch && (
            <i className="fas fa-search" onClick={handleSearchClick}></i>
          )}
          {user ? (
            <NavLink to="/dashboard" className="user-email">
              <p>{user.email}</p>
            </NavLink>
          ) : (
            <NavLink to="/loginForm">
              <i className="fa-solid fa-user"></i>
            </NavLink>
          )}
        </div>

        <NavLink to="/homepage" className="logo">
          <img src="logoipsum-329.svg" alt="logo" />
        </NavLink>

        <ul id="navbar" className={isClicked ? "#navbar active" : "#navbar"}>
          <div className="menu-border">
            <div className="close-icon2" onClick={handleCloseMenu}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <li>
            <NavLink to="/originalperfume" className="NavLinks">
              عطر اورجینال
            </NavLink>
          </li>
          <li>
            <NavLink to="/companyperfume" className="NavLinks">
              عطر شرکتی
            </NavLink>
          </li>
          <li>
            <NavLink to="/menperfume" className="NavLinks">
              عطر مردانه
            </NavLink>
          </li>
          <li>
            <NavLink to="/womenperfume" className="NavLinks">
              عطر زنانه
            </NavLink>
          </li>
          <li>
            <NavLink to="/arabicperfume" className="NavLinks">
              عطر عربی
            </NavLink>
          </li>
          <li>
            <NavLink to="/miniatureperfume" className="NavLinks">
              عطر مینیاتوری
            </NavLink>
          </li>
          <li>
            <NavLink to="/bodysplash&lotion" className="NavLinks">
              لوسیون و بادی اسپلش
            </NavLink>
          </li>
          <li>
            <NavLink to="/spray&mam" className="NavLinks">
              مام و اسپری
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutus" className="NavLinks">
              درباره ی من
            </NavLink>
          </li>
        </ul>

        <div className="icons">
          <div className={`search-box ${isSearchOpen ? "show" : ""}`}>
            <input
              type="text"
              placeholder="جستجو . . ."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i
              className="fas fa-times close-icon"
              onClick={handleSearchClick}
            ></i>
          </div>
          <div className="mobile" onClick={handleClick}>
            <i id="bar" className="fas fa-bars"></i>
          </div>
        </div>
      </header>
      {isClicked && (
        <div
          className={`backdrop ${isClicked ? "show" : ""}`}
          onClick={handleClose}
        ></div>
      )}
    </>
  );
}
