import { useState } from "react";
import Icons from "../Components/Icons"
import TableDashboard, { Tabs } from "../Components/TableDashboard"
import CategoriesForm from "../Components/CategoriesForm";
import { ToastContainer } from "react-toastify";


const Categories = () => {
    const [tab, setTab] = useState("Categorias");
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    // const filtered = useMemo(() => {
    //     const q = query.trim().toLowerCase();
    //     if (!q) return rows;
    //     return rows.filter((r) => {
    //         return (
    //             r.name.toLowerCase().includes(q) ||
    //             r.description.toLowerCase().includes(q) ||
    //             r.status.toString().includes(q)
    //         );
    //     });
    // }, [rows, query]);

    

    return (

        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-semibold text-slate-900">Categorias</h1>

            <div className="mt-6">
                <Tabs active={tab} onChange={setTab} />
            </div>

            <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Search */}
                    <div className="relative w-full sm:w-[360px]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Icons name="search" className="w-4 h-4" />
                        </span>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar"
                            className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        />
                    </div>

                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
                        <Icons name="filter" className="w-4 h-4" />
                        <span>Filtros</span>
                    </button>
                </div>

                <button onClick={() => setOpen(true)} className="inline-flex cursor-pointer items-center justify-center px-4 py-2 rounded-lg bg-indigo-900 text-white text-sm font-medium hover:bg-indigo-800">
                    Crear tipo de categoria
                </button>
            </div>
            <div className="mt-5">

                <TableDashboard />
            </div>

            <CategoriesForm
                open={open}
                onClose={() => setOpen(false)}
            />
            <ToastContainer />
        </div>

    )
}

export default Categories