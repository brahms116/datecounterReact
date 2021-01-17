import { createContext, useState } from "react";
import IAuthContext from "../models/contextModels/IAuthContext";
import ILoginInput from "../models/inputModels/ILoginInput";
import ILoginOutput from "../models/outputModels/ILoginOutput";
import ILoginResponse from "../models/outputModels/ILoginResponse";
import IRegisterResponse from "../models/outputModels/IRegisterResponse";

export const authContext = createContext({} as IAuthContext);

export default function AuthContext(props: { children: React.ReactNode }) {
    const [token, setToken] = useState("");
    const [isAuth, setIsAuth] = useState(false);

    const url = "http://localhost:1001/api";

    const saveToken = (token: string) => {
        const localStorage = window.localStorage;
        localStorage.setItem("token", token);
    };

    const getSavedToken = (): string => {
        const localStorage = window.localStorage;
        const token = localStorage.getItem("token") as string;

        if (token) {
            return token;
        } else {
            localStorage.clear();
            return "";
        }
    };

    const initialTokenCheck = async () => {
        if (getSavedToken()) {
            const result = await fetch(url + "/user/checktoken", {
                method: "GET",
                headers: { Authorization: `bearer ${getSavedToken()}` },
            });
            if (result.ok) {
                setToken(getSavedToken());
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    //validation is conducted within the page component (AuthPanel)
    const login = async (input: ILoginInput) => {
        const result = await fetch(url + "/user/login", {
            method: "POST",
            body: JSON.stringify({
                email: input.credientials.email,
                password: input.credientials.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const resultData: ILoginResponse = await result.json();
        console.log(resultData);
        if (!resultData.isSuccess) {
            return {
                isSuccess: false,
                error: resultData.error,
            } as ILoginOutput;
        } else {
            setToken(resultData.payload.token);
            setIsAuth(true);
            if (input.rememberMe) {
                saveToken(resultData.payload.token);
            }
        }
        return {
            isSuccess: true,
        } as ILoginOutput;
    };
    const register = async (input: ILoginInput) => {
        const result = await fetch(url + "/user/register", {
            method: "POST",
            body: JSON.stringify({
                email: input.credientials.email,
                password: input.credientials.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const resultData: IRegisterResponse = await result.json();
        console.log(resultData);
        if (!resultData.isSuccess) {
            return {
                isSuccess: false,
                error: resultData.error,
            } as ILoginOutput;
        } else {
            setToken(resultData.payload.token);
            setIsAuth(true);
            if (input.rememberMe) {
                saveToken(resultData.payload.token);
            }
        }
        return {
            isSuccess: true,
        } as ILoginOutput;
    };
    const logout = () => {
        setIsAuth(false);
        setToken("");
    };
    return (
        <authContext.Provider
            value={
                {
                    token,
                    isAuth,
                    initialTokenCheck,
                    login,
                    register,
                    logout,
                } as IAuthContext
            }
        >
            {props.children}
        </authContext.Provider>
    );
}
