import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/NavBar";
import Home from "./components/pages/Home";
import ContactMe from "./components/pages/Contact-Me";


function App() {
  return (
    < >
      <Router >
        <Sidebar />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<ContactMe />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
