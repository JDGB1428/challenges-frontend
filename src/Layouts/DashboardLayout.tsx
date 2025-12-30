import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { ToastContainer } from "react-toastify";


const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Topbar />
            <div className="md:flex">
                <Sidebar active="Bakanes" />
                <main className="flex-1 p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
            <ToastContainer />
        </div>
    )
}

export default DashboardLayout
