import { Navigate, Outlet, useLocation } from "react-router"
import { ActionsStore } from "../store/actionStore";


const AuthMidleware = () => {
    const token = ActionsStore((state) => state.token)
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