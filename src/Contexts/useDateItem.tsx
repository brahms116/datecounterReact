import { useState } from "react";
import IUseDateItem from "../models/contextModels/IUseDateItem";
import IDateItem from "../models/dataModels/IDateItem";
import IEventOutput from "../models/outputModels/IEventOutput";
import DbService from "../services/DbService";
import Validation from "../services/ValidationService";
import handleEventReturn from "../utils/handleEventReturn";
import handleServerError from "../utils/handleServerError";

export default function useDateItem() {
    const [items, setItems] = useState<IDateItem[]>([]);
    const [coverItem, setCoverItem] = useState({} as IDateItem);

    const getItems = async (token: string) => {
        const result = await DbService.getItems(token);
        if (result.error) {
            return handleServerError(result.error) as IEventOutput;
        }
        setItems(result.payload.items);
        if (result.payload.coverItem) setCoverItem(result.payload.coverItem);
        return handleEventReturn<IEventOutput>();
    };

    const createItem = async (title: string, date: string, token: string) => {
        const dateArr = date.split("/");
        let temp = dateArr[0];
        dateArr[0] = dateArr[2];
        dateArr[2] = temp;
        const formattedDate = dateArr.join("-");

        const validationResult = Validation.validateDateItemTitle(title);
        if (!validationResult.isSuccess) return validationResult;
        const result = await DbService.createItem(
            title.toLocaleUpperCase(),
            formattedDate,
            token
        );
        // console.log(result);
        if (result.error) {
            return handleServerError(result.error);
        }
        if (items.length < 1) {
            return await assignCoverItem(result.payload.item.id, token);
        }
        return await getItems(token);
    };

    const assignCoverItem = async (id: number, token: string) => {
        const result = await DbService.assignCoverItem(token, id);
        if (result.error) return handleServerError(result.error);
        return await getItems(token);
    };

    const deleteItem = async (id: number, token: string) => {
        const result = await DbService.deleteItem(id, token);
        if (result.error) return handleServerError(result.error);
        if (result.payload.item.id === coverItem.id) {
            for (let i in items) {
                if (items[i].id !== coverItem.id) {
                    return await assignCoverItem(items[i].id, token);
                }
            }
        }
        return await getItems(token);
    };

    const logout = () => {
        setItems([]);
        setCoverItem({} as IDateItem);
    };

    return {
        items,
        coverItem,
        createItem,
        deleteItem,
        assignCoverItem,
        getItems,
        logout,
    } as IUseDateItem;
}
