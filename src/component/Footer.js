import React from "react";
import "../css/Footer.css";
import Tooltip from "@mui/material/Tooltip";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="text">
          <p>Created By Jaydip Sidapara,&nbsp;</p>
          <p>Let's Meet</p>
        </div>
        <div className="Contact_div">
          <Tooltip title="instagram" arrow>
            <a href="http://instagram.com/jd_0p.code?utm_source=qr" target="-">
              <i className="bx bxl-instagram"></i>
            </a>
          </Tooltip>

          <Tooltip title="github" arrow>
            <a href="https://github.com/jaydip-github" target="-">
              <i className="bx bxl-github"></i>
            </a>
          </Tooltip>

          <Tooltip title="whatsapp" arrow>
            {/* <a href="http://wa.me/qr/2BMNDCURTE6DA1" target="-"> */}
            <a href="http://wa.me/916354160180" target="-">
              <i className="bx bxl-whatsapp"></i>
            </a>
          </Tooltip>
        </div>
      </footer>
    </>
  );
}

export default Footer;
