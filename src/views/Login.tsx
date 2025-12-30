import { useForm, type SubmitHandler } from "react-hook-form";
import ErrorForm from "../Components/ErrorForm";
import { useState } from "react";
import type { IFormInput } from "../interfaces/IFormInput";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { type AxiosError } from "axios";
import { ActionsStore } from "../store/actionStore";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors, isValid, isSubmitting },
        handleSubmit
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const login = ActionsStore((state) => state.login);
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const { username, password } = data;
        const payload = { users: { username, password } };

        try {
            const result = await login(payload);

            if (result.ok) {
                navigate("/admin/categories", { replace: true });
                toast.success("Ha iniciado sesion correctamente", {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });
                return;
            }
        } catch (err: unknown) {
            const error = err as AxiosError;
            const status = error?.response?.status;

            if (status === 400 || status === 403) {
                toast.error("El username o el password no son correctos", {
                    position: "top-right",
                    autoClose: 8000,
                    theme: "light",
                    transition: Bounce,
                });
                return;
            }
        }
    };
return (

    <>
        <div className="mx-auto w-full max-w-[420px] rounded-2xl bg-white shadow-sm border border-gray-100 px-6 sm:px-8 py-8">
            <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 via-emerald-400 to-lime-400" />
                    <div className="leading-tight">
                        <div className="text-2xl font-semibold tracking-tight text-gray-900">
                            bekind
                        </div>
                        <div className="text-xs font-medium tracking-wide text-gray-500 -mt-1">
                            network
                        </div>
                    </div>
                </div>

                <h1 className="text-center text-lg sm:text-xl font-semibold text-gray-900 mt-2">
                    ¡Empieza a conectar tu comunidad ante buenas acciones!
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Correo Electrónico*
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 6.5C4 5.67157 4.67157 5 5.5 5H18.5C19.3284 5 20 5.67157 20 6.5V17.5C20 18.3284 19.3284 19 18.5 19H5.5C4.67157 19 4 18.3284 4 17.5V6.5Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5 7L12 12L19 7"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>

                        <input
                            type="email"
                            placeholder="Ingresar correo"
                            className="w-full rounded-lg border border-gray-200 bg-white px-10 py-2.5 text-sm text-gray-900 
                                placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
                            {...register('username', { required: 'El correo es obligatorio' })}
                        />
                        {
                            errors.username && (
                                <ErrorForm>
                                    {errors.username.message}
                                </ErrorForm>
                            )
                        }
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Contraseña*
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 11V8.8C7 6.14903 9.23858 4 12 4C14.7614 4 17 6.14903 17 8.8V11"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M6.5 11H17.5C18.3284 11 19 11.6716 19 12.5V18.5C19 19.3284 18.3284 20 17.5 20H6.5C5.67157 20 5 19.3284 5 18.5V12.5C5 11.6716 5.67157 11 6.5 11Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingresa tu contraseña"
                            autoComplete="current-password"
                            aria-invalid={!!errors.password?.message}
                            className={[
                                "w-full rounded-lg border bg-white px-10 pr-11 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:border-sky-300",
                                errors.password?.message
                                    ? "border-rose-300 focus:ring-rose-100"
                                    : "border-gray-200 focus:ring-sky-200",
                            ].join(" ")}
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                            })}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >

                            {showPassword ? (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 12C5.8 6.8 9.2 4.5 12 4.5C14.8 4.5 18.2 6.8 21 12C18.2 17.2 14.8 19.5 12 19.5C9.2 19.5 5.8 17.2 3 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                    <path
                                        d="M4 4L20 20"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 12C5.8 6.8 9.2 4.5 12 4.5C14.8 4.5 18.2 6.8 21 12C18.2 17.2 14.8 19.5 12 19.5C9.2 19.5 5.8 17.2 3 12Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={[
                        "w-full rounded-lg py-2.5 text-sm font-semibold transition",
                        !isValid || isSubmitting
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-900 text-white hover:bg-gray-800",
                    ].join(" ")}
                >
                    {isSubmitting ? "Ingresando..." : "Ingresar"}
                </button>
            </form>
        </div>
    </>
);
}

export default Login
