import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { InitialSetupProvider } from "./context/InitialSetupContext";

const App = () => {
  return (
    <InitialSetupProvider>
      <div className="min-h-screen bg-gray-100">
        <AppRoutes />
      </div>
    </InitialSetupProvider>
  );
};

export default App;
