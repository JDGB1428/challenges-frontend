/* eslint-disable react-refresh/only-export-components */
import { sidebarItems } from "../data/sidebarItem";
import Icons from "./Icons";

export const cn = (...classes: Array<string | false | undefined | null>) => {
    return classes.filter(Boolean).join(" ");
}
const Sidebar = ({ active }: { active: string }) => {
    return (
        <aside className="hidden lg:flex lg:w-[280px] lg:flex-col bg-white shadow-sm border-r border-slate-200">
            <div className="p-5">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="relative p-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                                bk
                            </div>
                            <div className="leading-tight">
                                <div className="text-lg font-semibold text-slate-900">be kind</div>
                                <div className="text-xs text-slate-600 -mt-0.5">network</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="px-3 pb-4">
                <div className="space-y-1">
                    {sidebarItems.map((it) => {
                        const isActive = it.key === active;
                        return (
                            <button
                                key={it.key}
                                className={cn(
                                    "w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                                    isActive
                                        ? "bg-cyan-50 text-slate-900 border border-cyan-100"
                                        : "text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <span className={cn("text-slate-500", isActive && "text-cyan-700")}>
                                    <Icons name={it.icon} />
                                </span>
                                <span className="truncate">{it.label}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>
            <div className="mt-auto p-4">
                <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition">
                    <Icons name="logout" />
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
}


export default Sidebar