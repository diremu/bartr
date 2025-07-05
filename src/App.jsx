import { Routes, Route } from "react-router";
import Landing from "./Landing.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Categories from "./components/Categories.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthNavbar from "./components/AuthNavbar.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthNavbar />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<Navbar />}>
          <Route path="/" element={<Landing />} />
          <Route path="/categories" element={<Categories />}>
            <Route path="/categories/:category" element={<Categories />} />
            <Route
              path="/categories/:category/:item"
              element={<Categories />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
