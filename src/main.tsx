import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SidebarProvider } from "./components/ui/sidebar";

// Handle redirect from 404 page
(function () {
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  if (redirect) {
    // Remove the query parameter and replace with the original path
    history.replaceState(null, "", "/" + redirect);
  }
})();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
          </AuthProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </Provider>
  </HelmetProvider>
);
