import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "views/NotFound";

import PrivateRoutes from "./private";
import PublicRoutes from "./public";

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={null}>
        <PublicRoutes />
        <PrivateRoutes />
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
