import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login"; 
import Register from "./screens/Register"; 
import Profile from "./screens/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element:<ProtectedRoutes><Home /></ProtectedRoutes> ,
  },
  {
    path: "/login",
    element: <ProtectedRoutes><Login /></ProtectedRoutes>,
  },
  {
    path: "/register",
    element: <ProtectedRoutes><Register /></ProtectedRoutes>,
  },
  {
    path: "/profile",
    element: <ProtectedRoutes><Profile /></ProtectedRoutes>,
  },
  {
    path: "*", 
    element: <div>404 - Page Not Found</div>, 
  },
]);

function App() {
  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;
