import { Route, Routes } from "react-router-dom";
import Home from "views/home";

import { NonAuthenticated } from "./helpers";

const PublicRoutes = () => {
  return (
    <Routes>
      <NonAuthenticated>
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Home />} />
      </NonAuthenticated>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default PublicRoutes;
