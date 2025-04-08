import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [showGreeting, setShowGreeting] = useState(false); //Controls when "Go Team VISTA!" shows

  const greeting = () => setShowGreeting(true); //Removed // for implicit return; set state to true

  return (
    <div>
      <Button
        children="Click Me!"
        className="btn btn-primary"
        onClick={greeting}
      ></Button>

      {showGreeting && <h1>Go Team VISTA!</h1>}
    </div>
  );
}

export default App;
