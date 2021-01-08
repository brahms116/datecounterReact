import { createContext, useState } from "react";
import IAuthContext from "../models/contextModels/IAuthContext";

export const authContext = createContext({} as IAuthContext);

export default function AuthContext() {
    const [token, setToken] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
}
