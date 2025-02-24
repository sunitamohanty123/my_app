import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    console.log(!token);

    if (!token) {
        return <Navigate to="/" replace />
    }
    return <Outlet />
}

export default PrivateRoute;