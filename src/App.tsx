import { useState } from "react";
import "./styles.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [camSelect, setCamSelect] = useState(false);

  return (
    <div className="app">
      {/* Side Menu (Collapsible) */}
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "◄" : "►"}
        </button>
        {isMenuOpen && (
          <div className="menu-content">
            <h3>Menu</h3>
            <ul>
              <li>Context</li>
              <li>Materials</li>
              <li>Protocol</li>
              <li>Questions</li>
            </ul>
          </div>
        )}
      </div>

      <div className="main-content">
        <div className="video-feed">
          {camSelect ? (
            <div className="video-text">1</div>
          ) : (
            <div className="video-text">2</div>
          )}

          <button
            className="camera-button"
            onClick={() => setCamSelect(!camSelect)}
          >
            {camSelect ? "📷2" : "📷1"}
          </button>
        </div>

        <div className="action-buttons">
          <button className="btn">Placeholder</button>
          <button className="btn">Placeholder</button>
        </div>
      </div>
    </div>
  );
}

export default App;
