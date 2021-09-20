import React from "react";
import "../styles/App.css";
import Header from "./Header";
import Issues from "./Issues";
import Commits from "./Commits";

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
