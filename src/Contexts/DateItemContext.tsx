import { createContext, useContext, useState } from "react";
import IDateItemContext from "../models/contextModels/IDateItemContext";
import IDateItem from "../models/dataModels/IDateItem";
import ICreateItemInput from "../models/inputModels/ICreateDateItemInput";
import IDeleteDateItemInput from "../models/inputModels/IDeleteDateItemInput";
import ISetCoverItemInput from "../models/inputModels/ISetCoverItemInput";
import IDateItemOutput from "../models/outputModels/IDateItemOutput";
import IDateItemResponse from "../models/outputModels/IDateItemResponse";
import IGetItemsResponse from "../models/outputModels/IGetItemsResponse";
import { authContext } from "./AuthContext";

export const dateItemContext = createContext({} as IDateItemContext);

export default function DateItemContext(props: { children: React.ReactNode }) {
    const [items, setItems] = useState<IDateItem[]>([]);
    const [coverItem, setCoverItem] = useState({} as IDateItem);

    const authC = useContext(authContext);

    const url = "http://localhost:1001/api";

    const getItems = async () => {
        // console.log(authC.token);
        const result = await fetch(url + "/dateitem/items", {
            method: "GET",
            headers: {
                Authorization: `bearer ${authC.token}`,
            },
        });
        const resultData: IGetItemsResponse = await result.json();
        if (!resultData.isSuccess) {
            if (resultData.error) {
                console.log(resultData.error.msg);
            }
            return {
                isSuccess: false,
            } as IDateItemOutput;
        }
        setItems(resultData.payload.items);
        if (resultData.payload.coverItem)
            setCoverItem(resultData.payload.coverItem);
        return {
            isSuccess: true,
        } as IDateItemOutput;
    };

    const createItem = async (input: ICreateItemInput) => {
        const result = await fetch(url + "/dateitem/create", {
            method: "POST",
            body: JSON.stringify({
                title: input.title,
                date: input.date, //this might need some reformatting
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${authC.token}`,
            },
        });

        const resultData: IDateItemResponse = await result.json();

        if (!resultData.isSuccess) {
            if (resultData.error) {
                console.log(resultData.error.msg);
            }
            return {
                isSuccess: false,
            } as IDateItemOutput;
        }

        return {
            isSuccess: true,
        } as IDateItemOutput;

        //implement reload?
    };

    const assignCoverItem = async (input: ISetCoverItemInput) => {
        const result = await fetch(url + "/dateitem/coveritem", {
            method: "POST",
            body: JSON.stringify({
                id: input.id,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${authC.token}`,
            },
        });
        const resultData: IDateItemResponse = await result.json();

        if (!resultData.isSuccess) {
            if (resultData.error) {
                console.log(resultData.error.msg);
            }
            return {
                isSuccess: false,
            } as IDateItemOutput;
        }

        return {
            isSuccess: true,
        } as IDateItemOutput;
    };

    const deleteItem = async (input: IDeleteDateItemInput) => {
        const result = await fetch(url + `/dateitem/coveritem/${input.id}`, {
            method: "DELETE",

            headers: {
                Authorization: `bearer ${authC.token}`,
            },
        });
        const resultData: IDateItemResponse = await result.json();

        if (!resultData.isSuccess) {
            if (resultData.error) {
                console.log(resultData.error.msg);
            }
            return {
                isSuccess: false,
            } as IDateItemOutput;
        }

        return {
            isSuccess: true,
        } as IDateItemOutput;
    };

    return (
        <dateItemContext.Provider
            value={
                {
                    items,
                    coverItem,
                    createItem,
                    deleteItem,
                    assignCoverItem,
                    getItems,
                } as IDateItemContext
            }
        >
            {props.children}
        </dateItemContext.Provider>
    );
}
