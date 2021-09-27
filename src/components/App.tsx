import React from "react";
import "../styles/App.css";
import Header from "./Header";
import ContentWrapper from "./ContentWrapper";
import { ContentProvider } from "../contexts/contextApi";

function App() {
  return (
    <ContentProvider>
      <div className="App">
        <Header />
        <ContentWrapper />
      </div>
    </ContentProvider>
  );
}

export default App;
