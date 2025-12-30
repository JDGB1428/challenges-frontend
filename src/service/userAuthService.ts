import axios from "axios";
import type { LoginRequest } from "../store/actionStore";

export const AuthUserLogin = async (req: LoginRequest) => {
    const url = "https://dev.apinetbo.bekindnetwork.com/api/Authentication/Login";
    const { data } = await axios.post(
        url,
        {
            username: req.users.username,
            password: req.users.password,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "text/plain, */*",
            },
            responseType: "text",
        }
    );

    return data;
};
