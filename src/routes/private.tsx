import { Route } from "react-router-dom";

import { Authenticated } from "./helpers";

const PrivateRoutes = () => {
  return (
    <Authenticated>
      <Route />
      <Route />
    </Authenticated>
  );
};

export default PrivateRoutes;
