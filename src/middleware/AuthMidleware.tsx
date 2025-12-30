import { Navigate, Outlet, useLocation } from "react-router"
import { useAppStore } from "../store/useApp.Store"


const AuthMidleware = () => {
    const token = useAppStore((state) => state.token)
    const location = useLocation();

    if (!token) {
        return (
            <Navigate
                to="/auth/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }
    return <Outlet/>
}

export default AuthMidleware