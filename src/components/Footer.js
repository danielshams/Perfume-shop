import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <footer>
        <div className="footer-first-part">
          <h4>محصولات</h4>
          <p>عطر اورجینال</p>
          <p>عطر عربی</p>
          <p>عطر شرکتی</p>
          <p>عطر مینیاتوری</p>
        </div>
        <div className="footer-last-part">
          <h4>فرتینی</h4>
          <p>تماس با ما</p>
          <p>سوالات متداول</p>
        </div>
      </footer>
    </div>
  );
}
