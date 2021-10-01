import { ContentProvider } from "../contexts/DynamicContentContext";
import "../styles/App.css";
import ContentWrapper from "./ContentWrapper";
import Header from "./Header";

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
