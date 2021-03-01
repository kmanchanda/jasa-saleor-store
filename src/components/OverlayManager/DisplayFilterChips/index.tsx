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

class DisplayFilterChips extends React.Component<{
  overlay: OverlayContextInterface;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { overlay } = this.props;
    const { hide, context } = overlay;
    const { title = "", content } = context as any;

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
              <div className="row-flex filter-container">
                {content.length
                  ? content.map((item, index) => {
                      return (
                        <div className="filter-chip" key={index}>
                          {item.label}
                        </div>
                      );
                    })
                  : null}
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

export default DisplayFilterChips;
