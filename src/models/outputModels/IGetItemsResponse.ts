import IDateItem from "../dataModels/IDateItem";
import IOutput from "./IOutput";

export interface IGetItemsResponseData {
    coverItem: IDateItem | null;
    items: IDateItem[];
}

export default interface IGetItemsResponse extends IOutput {
    payload: IGetItemsResponseData;
}
