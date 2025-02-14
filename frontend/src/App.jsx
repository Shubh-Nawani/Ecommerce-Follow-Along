import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./AuthForm";
import Products from "./Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
