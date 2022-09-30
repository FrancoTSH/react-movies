import { AppProviders } from "context";
import { Suspense } from "react";
import AppRouter from "routes";

function App() {
  return (
    <Suspense fallback={null}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </Suspense>
  );
}

export default App;
