import { AuthProvider } from "@/features/auth";

import { RouterProvider } from "react-router-dom";

import { router } from "@/app/routes/router";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;