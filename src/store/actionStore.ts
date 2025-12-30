import { AuthUserLogin } from "../service/userAuthService";
import { fetchAddAction, fetchAdminList } from "../service/actionServices";
import { create } from 'zustand'
import type { Actions, AdminAdd, AuthUser } from "../types";

export type LoginResult = | { ok: true; token: string} | { ok: false; message: string;};

export type LoginRequest = {
    users: AuthUser;
};

export type AuthState = {
    token: null;
    loading: boolean;
    error: string;
    actions: Actions;
    login: (req: LoginRequest) => Promise<LoginResult>;
    fetchActions: (pageNumber?: number, pageSize?: number) => Promise<void>;
    fetchAddAction: (payload: AdminAdd) => Promise<void>
    setPage: (pageUI: number) => Promise<void>;     // ✅ 1-based UI
    setPageSize: (pageSize: number) => Promise<void>;
};

export const ActionsStore = create<AuthState>((set, get) => ({
    token: null,
    loading: false,
    error: "",

    login: async (req) => {
        set({ loading: true, error: "" });
        const token = await AuthUserLogin(req);
        if (token) {
            localStorage.setItem("TOKEN_KEY", token);
            set({ token, loading: false });
            return { ok: true, token };
        } else {
            set({ error: "Error al iniciar sesión", loading: false });
            return { ok: false, message: "Error al iniciar sesión",};
        }
    },

    actions: {
            pageSize: 10,
            pageNumber: 0,
            totalElements: 0,
            totalPages: 0,
            data: []
        },
    
        fetchActions: async (pageNumber = 1, pageSize = 10) => {
            const safePageNumber = Math.max(0, pageNumber);     // ✅ nunca < 0
            const safePageSize = Math.max(1, pageSize);
    
            const actions = await fetchAdminList({
                pageNumber: safePageNumber,
                pageSize: safePageSize,
            });
    
            set({ actions });
        },
    
        setPage: async (pageUI: number) => {
        const safePageUI = Math.max(1, pageUI);
        const { pageSize } = get().actions;
    
        await get().fetchActions(safePageUI - 1, pageSize ?? 10);
        },
    
        setPageSize: async (pageSize: number) => {
        const safe = Math.max(1, pageSize);
        await get().fetchActions(0, safe);
        },
    
        fetchAddAction: async (payload: AdminAdd) => {
            await fetchAddAction(payload);
            const { pageNumber, pageSize } = get().actions;
            await get().fetchActions(pageNumber ?? 0, pageSize ?? 10);
        },
}));
