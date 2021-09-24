import React from "react";
import "../styles/Sidebar.css"

function Sidebar() {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>Commits</li>
                    <li>Issues</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;