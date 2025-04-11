import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import SignInPage from "../pages/auth/SignIn";
import SignUpPage from "../pages/auth/SignUp";
import { useAuth } from "../hooks/useAuth";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import AboutPage from "../pages/AboutPage";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "allProducts",
        element: <AllProducts />,
      },
      {
        path: "/cars/:id",
        element: <ProductDetails />,
      },
      {
        path: "aboutPage",
        element: <AboutPage />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
]);
