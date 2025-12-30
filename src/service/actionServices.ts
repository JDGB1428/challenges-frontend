import axios from "axios";
import { AddSchema, WelcomeSchema, type Data} from "../utils/actions-schema";
import type { AdminAdd } from "../types";



export const fetchAdminList =  async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }): Promise<Data> => {
    const TOKEN = localStorage.getItem("TOKEN_KEY");
    const url = "https://dev.api.bekindnetwork.com/api/v1/actions/admin-list";

    const res = await axios.get(url, {
        params: { pageNumber, pageSize },
        headers: {
        Authorization: `Bearer ${TOKEN}`,
        },
    });

    const parsed = WelcomeSchema.safeParse(res.data);
    if (!parsed.success) {
        console.error(parsed.error);
        throw new Error("Schema inválido en admin-list");
    }

    return parsed.data.data; // ✅ devuelve Data (objeto paginado)
};

export const fetchAddAction = async (payload: AdminAdd) => {
    const TOKEN = localStorage.getItem("TOKEN_KEY");
    const url = "https://dev.api.bekindnetwork.com/api/v1/actions/admin-add";

    const parsed = AddSchema.parse(payload);

    const fd = new FormData();
    fd.append("name", parsed.name);
    fd.append("description", parsed.description);
    fd.append("color", parsed.color);
    fd.append("status", String(parsed.status));
    fd.append("icon", parsed.icon);

    const res = await axios.post(url, fd, {
        headers: {
        Authorization: `Bearer ${TOKEN}`,
        },
    });

    return res.data;
};