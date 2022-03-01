import React from "react";
import "../css/Footer.css";
import Tooltip from "@mui/material/Tooltip";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="text">
          <p>Created By Jaydeep Bagthariya,&nbsp;</p>
          <p>Let's Meet On</p>
        </div>
        <div className="Contact_div">
          <Tooltip title="LinkedIn" arrow>
            <a href="https://www.linkedin.com/in/jaydeep-bagthariya-56029618a/" target="-">
              <i className="bx bxl-linkedin"></i>
            </a>
          </Tooltip>

          <Tooltip title="Github" arrow>
            <a href="https://github.com/jaydeep-bagthariya" target="-">
              <i className="bx bxl-github"></i>
            </a>
          </Tooltip>

          <Tooltip title="Instagram" arrow>
            {/* <a href="http://wa.me/qr/2BMNDCURTE6DA1" target="-"> */}
            <a href="https://www.instagram.com/j._starr_7/" target="-">
              <i className="bx bxl-instagram"></i>
            </a>
          </Tooltip>
        </div>
      </footer>
    </>
  );
}

export default Footer;
