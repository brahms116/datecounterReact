import IDateItem from "../dataModels/IDateItem";
import IEventOutput from "../outputModels/IEventOutput";

export default interface IDataContext {
    state: {
        token: string;
        isAuth: boolean;
        items: IDateItem[];
        coverItem: IDateItem;
    };
    events: {
        appInit: () => Promise<IEventOutput>;
        register: (
            email: string,
            password: string,
            rememberMe: boolean
        ) => Promise<IEventOutput>;
        login: (
            email: string,
            password: string,
            rememberMe: boolean
        ) => Promise<IEventOutput>;
        createItem: (title: string, date: string) => Promise<IEventOutput>;
        deleteItem: (id: number) => Promise<IEventOutput>;
        assignCoverItem: (id: number) => Promise<IEventOutput>;
        getItems: () => Promise<IEventOutput>;
        logout: () => void;
    };
}
