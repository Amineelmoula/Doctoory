import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Authentication/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Authentication/Register";
import PrivateRoute from "./routers/PrivateRoute";
import Reviews from "./Pages/Reviews";
import Contacts from "./Pages/Contacts";
import Appointment from "./Pages/Appointment";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PrivateRoute redirectURI="/" forGuests={true}>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute redirectURI="/" forGuests={true}>
              <Register />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute redirectURI="/">
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointment"
          element={
            <PrivateRoute redirectURI="/" forGuests={true}>
              <Appointment />
            </PrivateRoute>
          }
        />

        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
