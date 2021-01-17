import IDateItem from "../dataModels/IDateItem";
import ICreateItemInput from "../inputModels/ICreateDateItemInput";
import IDeleteDateItemInput from "../inputModels/IDeleteDateItemInput";
import ISetCoverItemInput from "../inputModels/ISetCoverItemInput";
import IDateItemOutput from "../outputModels/IDateItemOutput";

export default interface IDateItemContext {
    items: IDateItem[];
    coverItem: IDateItem;
    createItem: (input: ICreateItemInput) => Promise<IDateItemOutput>;
    deleteItem: (input: IDeleteDateItemInput) => Promise<IDateItemOutput>;
    assignCoverItem: (input: ISetCoverItemInput) => Promise<IDateItemOutput>;
    getItems: () => Promise<IDateItemOutput>;
}
