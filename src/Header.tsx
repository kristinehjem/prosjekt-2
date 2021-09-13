import React, { Component } from "react";
import logo from "./assets/gitlab-logo.svg";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div id="header-container">
        <img id="header-logo" src={logo} alt="Logo" />
        <h1 id="header-text">This is Header</h1>
      </div>
    );
  }
}
