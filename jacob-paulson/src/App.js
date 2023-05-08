import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/NavBar";
import Home from "./components/pages/Home";
import AudioPlayer from "./components/utils/AudioPlayer";
import AWSPlayer from "./components/utils/AWS";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<AWSPlayer audioUrl="UPA6GE2-rain.mp3" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
