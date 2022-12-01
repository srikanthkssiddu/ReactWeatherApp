import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { CountryDetails } from "./screens/Country";
import { Home } from "./screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about/:name" element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
