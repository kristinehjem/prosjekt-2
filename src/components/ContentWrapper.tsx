import { useContentContext } from "../contexts/contextApi";
import "../styles/ContentWrapper.css";
import Sidebar from "./Sidebar";
import Commits from "./Commits";
import Issues from "./Issues";
import { DateIntervallProvider } from "../contexts/DateFilterContext";


function ContentWrapper() {
  const contentValue = useContentContext();
  let content = () => {
    if (contentValue === "issues") {
      return <Issues />;
    } else if (contentValue === "commits") {
      return (
        <DateIntervallProvider>
          <Commits />
        </DateIntervallProvider>
      );
    } else {
      return <div>Nothing to show</div>
    }
  }
  return (
    <div className="content-wrapper">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="content">
        {content()}
      </div>
    </div>
  );
}

export default ContentWrapper;
