import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import SignInPage from "../pages/auth/SignIn";
import SignUpPage from "../pages/auth/SignUp";
import { useAuth } from "../hooks/useAuth";
import Dashboard from "@/components/dashboard/Dashboard";
import Users from "@/components/dashboard/AdminDashboard/Users";
import ProductsManages from "@/components/dashboard/AdminDashboard/ProductsManages";
import Orders from "@/components/dashboard/UserDashboard/Orders";
import Setting from "@/components/dashboard/UserDashboard/Setting";
import Profile from "@/components/dashboard/Profile";
import AddProducts from "@/components/dashboard/AdminDashboard/AddProducts";
import AdminOrders from "@/components/dashboard/AdminDashboard/Orders";
import DashboardHome from "@/components/dashboard/DashboardHome";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import AboutPage from "../pages/AboutPage";
import Cart from "@/pages/Cart";
import OrderSuccess from "../pages/OrderSuccess";
import OrderFailed from "../pages/OrderFailed";

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
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/dashboard/profile" />,
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      },
      {
        path: "/dashboard/products",
        element: <ProductsManages />,
      },
      {
        path: "/dashboard/orders",
        element: <Orders />,
      },
      {
        path: "/dashboard/adminOrders",
        element: <AdminOrders />,
      },
      {
        path: "/dashboard/settings",
        element: <Setting />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProducts />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "order-success",
    element: <OrderSuccess />,
  },
  {
    path: "order-failed",
    element: <OrderFailed />,
  },
]);
