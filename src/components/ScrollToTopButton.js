import React, { useState, useEffect } from "react";
import "./ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-container">
      <button
        onClick={scrollToTop}
        style={{ display: isVisible ? "inline" : "none" }}
        className={`scroll-to-top ${isVisible ? "slide-up-bounce" : ""}`}
      >
        ↑
      </button>
    </div>
  );
}
