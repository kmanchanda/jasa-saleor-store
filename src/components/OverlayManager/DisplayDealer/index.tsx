import * as React from "react";
import ReactSVG from "react-svg";

import "./scss/index.scss";

import {
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import closeImg from "../../../images/x.svg";
import img1 from "../../../images/img1.png";
import img2 from "../../../images/img2.png";
import img3 from "../../../images/image3.svg";
import img4 from "../../../images/image4.svg";
import img5 from "../../../images/image5.svg";
import img6 from "../../../images/image6.svg";
import img7 from "../../../images/image7.svg";
import img8 from "../../../images/image8.svg";
import img9 from "../../../images/image9.svg";
import img10 from "../../../images/image10.svg";
import img11 from "../../../images/image11.svg";
import img12 from "../../../images/image12.svg";
import img13 from "../../../images/image13.svg";
import img14 from "../../../images/image14.svg";
import img15 from "../../../images/image15.svg";
import img16 from "../../../images/image16.svg";
import img17 from "../../../images/image17.svg";
import img18 from "../../../images/image18.svg";

class DisplayDealer extends React.Component<{
  overlay: OverlayContextInterface;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { overlay } = this.props;
    const { hide, context } = overlay;
    const { title = "", data } = context;
    const array = [
      "../../../images/image1.svg",
      "../../../images/image2.svg",
      "../../../images/image3.svg",
      "../../../images/image4.svg",
    ];
    return (
      <Overlay testingContext="loginOverlay" context={overlay}>
        <div className="display-content">
          <Online>
            <div className="overlay__header">
              <p className="overlay__header-text" />
              <ReactSVG
                path={closeImg}
                onClick={hide}
                className="overlay__header__close-icon"
              />
            </div>
            <div className="header-text">Vores forhandlere</div>
            <div className="grid-container">
              <div>
                {" "}
                <img src={img1} />
              </div>
              <div>
                {" "}
                <img src={img2} />
              </div>
              <div>
                {" "}
                <img src={img3} />
              </div>
              <div style={{ padding: "0px" }}>
                {" "}
                <img src={img4} />
              </div>
              <div>
                {" "}
                <img src={img5} />
              </div>
              <div style={{ padding: "0px" }}>
                {" "}
                <img src={img6} />
              </div>
              <div>
                {" "}
                <img src={img7} />
              </div>
              <div>
                {" "}
                <img src={img8} />
              </div>
              <div>
                {" "}
                <img src={img9} />
              </div>
              <div>
                {" "}
                <img src={img10} />
              </div>
              <div>
                {" "}
                <img src={img11} />
              </div>
              <div>
                {" "}
                <img src={img12} />
              </div>
              <div>
                {" "}
                <img src={img13} />
              </div>
              <div>
                {" "}
                <img src={img14} />
              </div>
              <div>
                {" "}
                <img src={img15} />
              </div>
              <div>
                {" "}
                <img src={img16} />
              </div>
              <div>
                {" "}
                <img src={img17} />
              </div>
              <div>
                {" "}
                <img src={img18} />
              </div>
            </div>
          </Online>
          <Offline>
            <OfflinePlaceholder />
          </Offline>
        </div>
      </Overlay>
    );
  }
}

export default DisplayDealer;
