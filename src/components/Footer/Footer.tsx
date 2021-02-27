import "./scss/index.scss";

import * as React from "react";
import ReactSVG from "react-svg";
import logoImg from "../../images/logo.svg";
import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import Nav from "./Nav";

const Footer: React.FC = () => (
  <div className="footer" id="footer">
    <div className="company-logo">
      <ReactSVG path={logoImg} />
    </div>
    <Nav />
    <div className="copyright-icon">
      <div className="copyright-text">
        © 2020 Glossier. All rights reserved.
      </div>
      <div className="social-media-icon">
        {SOCIAL_MEDIA.map(medium => (
          <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
        ))}
      </div>
    </div>
  </div>
);

export default Footer;
