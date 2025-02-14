import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./AuthForm";
import Products from "./Products";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
