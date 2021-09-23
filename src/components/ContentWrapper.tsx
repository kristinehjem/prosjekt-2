import "../styles/ContentWrapper.css";
import Sidebar from "./Sidebar";
import Commits from "./Commits";
import Issues from "./Issues";

function ContentWrapper() {
  return (
    <div className="content-wrapper">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="content">
        <Issues />
        <Commits />
      </div>
    </div>
  );
}

export default ContentWrapper;
