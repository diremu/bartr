import { Routes, Route } from "react-router";
import Landing from "./Landing.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Categories from "./components/Categories.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthNavbar from "./components/AuthNavbar.jsx";
import Item from "./components/Item.jsx";
import  UserNavbar  from "./components/userNavbar.jsx";
import UserDashboard from "./components/userDashboard.jsx";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const authenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <>
      <Routes>
        <Route element={<AuthNavbar />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {!authenticated ? (
          <Route element={<Navbar />}>
            <Route path="/" element={<Landing />} />
            <Route path="/categories">
              <Route path=":category" element={<Categories />} />
              <Route path=":category/:item" element={<Item />} />
            </Route>
          </Route>
        ) : (
          <Route element={<UserNavbar />}>
            <Route path="/" element={<Landing />} />
            <Route path="/categories">
              <Route path=":category" element={<Categories />} />
              <Route path=":category/:item" element={<Item />} />
            </Route>
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
