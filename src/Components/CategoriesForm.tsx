import { useEffect, useMemo } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import ErrorForm from "./ErrorForm";
import type { IFormCategories } from "../interfaces/IFormCategories";
import { ActionsStore } from "../store/actionStore";
import { Bounce, toast } from "react-toastify";
import type { AxiosError } from "axios";

type ModalProps = {
    open: boolean;
    onClose: () => void;
};

const CategoriesForm = ({ open, onClose }: ModalProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormCategories>({
        defaultValues: {
            name: "",
            description: "",
            color: "",
            status: true,
        },
    });

    const icon = useWatch({ control, name: "icon" });
    const file = useMemo(() => (icon?.length ? icon[0] : null), [icon]);
    const fetchActions = ActionsStore(state => state.fetchAddAction)
    const statusBool = useWatch({ control, name: "status" });

    const previewUrl = useMemo(() => {
        if (!file) return null;
        return URL.createObjectURL(file);
    }, [file]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    const onSubmit: SubmitHandler<IFormCategories> = async (values) => {
        try {
            const f = values.icon?.[0];
            if (!f) return;

            const payload = {
                name: values.name,
                description: values.description,
                color: values.color,
                status: (values.status ? 1 : 0) as 0 | 1,
                icon: f,
            };

            await fetchActions(payload);

            toast.success("Acción creada correctamente", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
                transition: Bounce,
            });
            onClose(); 
        } catch (err: unknown) {
            const error = err as AxiosError;
            const status = error?.response?.status;
            if (status === 400 || status === 403) {
                toast.error("No se pudo crear la acción. Intenta de nuevo.", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });
                return;
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden">
                    {/* header */}
                    <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">Crear categoría</h3>
                            <p className="text-xs text-slate-500">Completa el formulario y guarda.</p>
                        </div>

                        <button
                            onClick={onClose}
                            className="h-9 w-9 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                            aria-label="Cerrar"
                            type="button"
                        >
                            ✕
                        </button>
                    </div>

                    {/* body */}
                    <div className="p-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5">
                                <label htmlFor="name">Categoria</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border-2 border-gray-400 rounded"
                                    {...register("name", { required: "La categoria es requerida" })}
                                />
                                {errors.name && <ErrorForm>{errors.name.message}</ErrorForm>}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="description">Descripcion</label>
                                <textarea
                                    className="w-full p-2 border-2 border-gray-400 rounded"
                                    {...register("description", { required: "La descripcion es requerida" })}
                                />
                                {errors.description && <ErrorForm>{errors.description.message}</ErrorForm>}
                            </div>

                            <div className="mb-5">
                                <label htmlFor="icon">Logo</label>

                                <div className="mt-2 flex items-center gap-3">
                                    {/* preview */}
                                    <div className="h-16 w-16 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="preview" className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-xs text-slate-500">Sin logo</span>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="w-full p-2 border-2 border-gray-400 cursor-pointer rounded"
                                            {...register("icon", { required: "El icono es requerido" })}
                                        />
                                        {errors.icon && <ErrorForm>{String(errors.icon.message)}</ErrorForm>}
                                        <p className="mt-1 text-xs text-slate-500">
                                            {file ? file.name : "Ningún archivo seleccionado"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="color">color</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border-2 border-gray-400 rounded"
                                    {...register("color", { required: "El color es requerido" })}
                                />
                                {errors.color && <ErrorForm>{errors.color.message}</ErrorForm>}
                            </div>

                            <div className="mb-5 flex items-center gap-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" {...register("status")} />
                                    <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500/30 rounded-full peer peer-checked:bg-teal-400 transition-colors" />
                                    <div className="absolute left-1 top-1 h-5 w-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                                </label>

                                <span className="text-sm text-slate-800">
                                    {statusBool ? "Activo" : "Inactivo"}
                                </span>
                            </div>

                            <button className="w-full px-4 py-2 rounded-lg bg-indigo-900 text-white hover:bg-indigo-800 cursor-pointer">
                                Crear categoria
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesForm;
