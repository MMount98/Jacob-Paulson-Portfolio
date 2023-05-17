import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/NavBar";
import Home from "./components/pages/Home";
import Preview from "./components/utils/PreviewSearch";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Preview />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
