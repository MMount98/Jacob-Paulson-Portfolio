import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/NavBar";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <routes></routes>
      </Router>
    </>
  );
}

export default App;
