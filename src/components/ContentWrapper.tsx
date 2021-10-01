import { useContentContext } from "../contexts/contextApi";
import "../styles/ContentWrapper.css";
import Sidebar from "./Sidebar";
import Commits from "./Commits";
import Issues from "./Issues";
import IssueModal from "./IssueModal";
import { DateIntervallProvider } from "../contexts/DateFilterContext";
import { ModalProvider } from "../contexts/ModalContext";


function ContentWrapper() {
  const contentValue = useContentContext();
  let content = () => {
    if (contentValue == "issues") {
      return (
      <ModalProvider>
        <Issues/>
        <IssueModal/>
      </ModalProvider>
      );
    } else if (contentValue == "commits") {
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
