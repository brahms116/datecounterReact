import IDateItem from "../dataModels/IDateItem";
import IEventOutput from "../outputModels/IEventOutput";

export default interface IUseDateItem {
    items: IDateItem[];
    coverItem: IDateItem;
    createItem: (
        title: string,
        date: string,
        token: string
    ) => Promise<IEventOutput>;
    deleteItem: (id: number, token: string) => Promise<IEventOutput>;
    assignCoverItem: (id: number, token: string) => Promise<IEventOutput>;
    getItems: (token: string) => Promise<IEventOutput>;
    logout: () => void;
}
