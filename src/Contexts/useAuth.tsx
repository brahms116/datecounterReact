import { useState } from "react";
import IUseAuth from "../models/contextModels/IUseAuth";
import IAuthEventOutput from "../models/outputModels/IAuthEventOutput";

import DbService from "../services/DbService";
import Validation from "../services/ValidationService";
import handleEventReturn from "../utils/handleEventReturn";
import handleServerError from "../utils/handleServerError";

export default function useAuth() {
    const [token, setToken] = useState("");
    const [isAuth, setIsAuth] = useState(false);

    const localStorage = window.localStorage;

    const checkToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            localStorage.clear();
            // console.log(handleEventReturn<IAuthEventOutput>(false));
            return handleEventReturn<IAuthEventOutput>(false);
        }
        const result = await DbService.checkToken(token);
        if (!result.isSuccess) {
            localStorage.clear();
        }
        setIsAuth(true);
        setToken(token);
        return handleEventReturn<IAuthEventOutput>(result.isSuccess, { token });
    };

    const login = async (
        email: string,
        password: string,
        rememberMe: boolean
    ) => {
        const validationResult = Validation.validateLoginInput(email, password);
        if (!validationResult.isSuccess)
            return validationResult as IAuthEventOutput;
        const result = await DbService.login(email, password);
        if (result.error) {
            // console.log(handleServerError(result.error));
            return handleServerError(result.error) as IAuthEventOutput;
        }
        setToken(result.payload.token);
        setIsAuth(true);
        if (rememberMe) localStorage.setItem("token", result.payload.token);
        return handleEventReturn<IAuthEventOutput>(true, {
            token: result.payload.token,
        });
    };

    const register = async (
        email: string,
        password: string,
        rememberMe: boolean
    ) => {
        const validationResult = Validation.validateRegisterInput(
            email,
            password
        );
        if (!validationResult.isSuccess)
            return validationResult as IAuthEventOutput;
        const result = await DbService.register(email, password);
        if (result.error) {
            return handleServerError(result.error) as IAuthEventOutput;
        }
        setToken(result.payload.token);
        setIsAuth(true);
        if (rememberMe) localStorage.setItem("token", result.payload.token);
        return handleEventReturn<IAuthEventOutput>(true, {
            token: result.payload.token,
        });
    };
    const logout = () => {
        setIsAuth(false);
        localStorage.clear();
        setToken("");
    };
    return {
        token,
        isAuth,
        checkToken,
        register,
        login,
        logout,
    } as IUseAuth;
}
