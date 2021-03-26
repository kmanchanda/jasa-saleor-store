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

class DisplaySpecifications extends React.Component<{
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
    return (
      <Overlay testingContext="loginOverlay" context={overlay}>
        <div className="display-content">
          <Online>
            <div className="overlay__header">
              <p className="overlay__header-text">{title}</p>
              <ReactSVG
                path={closeImg}
                onClick={hide}
                className="overlay__header__close-icon"
              />
            </div>
            <div className="content-width">
              <ul>
                {Object.entries(data).map((item, key) => {
                  return (
                    <li>
                      {item[0]} : {item[1]}
                    </li>
                  );
                })}
              </ul>
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

export default DisplaySpecifications;
