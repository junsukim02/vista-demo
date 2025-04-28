import { useState } from "react";
import Hls from "hls.js";
import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [camSelect, setCamSelect] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [activeModal, setActiveModal] = useState(null);
  const videoRef = useRef(null);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setSliderValue(value);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setSliderValue(Math.min(100, Math.max(0, value)));
    }
  };

  const menuItems = [
    {
      id: "context",
      title: "Context",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "materials",
      title: "Materials",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "protocol",
      title: "Protocol",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "questions",
      title: "Questions",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const openModal = (itemId) => {
    setActiveModal(itemId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource("http://10.20.52.4:8080/hls/yeahyeah.m3u8");
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = "http://10.20.52.4:8080/hls/yeahyeah.m3u8";
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }
  }, []);

  return (
    <div className="app">
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
              {menuItems.map((item) => (
                <li key={item.id} onClick={() => openModal(item.id)}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="main-content">
        <div className="video-feed">
          {camSelect ? (
            <video ref={videoRef} controls className="video-element" />
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
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="slider"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleInputChange}
              className="number-input"
            />
          </div>
        </div>
      </div>

      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <h3>{menuItems.find((item) => item.id === activeModal)?.title}</h3>
            <p>{menuItems.find((item) => item.id === activeModal)?.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
