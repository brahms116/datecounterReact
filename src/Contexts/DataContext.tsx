import { createContext } from "react";
import IDataContext from "../models/contextModels/IDataContext";
import IEventOutput from "../models/outputModels/IEventOutput";
import useAuth from "./useAuth";
import useDateItem from "./useDateItem";

export const dataContext = createContext({} as IDataContext);

export default function DataContext(props: { children: React.ReactNode }) {
    const authManager = useAuth();
    const dateItemManager = useDateItem();

    const appInit = async () => {
        const result = await authManager.checkToken();
        if (!result.isSuccess) return result as IEventOutput;
        return await dateItemManager.getItems(result.payload?.token!);
    };

    const login = async (
        email: string,
        password: string,
        rememberMe: boolean
    ) => {
        const result = await authManager.login(email, password, rememberMe);
        if (!result.isSuccess) return result as IEventOutput;
        return await dateItemManager.getItems(result.payload?.token!);
    };
    const register = async (
        email: string,
        password: string,
        rememberMe: boolean
    ) => {
        const result = await authManager.register(email, password, rememberMe);
        if (!result.isSuccess) return result as IEventOutput;
        return await dateItemManager.getItems(result.payload?.token!);
    };

    const getItems = async () => {
        return await dateItemManager.getItems(authManager.token);
    };

    const createItem = async (title: string, date: string) => {
        return await dateItemManager.createItem(title, date, authManager.token);
    };

    const assignCoverItem = async (id: number) => {
        return await dateItemManager.assignCoverItem(id, authManager.token);
    };

    const deleteItem = async (id: number) => {
        return await dateItemManager.deleteItem(id, authManager.token);
    };

    const logout = () => {
        authManager.logout();
        dateItemManager.logout();
    };

    return (
        <dataContext.Provider
            value={
                {
                    state: {
                        isAuth: authManager.isAuth,
                        token: authManager.token,
                        items: dateItemManager.items,
                        coverItem: dateItemManager.coverItem,
                    },
                    events: {
                        appInit,
                        login,
                        register,
                        logout,
                        createItem,
                        deleteItem,
                        assignCoverItem,
                        getItems,
                    },
                } as IDataContext
            }
        >
            {props.children}
        </dataContext.Provider>
    );
}
