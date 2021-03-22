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

class DisplayOtherDocuments extends React.Component<{
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
              For mere info, se 
              {data.map((item, key) => {
                return (
                  <span> &nbsp;<a href={item.url} target="_blank"> datablad</a></span>
                );
              })}
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

export default DisplayOtherDocuments;
