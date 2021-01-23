import IDateItemResponse from "../models/outputModels/IDateItemResponse";
import IGetItemsResponse from "../models/outputModels/IGetItemsResponse";
import ILoginResponse from "../models/outputModels/ILoginResponse";
import IRegisterResponse from "../models/outputModels/IRegisterResponse";

const url = "https://backend.davidkwong.net/datecounter/api";

const handleResult = async <T>(result: Response) => {
    if (!result.ok) {
        console.log(result);
    }
    try {
        const resultData: T = await result.json();
        return resultData;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const DbService = {
    checkToken: async (token: string) => {
        const result = await fetch(url + "/user/checktoken", {
            method: "GET",
            headers: { Authorization: `bearer ${token}` },
        });
        if (result.ok) return { isSuccess: true };
        return { isSuccess: false };
    },
    login: async (email: string, password: string) => {
        const result = await fetch(url + "/user/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await handleResult<ILoginResponse>(result);
    },
    register: async (email: string, password: string) => {
        const result = await fetch(url + "/user/register", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await handleResult<IRegisterResponse>(result);
    },
    createItem: async (title: string, date: string, token: string) => {
        const result = await fetch(url + "/dateitem/create", {
            method: "POST",
            body: JSON.stringify({
                title,
                date,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
        });
        return await handleResult<IDateItemResponse>(result);
    },
    deleteItem: async (id: number, token: string) => {
        const result = await fetch(url + `/dateitem/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `bearer ${token}`,
            },
        });

        return await handleResult<IDateItemResponse>(result);
    },
    assignCoverItem: async (token: string, id: number) => {
        const result = await fetch(url + "/dateitem/coveritem", {
            method: "POST",
            body: JSON.stringify({
                id: id,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
            },
        });
        return await handleResult<IDateItemResponse>(result);
    },
    getItems: async (token: string) => {
        const result = await fetch(url + "/dateitem/items", {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`,
            },
        });
        return await handleResult<IGetItemsResponse>(result);
    },
};

export default DbService;
