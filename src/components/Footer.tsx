import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <hr className="divider" />
      <div className="container">
        <div className="grid cols-4 footer-grid">
          <div>
            <div className="row" style={{ alignItems: "center", gap: 8 }}>
              <img src="/Logo.svg" alt="Logo" width={18} height={18} />
              <strong>Task Manager</strong>
            </div>
            <p className="small" style={{ marginTop: 8 }}>
              Add tasks, set priorities, and finish strong—every day.
            </p>
            {/* <div className="row" style={{ marginTop: 8 }}>
              <a className="icon-btn" aria-label="Facebook" href="#">
                f
              </a>
              <a className="icon-btn" aria-label="X" href="#">
                x
              </a>
              <a className="icon-btn" aria-label="LinkedIn" href="#">
                in
              </a>
              <a className="icon-btn" aria-label="Behance" href="#">
                Be
              </a>
            </div> */}
          </div>
          <div>
            <div className="footer-heading">Company</div>
            <ul className="footer-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Product</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">Support</div>
            <ul className="footer-links">
              <li>
                <a href="#">Company</a>
              </li>
              <li>
                <a href="#">Press media</a>
              </li>
              <li>
                <a href="#">Our Blog</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">Newsletter</div>
            <p className="small">Subscribe to receive future updates</p>
            <form className="row" onSubmit={(e) => e.preventDefault()}>
              <input className="input" placeholder="Email address" />
              <button className="btn" type="submit">
                &gt;
              </button>
            </form>
          </div>
        </div>
        <div
          className="row small"
          style={{ justifyContent: "space-between", marginTop: 16 }}
        >
          <div className="row" style={{ gap: 12 }}>
            <a href="#">English</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Support</a>
          </div>
          <div className="small">
            <a href="#" style={{ fontWeight: 700, textDecoration: "none" }}>
              © {new Date().getFullYear()} Aldo Website. All rights reserved.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

