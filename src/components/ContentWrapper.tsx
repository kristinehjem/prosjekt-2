import "../styles/ContentWrapper.css";
import Sidebar from "./Sidebar";
import Commits from "./Commits";
import Issues from "./Issues";
import { DateIntervallProvider } from "../contexts/DateFilterContext";

function ContentWrapper() {
  return (
    <div className="content-wrapper">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="content">
        <DateIntervallProvider>
          <Issues />
          <Commits />
        </DateIntervallProvider>
      </div>
    </div>
  );
}

export default ContentWrapper;
