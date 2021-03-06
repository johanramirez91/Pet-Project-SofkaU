import React, { useState } from "react";
import NavbarComp from "./components/NavbarComp";
import StoreFromProvider from "./components/contexto/State";
import Footer from "./components/Footer";
import AppRouter from "./components/AppRouter";

function App() {

  return (
    <StoreFromProvider>
      <AppRouter />
      <Footer />
    </StoreFromProvider>
  );
}

export default App;
