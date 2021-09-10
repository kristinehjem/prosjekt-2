import React from "react";
import "./App.css";
import Commits from "./Commits";
import Issues from "./Issues";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Issues />
      <Commits />
    </div>
  );
}

export default App;
