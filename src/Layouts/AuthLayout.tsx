import { Outlet } from "react-router"


const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-6">
        <Outlet/>
    </div>
  )
}

export default AuthLayout
