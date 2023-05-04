import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Navbar from "./components/NavBar";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </>
  );
}

export default App;
