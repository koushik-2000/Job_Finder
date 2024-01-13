import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./screens/home/Home";
import SignIn from "./screens/signin/SignIn";
import SignUp from "./screens/signup/SignUp";
import Job from "./screens/job/Job";
import Edit from "./screens/edit/Edit";
import New from "./screens/new/New";
import UpdateProfile from "./screens/update/UpdateProfile";


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/job/:id" element={<Job />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/new" element={<New />} />
          <Route path="/update" element={<UpdateProfile />} />
        </Routes>
      </div>
    </Router>
  )
};

export default App;
