import { useEffect, useMemo } from 'react';
import Icons from './Icons';
import { cn } from './Sidebar';
import { fmt } from '../utils/format-date';
import type { AdminAdd } from '../types';
import { ActionsStore } from '../store/actionStore';


export function Tabs({
    active,
    onChange,
}: {
    active: string;
    onChange: (v: string) => void;
}) {
    const tabs = ["Categorias", "Tipos", "Evidencias"];
    return (
        <div className="flex items-center gap-6 border-b border-slate-200">
            {tabs.map((t) => {
                const isActive = t === active;
                return (
                    <button
                        key={t}
                        onClick={() => onChange(t)}
                        className={cn(
                            "relative py-3 text-sm font-medium transition",
                            isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        {t}
                        {isActive && (
                            <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-indigo-600 rounded-full" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}


function StatusPill({ value }: { value: AdminAdd["status"] }) {
    const isActive = value === 1;
    return (
        <span
            className={cn(
                "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium border",
                isActive
                    ? "bg-green-50 text-green-700 border-green-300"
                    : "bg-slate-50 text-slate-600 border-slate-300"
            )}
        >
            {value === 1 ? "Activo" : "Inactivo"}
        </span>
    );
}


function Th({
    children,
    align = "left",
}: {
    children: React.ReactNode;
    align?: "left" | "right";
}) {
    return (
        <th className={cn("px-4 py-3 font-semibold text-xs uppercase tracking-wide", align === "right" && "text-right")}>
            <div className={cn("flex items-center gap-2", align === "right" ? "justify-end" : "justify-start")}>
                <span>{children}</span>
                <span className="text-slate-400">
                    <Icons name="sort" className="w-4 h-4" />
                </span>
            </div>
        </th>
    );
}

function PagerBtn({
    label,
    onClick,
    disabled,
}: {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className="h-7 w-7 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {label}
        </button>
    );
}
const TableDashboard = () => {

    const actions = ActionsStore(state => state.actions);
    const fetchActions = ActionsStore(state => state.fetchActions);
    const hasActions = useMemo(() => actions.data.length, [actions]);
    const setPage = ActionsStore((s) => s.setPage);
    const setPageSize = ActionsStore((s) => s.setPageSize);

    const pageUI = (actions.pageNumber ?? 0) + 1;
    const totalPages = actions.totalPages ?? 0;
    const total = actions.totalElements ?? 0;
    const size = actions.pageSize ?? 10;

    const canPrev = pageUI > 1;
    const canNext = pageUI < totalPages;

    const start = total === 0 ? 0 : (pageUI - 1) * size + 1;
    const end = Math.min(pageUI * size, total);

    useEffect(() => {
        fetchActions();
        setPage(1);
    }, []);

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-[980px] w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <Th>Nombre de la categoria</Th>
                            <Th>Icono de la categoria</Th>
                            <Th>Estado</Th>
                            <Th>Descripción</Th>
                            <Th>Fecha de creación</Th>
                            <Th align="right">Acciones</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {actions.data.map((actions) => (
                            <tr key={actions.id} className="border-t border-slate-200 hover:bg-slate-50/60">
                                <td className="px-4 py-4 text-slate-900">{actions.name}</td>
                                <td className="px-4 py-4">
                                    <img src={actions.icon} alt="ImageApi" className="w-10 h-10 rounded-md object-cover mx-auto" />
                                </td>
                                <td className="px-4 py-4">
                                    <StatusPill value={actions.status} />
                                </td>
                                <td className="px-4 py-4 text-slate-700 max-w-[420px]">
                                    <span className="line-clamp-2">{actions.description}</span>
                                </td>
                                <td className=" text-center px-4 py-4 text-slate-700 max-w-[420px]">
                                    <span className="line-clamp-2">{fmt.format(actions.createdAt)}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-end gap-3 text-slate-500">
                                        <button
                                            className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200"
                                            onClick={() => console.log('Edit')}
                                            title="Editar"
                                        >
                                            <Icons name="edit" />
                                        </button>
                                        <button
                                            className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200"
                                            onClick={() => console.log('Delete')}
                                            title="Eliminar"
                                        >
                                            <Icons name="trash" />
                                        </button>
                                        <button
                                            className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200"
                                            onClick={() => console.log('View')}
                                            title="Ver"
                                        >
                                            <Icons name="eye" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {!hasActions && (
                            <tr>
                                <td className="px-4 py-10 text-center text-slate-500" colSpan={6}>
                                    No hay resultados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / paginación */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 px-4 py-3 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span>Resultados por página</span>
                    <div className="relative">
                        <select value={actions.pageSize ?? 10}
                            onChange={(e) => setPageSize(Number(e.target.value))} className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
                            <Icons name="chevDown" className="w-4 h-4" />
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-slate-600">
                    <span>{start} - {end} de {total}</span>
                    <div className="flex items-center gap-2">
                        <PagerBtn label="«" disabled={!canPrev} onClick={() => setPage(1)} />
                        <PagerBtn label="‹" disabled={!canPrev} onClick={() => setPage(pageUI - 1)} />
                        <PagerBtn label="›" disabled={!canNext} onClick={() => setPage(pageUI + 1)} />
                        <PagerBtn label="»" disabled={!canNext} onClick={() => setPage(totalPages)} />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TableDashboard