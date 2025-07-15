import { Navigate, Outlet } from 'react-router-dom';
import PageNotFound from './PageNotFound';

const ProtectedRoute = ({ allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        return <Navigate to="/auth" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <PageNotFound/>
    }

    return <Outlet />;
};

export default ProtectedRoute;
