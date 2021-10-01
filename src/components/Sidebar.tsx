import React from "react";
import { contentContextUpdate} from "../contexts/DynamicContentContext";
import "../styles/Sidebar.css"
import Issues from "./Issues";
class Sidebar extends React.Component {
    static contextType = contentContextUpdate;
    
    componentWillMount() {
        const content = this.context
        const sidebarView = localStorage.getItem('sidebarView');
        if (sidebarView != null) {
            content(sidebarView);
        }
    }

    render() {
        return (
            <contentContextUpdate.Consumer>
                {setContentContext => {
                    return <div className="sidebar">
                    <nav>
                        <ul>
                            <li onClick={() => setContentContext("commits")}>Commits</li>
                            <li onClick={() => setContentContext("issues")}>Issues</li>
                        </ul>
                    </nav>
                </div>
                }
                }
            </contentContextUpdate.Consumer>
        );
    }
}

export default Sidebar;