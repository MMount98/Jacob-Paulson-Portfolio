import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/NavBar";
import Home from "./components/pages/Home";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
