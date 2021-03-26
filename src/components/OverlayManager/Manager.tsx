import * as React from "react";

import { Overlay, OverlayContext, OverlayType } from "..";
import DisplayContent from "./DisplayContent";
import DisplayFilterChips from "./DisplayFilterChips";
import MobileNav from "./MobileNav";
import Modal from "./Modal";
import Notification from "./Notification";
import Search from "./Search";
import DisplayOtherDocuments from "./DisplayOtherDocuments";
import DisplaySpecifications from "./DisplaySpecifications";
import DisplayDealer from "./DisplayDealer";

const OverlayManager: React.FC = props => (
  <OverlayContext.Consumer>
    {overlay => {
      switch (overlay.type) {
        case OverlayType.modal:
          return <Modal testingContext="modal" overlay={overlay} />;

        case OverlayType.message:
          return <Notification overlay={overlay} />;

        case OverlayType.search:
          return <Search overlay={overlay} />;

        case OverlayType.sideNav:
          return <MobileNav overlay={overlay} />;

        case OverlayType.mainMenuNav:
          return <Overlay testingContext="mainMenuOverlay" context={overlay} />;

        case OverlayType.DisplayContent:
          return <DisplayContent overlay={overlay} />;

        case OverlayType.DisplayOtherDocuments:
          return <DisplayOtherDocuments overlay={overlay} />;

        case OverlayType.DisplaySpecifications:
          return <DisplaySpecifications overlay={overlay} />;

        case OverlayType.DisplayDealer:
          return <DisplayDealer overlay={overlay} />;

        case OverlayType.DisplayFilterChips:
          return <DisplayFilterChips overlay={overlay} />;

        default:
          return null;
      }
    }}
  </OverlayContext.Consumer>
);

export default OverlayManager;
