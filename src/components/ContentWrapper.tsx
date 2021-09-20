import "./App.css";
import Commits from "./Commits";
import Issues from "./Issues";

function ContentWrapper() {
  return (
    <div className="content-wrapper">
      <Issues />
      <Commits />
    </div>
  );
}

export default ContentWrapper;
