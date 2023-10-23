import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Crimes from "./pages/Crimes";
import Accidents from "./pages/Accidents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crimes" element={<Crimes />} />
        <Route path="/accidents" element={<Accidents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
