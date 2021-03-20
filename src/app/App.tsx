import React from "react";

import { useAuth } from "@saleor/sdk";
import { Loader } from "@components/atoms";
import { demoMode } from "@temp/constants";
import {
  Footer,
  MainMenu,
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
} from "../components";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";
import Notifications from "./Notifications";

const App: React.FC = () => {
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  return (
    <OverlayProvider>
      <MetaConsumer />
      <MainMenu demoMode={demoMode} />
      <Routes />
      <Footer />
      <OverlayManager />
      <Notifications />
    </OverlayProvider>
  );
};

export default App;
